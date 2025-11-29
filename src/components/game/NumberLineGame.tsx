"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RefreshCw, Volume2, Settings } from "lucide-react";
import AnimalRow from "./AnimalRow";
import BottomNumberLine from "./BottomNumberLine";
import { ANIMAL_ROWS, LANGUAGES, PHRASES, MAX_NUMBER_OPTIONS, LanguageCode } from "@/lib/constants";
import { useGameSettings } from "@/lib/store";
import { numberToDigitSpeech, playAnimalSound } from "@/lib/audio";
import confetti from "canvas-confetti";

export default function NumberLineGame() {
    const { maxNumber, language, soundEnabled, setMaxNumber, setLanguage } = useGameSettings();
    const [currentNumber, setCurrentNumber] = useState(0);
    const [targetNumber, setTargetNumber] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [hintEnabled, setHintEnabled] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const activeRowRef = useRef<HTMLDivElement>(null);

    const maxRows = Math.ceil(maxNumber / 10);

    // Initialize Game
    const startGame = useCallback(() => {
        const newTarget = Math.floor(Math.random() * maxNumber);
        setTargetNumber(newTarget);
        setCurrentNumber(0);
        setIsPlaying(true);
        setShowSuccess(false);

        // Reset view to top
        if (gameContainerRef.current) {
            gameContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }

        const digitSpeech = numberToDigitSpeech(newTarget, language);
        speakText(`${PHRASES.findNumber[language]} ${digitSpeech}`);
    }, [maxNumber, language]);

    useEffect(() => {
        startGame();
    }, [startGame]);

    // TTS Helper - Exciting Voice with Language Support
    const speakText = (text: string) => {
        if (!soundEnabled || !("speechSynthesis" in window)) return;

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const langCode = LANGUAGES[language].code;
        const preferredVoice = voices.find(v => v.lang.startsWith(langCode.split('-')[0]));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.lang = langCode;
        utterance.pitch = 1.2;
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    // Auto-scroll active row into view
    useEffect(() => {
        if (activeRowRef.current && gameContainerRef.current) {
            activeRowRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [currentNumber]);

    // Check Answer (Manual Confirmation)
    const checkAnswer = useCallback(() => {
        if (!isPlaying) return;

        if (currentNumber === targetNumber) {
            setShowSuccess(true);
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#EF4444', '#FACC15', '#3B82F6', '#22C55E']
            });
            const digitSpeech = numberToDigitSpeech(targetNumber, language);
            speakText(`${PHRASES.youFound[language]} ${digitSpeech}`);
        } else {
            const digitSpeech = numberToDigitSpeech(currentNumber, language);
            speakText(`${PHRASES.thisIs[language]} ${digitSpeech}`);
        }
    }, [currentNumber, targetNumber, isPlaying, language, soundEnabled]);

    // Navigation Logic
    const move = useCallback(
        (direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
            if (showSuccess) return;

            setCurrentNumber((prev) => {
                let next = prev;
                switch (direction) {
                    case "LEFT":
                        next = Math.max(0, prev - 1);
                        break;
                    case "RIGHT":
                        next = Math.min(maxNumber - 1, prev + 1);
                        break;
                    case "UP":
                        next = Math.max(0, prev - 10);
                        break;
                    case "DOWN":
                        next = Math.min(maxNumber - 1, prev + 10);
                        break;
                }

                // Play animal sound on EVERY number change
                const newRow = Math.floor(next / 10);
                playAnimalSound(newRow, soundEnabled);

                return next;
            });
        },
        [showSuccess, maxNumber, soundEnabled]
    );

    // Keyboard Listeners
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft":
                    move("LEFT");
                    break;
                case "ArrowRight":
                    move("RIGHT");
                    break;
                case "ArrowUp":
                    move("UP");
                    break;
                case "ArrowDown":
                    move("DOWN");
                    break;
                case "Enter":
                case " ":
                    checkAnswer();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [move, checkAnswer]);

    const currentRow = Math.floor(currentNumber / 10);

    return (
        <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-sky-50">
            {/* HUD */}
            <div className="flex-none p-4 bg-white shadow-sm z-20 flex justify-between items-center">
                <Button variant="ghost" onClick={() => window.history.back()}>
                    <ArrowLeft className="mr-2" /> Back
                </Button>

                <div className="flex items-center gap-8">
                    <Card className="px-6 py-2 bg-blue-50 border-blue-200 flex flex-col items-center">
                        <span className="text-sm text-blue-600 font-bold uppercase">{PHRASES.current[language]}</span>
                        <span className="text-4xl font-black text-primary-blue">{currentNumber}</span>
                    </Card>

                    <div className="text-2xl font-bold text-gray-400">vs</div>

                    <Card className="px-6 py-2 bg-green-50 border-green-200 flex flex-col items-center animate-pulse">
                        <span className="text-sm text-green-600 font-bold uppercase">{PHRASES.target[language]}</span>
                        <span className="text-4xl font-black text-secondary-green">{targetNumber}</span>
                    </Card>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={hintEnabled ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setHintEnabled(!hintEnabled)}
                    >
                        {hintEnabled ? `🌟 ${PHRASES.hintOn[language]}` : `⭐ ${PHRASES.hintOff[language]}`}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                        const digitSpeech = numberToDigitSpeech(targetNumber, language);
                        speakText(`${PHRASES.findNumber[language]} ${digitSpeech}`);
                    }}>
                        <Volume2 className="w-6 h-6" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowSettings(!showSettings)}>
                        <Settings className="w-6 h-6" />
                    </Button>
                    <Button variant="primary" size="sm" onClick={startGame}>
                        <RefreshCw className="w-6 h-6" />
                    </Button>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="flex-none bg-white border-b border-gray-200 p-4 flex gap-6 items-center justify-center"
                >
                    <div className="flex gap-2 items-center">
                        <span className="font-bold">Max Number:</span>
                        {MAX_NUMBER_OPTIONS.map(opt => (
                            <Button
                                key={opt}
                                variant={maxNumber === opt ? "primary" : "outline"}
                                size="sm"
                                onClick={() => setMaxNumber(opt)}
                            >
                                {opt}
                            </Button>
                        ))}
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="font-bold">Language:</span>
                        {Object.entries(LANGUAGES).map(([code, lang]) => (
                            <Button
                                key={code}
                                variant={language === code ? "primary" : "outline"}
                                size="sm"
                                onClick={() => setLanguage(code as LanguageCode)}
                            >
                                {lang.flag} {lang.name}
                            </Button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Game Area - Scrollable Rows with Improved Visibility */}
            <div ref={gameContainerRef} className="flex-1 overflow-y-auto p-2 scroll-smooth">
                <div className="flex flex-col justify-center min-h-full py-4">
                    {ANIMAL_ROWS.slice(0, maxRows).map((row) => {
                        const isActive = row.id === currentRow;
                        return (
                            <motion.div
                                key={row.id}
                                ref={isActive ? activeRowRef : null}
                                animate={{
                                    scale: isActive ? 1.15 : 0.75,
                                    opacity: isActive ? 1 : 0.5,
                                }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="my-1 max-w-full overflow-hidden"
                            >
                                <AnimalRow
                                    rowId={row.id}
                                    startNumber={row.id * 10}
                                    currentNumber={currentNumber}
                                    targetNumber={targetNumber}
                                    hintEnabled={hintEnabled}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Number Line */}
            <BottomNumberLine currentNumber={currentNumber} targetNumber={targetNumber} />

            {/* On-screen Controls */}
            <div className="flex-none p-4 bg-white border-t border-gray-100 flex justify-center gap-4">
                <Button size="lg" variant="secondary" onClick={() => move("UP")}>
                    <ArrowUp className="w-8 h-8" />
                </Button>
                <div className="flex gap-4">
                    <Button size="lg" variant="primary" onClick={() => move("LEFT")}>
                        <ArrowLeft className="w-8 h-8" />
                    </Button>
                    <Button size="lg" variant="primary" onClick={() => move("RIGHT")}>
                        <ArrowRight className="w-8 h-8" />
                    </Button>
                </div>
                <Button size="lg" variant="secondary" onClick={() => move("DOWN")}>
                    <ArrowDown className="w-8 h-8" />
                </Button>
                <Button size="lg" variant="primary" className="bg-green-500 hover:bg-green-600 border-green-700 w-32" onClick={checkAnswer}>
                    GO!
                </Button>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.5, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="bg-white p-8 rounded-[2rem] shadow-2xl text-center max-w-md mx-4"
                        >
                            <div className="text-8xl mb-4">🎉</div>
                            <h2 className="text-4xl font-black text-primary-blue mb-2">{PHRASES.youDidIt[language]}</h2>
                            <p className="text-xl text-gray-600 mb-8">
                                {PHRASES.foundTheNumber[language]} <span className="font-bold text-secondary-green">{targetNumber}</span>!
                            </p>
                            <Button size="xl" variant="primary" onClick={startGame} className="w-full animate-bounce">
                                {PHRASES.playAgain[language]}
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RefreshCw, Volume2, Settings } from "lucide-react";
import AnimalRow from "./AnimalRow";
import BottomNumberLine from "./BottomNumberLine";
import { ANIMAL_ROWS, LANGUAGES, PHRASES, MAX_NUMBER_OPTIONS, LanguageCode, VISIBLE_ROWS_COUNT, BACKGROUND_PATTERNS, IDLE_HINT_INTERVAL, NUMBER_SELECTION_DELAY } from "@/lib/constants";
import { useGameSettings } from "@/lib/store";
import { numberToDigitSpeech, playAnimalSound, playDingSound, playClappingSound } from "@/lib/audio";
import confetti from "canvas-confetti";

export default function NumberLineGame() {
    const { maxNumber, language, soundEnabled, setMaxNumber, setLanguage, toggleSound } = useGameSettings();
    const [currentNumber, setCurrentNumber] = useState(0);
    const [targetNumber, setTargetNumber] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [hintEnabled, setHintEnabled] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [windowStartRow, setWindowStartRow] = useState(0);
    const [gameTime, setGameTime] = useState(0);
    const [isJiggling, setIsJiggling] = useState(false);
    const [backgroundPattern, setBackgroundPattern] = useState(
        BACKGROUND_PATTERNS[Math.floor(Math.random() * BACKGROUND_PATTERNS.length)].pattern
    );
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const activeRowRef = useRef<HTMLDivElement>(null);

    const maxRows = Math.ceil(maxNumber / 10);

    const startGame = useCallback(() => {
        const newTarget = Math.floor(Math.random() * maxNumber);
        setTargetNumber(newTarget);
        setCurrentNumber(0);
        setWindowStartRow(0);
        setIsPlaying(true);
        setIsPlaying(true);
        setShowSuccess(false);
        setGameTime(0);
        setIsJiggling(false);

        // Randomly select a new background pattern
        const randomPattern = BACKGROUND_PATTERNS[Math.floor(Math.random() * BACKGROUND_PATTERNS.length)];
        setBackgroundPattern(randomPattern.pattern);

        const digitSpeech = numberToDigitSpeech(newTarget, language);
        speakText(`${PHRASES.findNumber[language]} ${digitSpeech}`);
    }, [maxNumber, language]);

    useEffect(() => {
        startGame();
    }, [startGame]);

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
            playClappingSound(soundEnabled);
        } else {
            const digitSpeech = numberToDigitSpeech(currentNumber, language);
            speakText(`${PHRASES.thisIs[language]} ${digitSpeech}`);
        }
    }, [currentNumber, targetNumber, isPlaying, language, soundEnabled]);

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

                // Play sounds based on movement type
                const newRow = Math.floor(next / 10);
                const oldRow = Math.floor(prev / 10);

                if (newRow !== oldRow) {
                    playAnimalSound(newRow, soundEnabled);
                } else {
                    playDingSound(soundEnabled);
                }

                return next;
            });
        },
        [showSuccess, maxNumber, soundEnabled]
    );

    // Debounced Number Speech
    useEffect(() => {
        if (!isPlaying || showSuccess) return;

        // Cancel any ongoing speech when number changes
        window.speechSynthesis.cancel();

        const timer = setTimeout(() => {
            const digitSpeech = numberToDigitSpeech(currentNumber, language);
            speakText(digitSpeech);
        }, NUMBER_SELECTION_DELAY);

        return () => {
            clearTimeout(timer);
            window.speechSynthesis.cancel();
        };
    }, [currentNumber, isPlaying, showSuccess, language]);

    // Game Timer and Idle Hint Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && !showSuccess) {
            interval = setInterval(() => {
                setGameTime((prev) => {
                    const newTime = prev + 1;
                    if (newTime > 0 && newTime % IDLE_HINT_INTERVAL === 0) {
                        const targetRow = Math.floor(targetNumber / 10);
                        playAnimalSound(targetRow, soundEnabled);
                        setIsJiggling(true);
                        setTimeout(() => setIsJiggling(false), 5000);
                    }
                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, showSuccess, targetNumber, soundEnabled]);

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

    // Update window position to keep current row visible
    useEffect(() => {
        const windowEndRow = windowStartRow + VISIBLE_ROWS_COUNT - 1;

        // If current row is below visible window, shift window down
        if (currentRow > windowEndRow) {
            setWindowStartRow(currentRow - VISIBLE_ROWS_COUNT + 1);
        }
        // If current row is above visible window, shift window up
        else if (currentRow < windowStartRow) {
            setWindowStartRow(currentRow);
        }
    }, [currentRow, windowStartRow]);

    // Auto-disable hint after 30 seconds
    useEffect(() => {
        if (hintEnabled) {
            const timer = setTimeout(() => {
                setHintEnabled(false);
            }, 30000);
            return () => clearTimeout(timer);
        }
    }, [hintEnabled]);

    // Calculate visible rows
    const windowEndRow = Math.min(windowStartRow + VISIBLE_ROWS_COUNT, maxRows);
    const visibleRows = ANIMAL_ROWS.slice(windowStartRow, windowEndRow);

    return (
        <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-sky-50">
            {/* HUD */}
            <div
                className="flex-none p-4 bg-white shadow-sm z-20 flex justify-between items-center"
                style={{ backgroundImage: `url("${backgroundPattern}")` }}
            >
                <Button variant="ghost" onClick={() => window.history.back()}>
                    <ArrowLeft className="mr-2" /> Back
                </Button>

                <div className="flex items-center gap-8">
                    <Card className="px-6 py-2 bg-blue-50 border-blue-200 flex flex-col items-center">
                        <span className="text-sm text-blue-600 font-bold uppercase">{PHRASES.current[language]}</span>
                        <span className="text-4xl font-black text-primary-blue">{currentNumber}</span>
                    </Card>

                    <div className="text-2xl font-bold text-gray-400">vs</div>

                    <motion.div
                        animate={{
                            rotate: [0, -3, 3, -3, 3, 0],
                            scale: [1, 1.05, 1, 1.05, 1]
                        }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            repeatDelay: 0.5
                        }}
                    >
                        <Card className="px-8 py-3 bg-green-50 border-green-300 border-2 flex flex-col items-center shadow-lg">
                            <span className="text-base text-green-600 font-bold uppercase">{PHRASES.target[language]}</span>
                            <span className="text-6xl font-black text-secondary-green">{targetNumber}</span>
                        </Card>
                    </motion.div>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={hintEnabled ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setHintEnabled(!hintEnabled)}
                    >
                        {hintEnabled ? `🌟 ${PHRASES.hintOn[language]}` : `⭐ ${PHRASES.hintOff[language]}`}
                    </Button>
                    <Button variant="outline" size="sm" onClick={toggleSound}>
                        <Volume2 className={`w-5 h-5 ${soundEnabled ? 'text-blue-600' : 'text-gray-400'}`} />
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
                    style={{ backgroundImage: `url("${backgroundPattern}")` }}
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

            {/* Game Area */}
            <div
                ref={gameContainerRef}
                className="flex-1 overflow-hidden p-4 flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50 relative"
            >
                {/* Background pattern layer with lower opacity */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{ backgroundImage: `url("${backgroundPattern}")` }}
                />
                <div className="flex flex-col gap-1 w-full relative z-10">
                    <AnimatePresence initial={false}>
                        {visibleRows.map((row) => {
                            const isActive = row.id === currentRow;
                            return (
                                <motion.div
                                    key={row.id}
                                    ref={isActive ? activeRowRef : null}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{
                                        opacity: 1,
                                        scale: isActive ? 0.95 : 0.75,
                                    }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full"
                                >
                                    <AnimalRow
                                        rowId={row.id}
                                        startNumber={row.id * 10}
                                        currentNumber={currentNumber}
                                        targetNumber={targetNumber}
                                        hintEnabled={hintEnabled}
                                        isJiggling={isJiggling && Math.floor(targetNumber / 10) === row.id}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            <BottomNumberLine currentNumber={currentNumber} targetNumber={targetNumber} />

            {/* Idle Timer UI */}
            <div className="fixed bottom-4 right-4 text-gray-300 font-mono text-sm pointer-events-none select-none z-50">
                {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}
            </div>

            {/* On-screen Controls */}
            <div
                className="flex-none p-6 bg-white border-t border-gray-100 flex justify-center gap-2"
                style={{ backgroundImage: `url("${backgroundPattern}")` }}
            >
                <div className="flex gap-2">
                    <Button size="lg" variant="secondary" className="w-20 h-20" onClick={() => move("LEFT")}>
                        <span className="text-4xl">←</span>
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button size="lg" variant="secondary" className="w-20 h-20" onClick={() => move("RIGHT")}>
                        <span className="text-4xl">→</span>
                    </Button>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="lg" variant="primary" className="w-20 h-20" onClick={() => move("UP")}>
                    <span className="text-4xl">↑</span>
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="lg" variant="primary" className="w-20 h-20 " onClick={() => move("DOWN")}>
                    <span className="text-4xl">↓</span>
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="lg" variant="primary" className="bg-green-500 hover:bg-green-600 border-green-700 w-36 h-20 text-3xl font-bold" onClick={checkAnswer}>
                    Enter
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

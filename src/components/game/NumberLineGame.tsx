"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RefreshCw, Volume2 } from "lucide-react";
import AnimalRow from "./AnimalRow";
import BottomNumberLine from "./BottomNumberLine";
import { ANIMAL_ROWS, TOTAL_NUMBERS } from "@/lib/constants";
import confetti from "canvas-confetti";

export default function NumberLineGame() {
    const [currentNumber, setCurrentNumber] = useState(0);
    const [targetNumber, setTargetNumber] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [hintEnabled, setHintEnabled] = useState(false);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Initialize Game
    const startGame = useCallback(() => {
        const newTarget = Math.floor(Math.random() * 100);
        setTargetNumber(newTarget);
        setCurrentNumber(0);
        setIsPlaying(true);
        setShowSuccess(false);

        // Reset view to top
        if (gameContainerRef.current) {
            gameContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }

        speakNumber(newTarget, "Can you find the number");
    }, []);

    useEffect(() => {
        startGame();
    }, [startGame]);

    // TTS Helper - Exciting Voice
    const speakNumber = (num: number, prefix: string = "") => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(`${prefix} ${num}`);
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.name.includes("Google") || v.name.includes("Samantha"));
            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.pitch = 1.2;
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

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
            speakNumber(targetNumber, "Woohoo! You found");
        } else {
            speakNumber(currentNumber, "This is number");
        }
    }, [currentNumber, targetNumber, isPlaying]);

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
                        next = Math.min(TOTAL_NUMBERS - 1, prev + 1);
                        break;
                    case "UP":
                        next = Math.max(0, prev - 10);
                        break;
                    case "DOWN":
                        next = Math.min(TOTAL_NUMBERS - 1, prev + 10);
                        break;
                }
                return next;
            });
        },
        [showSuccess]
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

    return (
        <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-sky-50">
            {/* HUD */}
            <div className="flex-none p-4 bg-white shadow-sm z-20 flex justify-between items-center">
                <Button variant="ghost" onClick={() => window.history.back()}>
                    <ArrowLeft className="mr-2" /> Back
                </Button>

                <div className="flex items-center gap-8">
                    <Card className="px-6 py-2 bg-blue-50 border-blue-200 flex flex-col items-center">
                        <span className="text-sm text-blue-600 font-bold uppercase">Current</span>
                        <span className="text-4xl font-black text-primary-blue">{currentNumber}</span>
                    </Card>

                    <div className="text-2xl font-bold text-gray-400">vs</div>

                    <Card className="px-6 py-2 bg-green-50 border-green-200 flex flex-col items-center animate-pulse">
                        <span className="text-sm text-green-600 font-bold uppercase">Target</span>
                        <span className="text-4xl font-black text-secondary-green">{targetNumber}</span>
                    </Card>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={hintEnabled ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setHintEnabled(!hintEnabled)}
                        className="gap-2"
                    >
                        {hintEnabled ? "🌟 Hint On" : "⭐ Hint Off"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => speakNumber(targetNumber, "Find ")}>
                        <Volume2 className="w-6 h-6" />
                    </Button>
                    <Button variant="primary" size="sm" onClick={startGame}>
                        <RefreshCw className="w-6 h-6" />
                    </Button>
                </div>
            </div>

            {/* Game Area - Scrollable Rows */}
            <div ref={gameContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {ANIMAL_ROWS.map((row) => (
                    <AnimalRow
                        key={row.id}
                        rowId={row.id}
                        startNumber={row.id * 10}
                        currentNumber={currentNumber}
                        targetNumber={targetNumber}
                        hintEnabled={hintEnabled}
                    />
                ))}
            </div>

            {/* Bottom Number Line */}
            <BottomNumberLine currentNumber={currentNumber} targetNumber={targetNumber} />

            {/* On-screen Controls (for touch) */}
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

            {/* Success Modal Overlay */}
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
                            <h2 className="text-4xl font-black text-primary-blue mb-2">You Did It!</h2>
                            <p className="text-xl text-gray-600 mb-8">
                                You found the number <span className="font-bold text-secondary-green">{targetNumber}</span>!
                            </p>
                            <Button size="xl" variant="primary" onClick={startGame} className="w-full animate-bounce">
                                Play Again
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

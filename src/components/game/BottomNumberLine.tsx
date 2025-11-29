import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BottomNumberLineProps {
    currentNumber: number;
    targetNumber: number;
}

export default function BottomNumberLine({
    currentNumber,
    targetNumber,
}: BottomNumberLineProps) {
    const numbers = Array.from({ length: 101 }, (_, i) => i);

    return (
        <div className="flex-none h-16 bg-white border-t-4 border-blue-100 relative overflow-hidden">
            <div className="flex items-center h-full justify-between px-2 gap-0.5">
                {numbers.map((num) => {
                    const isCurrent = num === currentNumber;
                    const isTarget = num === targetNumber;
                    const isTen = num % 10 === 0;
                    const showNumber = isTen || isCurrent || isTarget;

                    return (
                        <div
                            key={num}
                            className="flex flex-col items-center justify-center relative flex-1 min-w-0"
                        >
                            {/* Tick Mark */}
                            <div
                                className={cn(
                                    "mb-1",
                                    isCurrent ? "w-1 h-10 bg-blue-700" :
                                    isTarget ? "w-1 h-10 bg-green-700" :
                                    isTen ? "w-0.5 h-6 bg-gray-400" : "w-0.5 h-3 bg-gray-200"
                                )}
                            />

                            {/* Number - Only show multiples of 10, current, and target */}
                            {showNumber && (
                                <motion.div
                                    animate={{
                                        scale: isCurrent ? 1.25 : isTarget ? 1.25 : 1,
                                        color: isCurrent ? "#1D4ED8" : isTarget ? "#15803D" : "#6B7280",
                                        fontWeight: isCurrent || isTarget ? "500" : "500",
                                    }}
                                    className="text-xs transition-colors whitespace-nowrap"
                                >
                                    {num}
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Shadow overlay for depth */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" />
        </div>
    );
}

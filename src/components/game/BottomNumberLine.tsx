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
                                    "w-0.5 mb-1",
                                    isCurrent ? "h-8 bg-blue-500" :
                                    isTarget ? "h-8 bg-green-500" :
                                    isTen ? "h-6 bg-gray-400" : "h-3 bg-gray-200"
                                )}
                            />

                            {/* Number - Only show multiples of 10, current, and target */}
                            {showNumber && (
                                <motion.div
                                    animate={{
                                        scale: isCurrent ? 1.3 : 1,
                                        color: isCurrent ? "#3B82F6" : isTarget ? "#22C55E" : "#6B7280",
                                        fontWeight: isCurrent || isTarget ? "900" : "600",
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

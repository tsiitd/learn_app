import { useEffect, useRef } from "react";
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
    const scrollRef = useRef<HTMLDivElement>(null);
    const numbers = Array.from({ length: 101 }, (_, i) => i);

    // Auto-scroll to keep current number in view
    useEffect(() => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const itemWidth = 60; // Approximate width of each number item
            const centerOffset = container.clientWidth / 2 - itemWidth / 2;
            const scrollPos = currentNumber * itemWidth - centerOffset;

            container.scrollTo({
                left: scrollPos,
                behavior: "smooth",
            });
        }
    }, [currentNumber]);

    return (
        <div className="flex-none h-24 bg-white border-t-4 border-blue-100 relative">
            <div
                ref={scrollRef}
                className="flex items-center h-full overflow-x-auto no-scrollbar px-[50vw]"
                style={{ scrollBehavior: "smooth" }}
            >
                {numbers.map((num) => {
                    const isCurrent = num === currentNumber;
                    const isTarget = num === targetNumber;
                    const isTen = num % 10 === 0;

                    return (
                        <div
                            key={num}
                            className="flex-none w-[60px] flex flex-col items-center justify-center relative"
                        >
                            {/* Tick Mark */}
                            <div
                                className={cn(
                                    "w-1 bg-gray-200 mb-2",
                                    isTen ? "h-8 bg-gray-400" : "h-4"
                                )}
                            />

                            {/* Number */}
                            <motion.div
                                animate={{
                                    scale: isCurrent ? 1.5 : 1,
                                    color: isCurrent ? "#3B82F6" : isTarget ? "#22C55E" : "#9CA3AF",
                                    fontWeight: isCurrent || isTarget ? "900" : "500",
                                }}
                                className="text-lg transition-colors"
                            >
                                {num}
                            </motion.div>

                            {/* Target Indicator */}
                            {isTarget && (
                                <div className="absolute top-0 -mt-2 text-xs text-green-500 font-bold animate-bounce">
                                    Target
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Center Indicator */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-primary-blue w-1 mx-auto z-10" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" />
        </div>
    );
}

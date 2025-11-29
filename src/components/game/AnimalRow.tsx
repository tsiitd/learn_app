import { motion } from "framer-motion";
import { ANIMAL_ROWS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AnimalRowProps {
    rowId: number;
    startNumber: number;
    currentNumber: number;
    targetNumber: number;
    hintEnabled: boolean;
}

export default function AnimalRow({
    rowId,
    startNumber,
    currentNumber,
    targetNumber,
    hintEnabled,
}: AnimalRowProps) {
    const rowData = ANIMAL_ROWS[rowId];
    const numbers = Array.from({ length: 10 }, (_, i) => startNumber + i);
    const isActiveRow = currentNumber >= startNumber && currentNumber < startNumber + 10;

    const themeTextColor = rowData.borderColor.replace("border-", "text-").replace("-300", "-600");

    return (
        <motion.div
            animate={isActiveRow ? { scale: 1.02, y: -5 } : { scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "flex items-center h-26 px-3 mb-3 rounded-3xl transition-all duration-300",
                rowData.color,
                "border-4 border-transparent",
                isActiveRow
                    ? `border-${rowData.borderColor.split("-")[1]}-400 shadow-xl`
                    : "opacity-60 grayscale-[0.3]"
            )}
        >
            {/* Animal Icon - Using Twemoji images */}
            <motion.div
                animate={isActiveRow ? {
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.1, 1.1, 1.1, 1.1, 1]
                } : {}}
                transition={{ duration: 2, repeat: isActiveRow ? Infinity : 0, repeatDelay: 1 }}
                className="w-19 h-19 flex items-center justify-center mr-5 bg-white/60 rounded-full shadow-sm p-3"
            >
                <img
                    src={rowData.image}
                    alt={rowData.name}
                    className="w-full h-full object-contain"
                />
            </motion.div>

            {/* Numbers */}
            <div className="flex-1 flex justify-between items-center">
                {numbers.map((num) => {
                    const isCurrent = num === currentNumber;
                    const isTarget = num === targetNumber;

                    return (
                        <div
                            key={num}
                            className="relative flex items-center justify-center w-13 h-13"
                        >
                            {/* Target Marker (Star) - Only if Hint Enabled */}
                            {isTarget && hintEnabled && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1.5, rotate: 360 }}
                                    className="absolute inset-0 flex items-center justify-center -mt-6 z-20"
                                >
                                    <span className="text-4xl drop-shadow-md">⭐</span>
                                </motion.div>
                            )}

                            {/* Number Circle */}
                            <motion.div
                                animate={{
                                    scale: isCurrent ? 1.3 : 1,
                                    backgroundColor: isCurrent ? "#3B82F6" : "transparent",
                                    color: isCurrent ? "#FFFFFF" : "",
                                    y: isCurrent ? [0, -5, 0] : 0,
                                }}
                                transition={{
                                    y: { repeat: isCurrent ? Infinity : 0, duration: 0.5 }
                                }}
                                className={cn(
                                    "w-11 h-11 rounded-full flex items-center justify-center text-4xl font-black z-10 cursor-pointer",
                                    !isCurrent && themeTextColor,
                                    isCurrent ? "shadow-lg ring-4 ring-white" : ""
                                )}
                            >
                                {num}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

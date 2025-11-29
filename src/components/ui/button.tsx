"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "xl";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const variants = {
            primary: "bg-primary-blue text-white shadow-lg border-b-4 border-blue-700 active:border-b-0 active:translate-y-1",
            secondary: "bg-secondary-green text-white shadow-lg border-b-4 border-green-700 active:border-b-0 active:translate-y-1",
            outline: "bg-white border-4 border-primary-blue text-primary-blue shadow-sm active:bg-blue-50",
            ghost: "bg-transparent hover:bg-black/5 text-foreground",
        };

        const sizes = {
            sm: "h-10 px-4 text-base rounded-xl",
            md: "h-14 px-6 text-xl rounded-2xl",
            lg: "h-20 px-8 text-2xl rounded-3xl",
            xl: "h-24 px-10 text-3xl rounded-[2rem]",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "inline-flex items-center justify-center font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-yellow disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };

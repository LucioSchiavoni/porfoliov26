"use client"

import { cn } from "@/lib/utils"
import { motion, useAnimate, useInView } from "motion/react"
import { useEffect } from "react"

export function TypingAnimation({
    children,
    className,
    cursorClassName,
}: {
    children: string
    className?: string
    cursorClassName?: string
}) {
    const text = typeof children === "string" ? children : ""
    const characters = Array.from(text)

    const [scope, animate] = useAnimate()
    const isInView = useInView(scope)

    useEffect(() => {
        if (isInView) {
            animate(
                "span.char",
                {
                    opacity: 1,
                },
                {
                    duration: 0.05,
                    delay: (i) => i * 0.05,
                    ease: "easeInOut",
                }
            )
        }
    }, [isInView, animate])

    return (
        <span ref={scope} className={cn("inline", className)}>
            {characters.map((char, index) => (
                <motion.span
                    key={`char-${index}`}
                    className="char opacity-0"
                    initial={{ opacity: 0 }}
                >
                    {char}
                </motion.span>
            ))}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                }}
                className={cn("inline-block w-[4px] h-[1em] bg-blue-500 ml-1 align-middle", cursorClassName)}
            />
        </span>
    )
}

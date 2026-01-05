"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TypewriterProps {
    text: string
    delay?: number
    speed?: number
    className?: string
    onComplete?: () => void
    showUnderline?: boolean
}

export function Typewriter({ text, delay = 0, speed = 50, className, onComplete, showUnderline = true }: TypewriterProps) {
    const [visibleChars, setVisibleChars] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const hasStarted = useRef(false)
    const onCompleteRef = useRef(onComplete)

    // Keep onComplete ref updated
    useEffect(() => {
        onCompleteRef.current = onComplete
    }, [onComplete])

    useEffect(() => {
        // Prevent double execution in Strict Mode
        if (hasStarted.current) return
        hasStarted.current = true

        const timeout = setTimeout(() => {
            let currentIndex = 0
            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    currentIndex++
                    setVisibleChars(currentIndex)
                } else {
                    clearInterval(interval)
                    setIsComplete(true)
                    onCompleteRef.current?.()
                }
            }, speed)

            return () => clearInterval(interval)
        }, delay)

        return () => clearTimeout(timeout)
    }, [text, delay, speed])

    return (
        <span className={`relative  inline-block ${className}`}>
            {/* Render each character with individual animation */}
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={
                        index < visibleChars
                            ? { opacity: 1, y: 0, filter: "blur(0px)" }
                            : { opacity: 0, y: 20, filter: "blur(8px)" }
                    }
                    transition={{
                        duration: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="inline-block"
                    style={{
                        whiteSpace: char === " " ? "pre" : "normal",
                    }}
                >
                    {char}
                </motion.span>
            ))}


            {/* Underline effect */}
            {showUnderline && (
                <svg
                    className="absolute -bottom-2 left-0 w-full h-4 overflow-visible pointer-events-none"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        d="M0 8 Q50 2, 100 6 T200 8"
                        stroke="rgb(251 146 60)"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isComplete ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    />
                </svg>
            )}
        </span>
    )
}

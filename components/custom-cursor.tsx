"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isPointer, setIsPointer] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY })

            const target = e.target as HTMLElement
            setIsPointer(
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName === "BUTTON" ||
                target.tagName === "A"
            )
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div
            className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
        >
            <div
                className={`-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground/50 backdrop-blur-sm transition-all duration-200 ${
                    isPointer ? "h-12 w-12 bg-foreground/10" : "h-6 w-6 bg-foreground/5"
                }`}
            />
        </div>
    )
}

"use client"

import { useRef, useState, MouseEvent, ReactNode } from "react"

interface MagneticButtonProps {
    children: ReactNode
    variant?: "primary" | "secondary"
    size?: "default" | "lg"
    onClick?: () => void
    className?: string
}

export function MagneticButton({
    children,
    variant = "primary",
    size = "default",
    onClick,
    className = ""
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return

        const rect = buttonRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        setPosition({ x: x * 0.3, y: y * 0.3 })
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    const baseClasses = "relative rounded-full font-sans font-medium transition-all duration-300 backdrop-blur-md"
    const sizeClasses = size === "lg"
        ? "px-8 py-3 text-base"
        : "px-6 py-2 text-sm"
    const variantClasses = variant === "primary"
        ? "bg-foreground text-background hover:bg-foreground/90"
        : "border border-foreground/20 bg-foreground/15 text-foreground hover:bg-foreground/25"

    return (
        <button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
        >
            {children}
        </button>
    )
}

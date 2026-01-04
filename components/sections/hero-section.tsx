"use client"

import { TypewriterEffectSmooth } from "@/components/ui/typewriter"
import { motion } from "motion/react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
    const [showRole, setShowRole] = useState(false)

    const nameWords = [
        { text: "Hola,", className: "text-white" },
        { text: "Soy", className: "text-white" },
        { text: "Lucio", className: "text-white" },
        { text: "Schiavoni", className: "text-white" },
    ]

    const scrollToSection = () => {
        const nextSection = document.getElementById("about-section")
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden bg-background">
            {/* Texto "Bienvenido a mi portfolio" desde la izquierda */}
            <motion.p
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 tracking-widest uppercase"
            >
                Bienvenido a mi portfolio
            </motion.p>

            {/* Nombre con efecto typewriter */}
            <TypewriterEffectSmooth
                words={nameWords}
                duration={3}
                delay={1}
                onComplete={() => setShowRole(true)}
                cursorClassName="bg-white"
            />

            {/* Texto "Desarrollador Full Stack" desde la derecha, aparece después del nombre */}
            <motion.div
                initial={{ x: 200, opacity: 0 }}
                animate={showRole ? { x: 0, opacity: 1 } : { x: 200, opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
                className="mt-4"
            >
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
                    Desarrollador <span className="text-white font-bold">Full Stack</span>
                </h2>
            </motion.div>

            {/* Botón de scroll hacia abajo */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={showRole ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 1 }}
                onClick={scrollToSection}
                className="absolute bottom-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
                <span className="text-sm tracking-wide">Explorar</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-6 h-6" />
                </motion.div>
            </motion.button>

            {/* Fondo decorativo */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.05 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white blur-3xl"
                />
            </div>
        </section>
    )
}

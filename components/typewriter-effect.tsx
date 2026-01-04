"use client"
import { TypewriterEffectSmooth } from "./ui/typewriter"
import { motion } from "motion/react"

export default function TypewriterEffectSmoothDemo() {
    const words = [
        {
            text: "Hola,",
        },
        {
            text: "soy",
        },
        {
            text: "Lucio",
        },
        {
            text: "Schiavoni",
        },
    ]

    return (
        <div className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-background gap-8 md:gap-12 lg:gap-16 px-6 overflow-hidden">
            {/* Contenido del typewriter (IZQUIERDA) - z-index alto para estar adelante */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-20 flex flex-col items-center md:items-start w-full md:w-3/5 lg:w-1/2"
            >
                {/* Texto superior con animación desde la izquierda */}
                <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    className="text-muted-foreground text-base sm:text-lg md:text-xl lg:text-2xl mb-3 md:mb-4"
                >
                    Bienvenido a mi portafolio
                </motion.p>

                {/* Typewriter effect - en una línea en desktop */}
                <div className="w-full max-w-full overflow-visible">
                    <TypewriterEffectSmooth words={words} duration={2.5} delay={0.8} />
                </div>

                {/* Texto inferior con animación desde abajo */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 3.5, ease: "easeOut" }}
                    className="text-muted-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl mt-3 md:mt-4"
                >
                    Desarrollador Full Stack
                </motion.p>
            </motion.div>

            {/* Espacio para la imagen de perfil (DERECHA) - z-index bajo para estar atrás */}
            <div className="hidden md:flex md:w-2/5 lg:w-1/2 justify-center items-center relative z-0">
                {/* Aquí irá la imagen de perfil - quedará detrás del nombre */}
            </div>
        </div>
    )
}

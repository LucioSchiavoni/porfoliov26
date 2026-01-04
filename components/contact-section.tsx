"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { ExperienceSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { TypewriterEffectSmooth } from "./ui/typewriter"
import { Projects } from "./proyects"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

export default function HomePage() {
    const [currentSection, setCurrentSection] = useState(0)
    const [isLoaded, setIsLoaded] = useState(true)

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

    const sectionIds = ["home", "work", "services", "about", "contact"]

    const scrollToSection = (index: number) => {
        const sectionId = sectionIds[index]
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const sections = sectionIds.map(id => document.getElementById(id))
            const scrollPosition = window.scrollY + window.innerHeight / 2

            sections.forEach((section, index) => {
                if (section) {
                    const top = section.offsetTop
                    const bottom = top + section.offsetHeight
                    if (scrollPosition >= top && scrollPosition < bottom) {
                        setCurrentSection(index)
                    }
                }
            })
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <>
            <CustomCursor />

            <nav
                className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-center px-6 py-6 transition-opacity duration-700 md:px-12 bg-background/80 backdrop-blur-sm ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
            >
                <div className="hidden items-center gap-8 md:flex">
                    {["Home", "Work", "Services", "About", "Contact"].map((item, index) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(index)}
                            className={`group relative font-sans text-sm font-medium transition-colors ${currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                                }`}
                        >
                            {item}
                            <span
                                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </nav>

            <main className={`relative w-full bg-background transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                <section id="home" className="relative flex min-h-screen w-full flex-col md:flex-row justify-center items-center gap-8 md:gap-12 lg:gap-16 px-6 pt-24 md:px-8 lg:px-12">
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
                        <div className="w-full max-w-full">
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
                </section>

                <Projects />
                <ExperienceSection />
                <AboutSection scrollToSection={scrollToSection} />
                <ContactSection />
            </main>
        </>
    )
}

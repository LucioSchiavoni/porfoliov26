"use client"

import { CustomCursor } from "@/components/custom-cursor"
import { ExperienceSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { TypewriterEffectSmooth } from "./ui/typewriter"
import { Projects } from "./proyects"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { HeroSection } from "./sections/hero-section"

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
                className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-center px-6 py-6 transition-opacity duration-700 md:px-12  backdrop-blur-sm ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
            >
                <div className="hidden items-center gap-8 md:flex">
                    {["Home", "Work", "Services", "About", "Contact"].map((item, index) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(index)}
                            className={`group relative font-sans text-sm font-medium text-white hover:text-white ${currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
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

            <main>
                <HeroSection />
                <ExperienceSection />
                <Projects />
                <ContactSection />
            </main>
        </>
    )
}

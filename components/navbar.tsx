"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./theme-provider"
import { useLanguage } from "@/context/language-context"
import { LanguageSelector } from "./language-selector"
import { Moon, Sun } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Navbar() {
    const { setTheme, theme } = useTheme()
    const { t } = useLanguage()
    const [mounted, setMounted] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [currentSection, setCurrentSection] = useState("introduction")
    const progressBarRef = useRef<HTMLDivElement>(null)

    const menuItems = [
        { label: t.nav.home, href: "#home" },
        { label: t.nav.about, href: "#about" },
        { label: t.nav.projects, href: "#work" },
        { label: t.nav.contact, href: "#contact" },
    ]

    const sectionTexts: Record<string, string> = {
        introduction: t.nav.sections.introduction,
        about: t.nav.sections.about,
        experience: t.nav.sections.experience,
        projects: t.nav.sections.projects,
        contact: t.nav.sections.contact,
    }

    useEffect(() => {
        setMounted(true)

        const ctx = gsap.context(() => {
            // Scroll Progress Bar Animation
            gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left center" })

            gsap.to(progressBarRef.current, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0,
                },
            })

            // Section Text Change Logic
            const sections = [
                { id: "home", key: "introduction" },
                { id: "about", key: "about" },
                { id: "services", key: "experience" },
                { id: "work", key: "projects" },
                { id: "contact", key: "contact" },
            ]

            sections.forEach(({ id, key }) => {
                if (!document.getElementById(id)) return

                ScrollTrigger.create({
                    trigger: `#${id}`,
                    start: "top 60%",
                    end: "bottom 60%",
                    onEnter: () => setCurrentSection(key),
                    onEnterBack: () => setCurrentSection(key),
                })
            })
        })

        return () => ctx.revert()
    }, [])

    if (!mounted) return null

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-6 flex items-center justify-between w-full pointer-events-none">
                <div className="hidden md:flex items-center gap-2 font-bold leading-tight pointer-events-auto">
                    <span className="text-sm tracking-wide text-foreground/70">L</span>
                    <span className="text-sm tracking-wide text-foreground/70">S</span>
                </div>

                <div className="pointer-events-auto flex flex-col items-center">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex items-center gap-2 md:gap-4 group relative pb-1 overflow-hidden"
                    >
                        <span className="text-xs tracking-[0.25em] uppercase transition-all duration-300 w-[150px] md:w-[180px] text-right text-foreground/60">
                            {sectionTexts[currentSection]}
                        </span>

                        {/* Grid/dots icon */}
                        <div className="flex flex-col gap-[3px] transition-transform group-hover:scale-110">
                            <div className="flex gap-[3px]">
                                <span className="w-[3px] h-[3px] bg-foreground/60 rounded-full" />
                                <span className="w-[3px] h-[3px] bg-foreground/60 rounded-full" />
                            </div>
                            <div className="flex gap-[3px]">
                                <span className="w-[3px] h-[3px] bg-foreground/60 rounded-full" />
                                <span className="w-[3px] h-[3px] bg-foreground/60 rounded-full" />
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div
                            ref={progressBarRef}
                            className="absolute bottom-0 left-0 h-[2px] bg-foreground/80 w-full"
                            style={{
                                transformOrigin: "left center", // Initial scaleX handled by GSAP
                            }}
                        />
                    </button>
                </div>

                <div className="flex items-center gap-3 pointer-events-auto">
                    <LanguageSelector />
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/10 backdrop-blur-md transition-all hover:bg-foreground/20 hover:scale-105 active:scale-95"
                        aria-label="Toggle theme"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-foreground dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all text-foreground dark:rotate-0 dark:scale-100" />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur-xl border border-foreground/5 rounded-sm shadow-2xl shadow-black/20 px-6 py-5 min-w-[220px]"
                        >
                            <ul className="flex flex-col gap-1">
                                {menuItems.map((item, index) => (
                                    <motion.li
                                        key={item.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.04, duration: 0.2 }}
                                    >
                                        <a
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            className="block py-2.5 px-3 text-xs tracking-[0.2em] uppercase text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-all duration-200 rounded-sm"
                                        >
                                            {item.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                            {/* Línea decorativa inferior */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                                className="mt-4 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

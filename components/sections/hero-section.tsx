"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Typewriter } from "../typewriter"
import { TypingAnimation } from "@/components/ui/typing-animation"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
    const [showName, setShowName] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const heroContentRef = useRef<HTMLDivElement>(null)
    const aboutContentRef = useRef<HTMLDivElement>(null)
    const profileImageRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const techTagsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pin the hero section and create scroll-based transition
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 0.8,
                onUpdate: (self) => {
                    const progress = self.progress

                    // Fade out hero content with parallax effect
                    if (heroContentRef.current) {
                        gsap.to(heroContentRef.current, {
                            opacity: 1 - progress * 2.5,
                            y: -100 * progress,
                            scale: 1 - progress * 0.1,
                            filter: `blur(${progress * 8}px)`,
                            duration: 0,
                        })
                    }

                    // Fade in about content with smooth entrance
                    if (aboutContentRef.current) {
                        const aboutProgress = Math.max(0, (progress - 0.25) * 1.5)
                        gsap.to(aboutContentRef.current, {
                            opacity: Math.min(aboutProgress, 1),
                            y: 80 - 80 * Math.min(aboutProgress, 1),
                            scale: 0.95 + 0.05 * Math.min(aboutProgress, 1),
                            duration: 0,
                        })
                    }

                    // Profile image parallax and scale
                    if (profileImageRef.current) {
                        gsap.to(profileImageRef.current, {
                            scale: 1 + progress * 0.15,
                            y: -30 * progress,
                            duration: 0,
                        })
                    }

                    // Dynamic overlay opacity
                    if (overlayRef.current) {
                        gsap.to(overlayRef.current, {
                            opacity: 0.3 + progress * 0.4,
                            duration: 0,
                        })
                    }

                    // Tech tags stagger animation
                    if (techTagsRef.current) {
                        const tags = techTagsRef.current.children
                        const tagProgress = Math.max(0, (progress - 0.4) * 2)
                        Array.from(tags).forEach((tag, i) => {
                            gsap.to(tag, {
                                opacity: Math.min(tagProgress - i * 0.1, 1),
                                y: 20 - 20 * Math.min(tagProgress - i * 0.1, 1),
                                duration: 0,
                            })
                        })
                    }
                },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <div id="home" ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]">
            {/* Profile Image - Fixed Background with Parallax */}
            <div ref={profileImageRef} className="absolute right-0 top-0 h-full w-full md:w-[55%] pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0a0a0a]/60 to-[#0a0a0a] z-10" />
                <img
                    src="/professional-developer-portrait-silhouette-dark-mo.jpg"
                    alt="Lucio Schiavoni"
                    className="h-full w-full object-cover object-center opacity-50 blur-[1px] scale-105"
                />
                <div ref={overlayRef} className="absolute inset-0 bg-[#0a0a0a]/30" />
            </div>

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 via-transparent to-purple-500/5 pointer-events-none" />

            {/* Hero Content - Centered */}
            <div
                ref={heroContentRef}
                className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center"
            >
                <motion.p
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-white/60 text-sm md:text-lg font-mono mb-6"
                >
                    Bienvenido a mi portafolio
                </motion.p>

                <div>
                    <h1 className="text-white font-medium text-[clamp(2.5rem,10vw,7rem)] leading-[1.15] tracking-tight">

                        <TypingAnimation>Hola, soy Lucio Schiavoni</TypingAnimation>
                        {/* <Typewriter
                            text="Hola, soy Lucio Schiavoni"
                            delay={800}
                            speed={50}
                            onComplete={() => setShowName(true)}
                            showUnderline={false}
                        /> */}
                    </h1>
                </div>

                {/* Scroll indicator - Centered */}
                {showName && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            className="flex flex-col items-center gap-2 text-white/40"
                        >
                            <span className="text-xs font-mono">Scroll</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 5v14" />
                                <path d="m19 12-7 7-7-7" />
                            </svg>
                        </motion.div>
                    </motion.div>
                )}
            </div>

            {/* About Content - Fades in on scroll */}
            <div
                ref={aboutContentRef}
                className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-4xl opacity-0"
                style={{ transform: 'scale(0.95)' }}
            >
                <motion.span
                    className="text-[#3b82f6] text-sm font-mono mb-4 inline-block"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    {"<About />"}
                </motion.span>

                <h2 className="text-white font-bold text-[clamp(2rem,6vw,4rem)] leading-tight mb-6">
                    <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text">Sobre mí</span>
                </h2>

                <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-6">
                    Soy un desarrollador Full Stack apasionado por crear soluciones digitales innovadoras. Con experiencia en
                    React, Node.js, y tecnologías modernas, me especializo en construir aplicaciones web escalables y experiencias
                    de usuario excepcionales.
                </p>

                <p className="text-white/50 text-sm md:text-base max-w-2xl leading-relaxed">
                    Mi enfoque combina código limpio con diseño intuitivo, siempre buscando el equilibrio perfecto entre
                    funcionalidad y estética.
                </p>

                <div ref={techTagsRef} className="flex flex-wrap gap-3 mt-8">
                    {["React", "Node.js", "TypeScript", "Next.js", "PostgreSQL", "Docker"].map((tech) => (
                        <span
                            key={tech}
                            className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 text-sm rounded-full backdrop-blur-sm hover:bg-[#3b82f6]/20 hover:border-[#3b82f6]/30 transition-all duration-300 cursor-default opacity-0"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-30" />
        </div>
    )
}

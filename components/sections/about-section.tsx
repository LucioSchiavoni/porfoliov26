"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion"
import gsap from "gsap"
import { useLanguage } from "@/context/language-context"
import { useTheme } from "@/components/theme-provider"

const technologies = [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg" },
    { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original-wordmark.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain-wordmark.svg" },
    { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg" },
]

export function AboutSection() {
    const { t } = useLanguage()
    const { theme } = useTheme()
    const [isDark, setIsDark] = useState(true)
    const sectionRef = useRef<HTMLElement>(null)
    const textContainerRef = useRef<HTMLDivElement>(null)
    const imageContainerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const paragraphRef = useRef<HTMLParagraphElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (theme === "system") {
            setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
        } else {
            setIsDark(theme === "dark")
        }
    }, [theme])

    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.05])
    const textX = useTransform(scrollYProgress, [0, 0.3], [-50, 0])

    useEffect(() => {
        let ctx: gsap.Context | null = null

        const initGsap = async () => {
            const ScrollTrigger = (await import("gsap/ScrollTrigger")).ScrollTrigger
            gsap.registerPlugin(ScrollTrigger)

            ctx = gsap.context(() => {
                // Línea decorativa
                if (lineRef.current) {
                    gsap.fromTo(lineRef.current,
                        { scaleX: 0, opacity: 0 },
                        {
                            scaleX: 1,
                            opacity: 1,
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: lineRef.current,
                                start: "top 95%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    )
                }

                // Título con efecto de split
                if (titleRef.current) {
                    const text = titleRef.current.innerText
                    const chars = text.split("")
                    titleRef.current.innerHTML = chars
                        .map((char) => `<span class="inline-block" style="transform-style: preserve-3d;">${char === " " ? "&nbsp;" : char}</span>`)
                        .join("")

                    gsap.fromTo(titleRef.current.querySelectorAll("span"),
                        {
                            opacity: 0,
                            y: 80,
                            rotateX: -90
                        },
                        {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            duration: 0.8,
                            stagger: 0.03,
                            ease: "back.out(1.7)",
                            scrollTrigger: {
                                trigger: titleRef.current,
                                start: "top 95%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    )
                }

                // Párrafo con efecto de fade
                if (paragraphRef.current) {
                    gsap.fromTo(paragraphRef.current,
                        {
                            opacity: 0,
                            y: 30
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 1.2,
                            ease: "power4.out",
                            scrollTrigger: {
                                trigger: paragraphRef.current,
                                start: "top 90%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    )
                }

                // Imagen con parallax avanzado
                if (imageContainerRef.current) {
                    gsap.fromTo(imageContainerRef.current,
                        {
                            scale: 0.85,
                            opacity: 0,
                            rotateY: 10
                        },
                        {
                            scale: 1,
                            opacity: 1,
                            rotateY: 0,
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: imageContainerRef.current,
                                start: "top 95%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    )
                }
            }, sectionRef)
        }

        initGsap()

        return () => {
            if (ctx) ctx.revert()
        }
    }, [])

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const statVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 40,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    }

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center py-20 md:py-0 overflow-hidden"
        >

            <motion.div
                ref={textContainerRef}
                style={{ x: textX }}
                className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20"
            >
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Column - Text */}
                    <div className="flex-1 max-w-xl lg:max-w-none">
                        <div
                            ref={lineRef}
                            className="w-16 h-[1px] mb-8 bg-foreground/30"
                            style={{
                                transformOrigin: "left"
                            }}
                        />

                        <div className="flex items-center justify-between gap-6 mb-6 md:mb-8">
                            <h2
                                ref={titleRef}
                                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-light leading-[1.05] tracking-tight text-foreground flex-1"
                                style={{ perspective: "1000px" }}
                            >
                                {t.about.title}
                            </h2>

                            {/* Mobile Image - Small and next to title */}
                            <motion.div
                                className="lg:hidden shrink-0 w-32 h-32 sm:w-36 sm:h-36 relative"
                                style={{ scale: imageScale }}
                            >
                                <div
                                    className="relative w-full h-full rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl"
                                    style={{
                                        maskImage: "radial-gradient(circle at 50% 50%, black 0%, rgba(0,0,0,0.8) 70%, transparent 100%)",
                                        WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 0%, rgba(0,0,0,0.8) 70%, transparent 100%)",
                                    }}
                                >
                                    <Image
                                        src="/perfil2.jpg"
                                        alt="Lucio Schiavoni"
                                        fill
                                        className="object-cover"
                                        sizes="112px"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <p
                            ref={paragraphRef}
                            className="text-base md:text-lg lg:text-xl leading-relaxed mb-8 text-foreground/70 font-light max-w-[500px]"
                            style={{
                                fontFamily: "var(--font-geist-sans)",
                            }}
                        >
                            {t.about.description}
                        </p>

                        {/* Tech Stack Icons */}
                        <div className="mt-12">
                            <motion.h3
                                className="text-sm uppercase tracking-wider text-foreground/40 mb-6 font-mono"
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.6 }}
                            >
                                {t.about.techTitle}
                            </motion.h3>

                            {/* Mobile Slider */}
                            <div className="lg:hidden overflow-hidden">
                                <motion.div
                                    className="flex gap-8"
                                    animate={{
                                        x: [0, -50 * technologies.length],
                                    }}
                                    transition={{
                                        x: {
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            duration: 15,
                                            ease: "linear",
                                        },
                                    }}
                                >
                                    {/* Duplicamos los iconos para crear el efecto infinito */}
                                    {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                                        <div
                                            key={`${tech.name}-${index}`}
                                            className="flex-shrink-0 w-14 h-14 flex items-center justify-center"
                                        >
                                            <img
                                                src={tech.icon}
                                                alt={tech.name}
                                                className="w-10 h-10 object-contain"
                                            />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Desktop Grid */}
                            <motion.div
                                className="hidden lg:flex flex-wrap gap-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            >
                                {technologies.map((tech) => (
                                    <motion.div
                                        key={tech.name}
                                        variants={statVariants}
                                        className="group relative cursor-pointer"
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <div className="w-16 h-16 flex items-center justify-center">
                                            <img
                                                src={tech.icon}
                                                alt={tech.name}
                                                className="w-12 h-12 object-contain transition-transform duration-300"
                                            />
                                        </div>
                                        <span
                                            className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider text-foreground/60 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
                                        >
                                            {tech.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column - Image with parallax */}
                    <motion.div
                        ref={imageContainerRef}
                        className="hidden lg:flex flex-1 justify-end"
                        style={{ y: imageY, scale: imageScale }}
                    >
                        <div
                            className="relative w-[320px] h-[400px] md:w-[400px] md:h-[500px] lg:w-[450px] lg:h-[560px]"
                        >
                            {/* Imagen con máscara de degradado suave */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    maskImage: isDark
                                        ? "radial-gradient(ellipse 60% 60% at 50% 45%, black 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.3) 55%, transparent 75%)"
                                        : "linear-gradient(to right, transparent 0%, black 25%, black 85%, transparent 100%)",
                                    WebkitMaskImage: isDark
                                        ? "radial-gradient(ellipse 60% 60% at 50% 45%, black 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.3) 55%, transparent 75%)"
                                        : "linear-gradient(to right, transparent 0%, black 25%, black 85%, transparent 100%)",
                                }}
                            >
                                <Image
                                    src="/perfil2.jpg"
                                    alt="Lucio Schiavoni"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 450px"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
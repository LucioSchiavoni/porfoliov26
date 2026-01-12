"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion"
import gsap from "gsap"
import { ReactIcon, NodeIcon, NestIcon, NextIcon, AwsIcon, DockerIcon } from "../icons"
import { useLanguage } from "@/context/language-context"
import { useTheme } from "@/components/theme-provider"

const technologies = [
    { name: "React", icon: ReactIcon, color: "#61DAFB" },
    { name: "Node.js", icon: NodeIcon, color: "#339933" },
    { name: "NestJS", icon: NestIcon, color: "#E0234E" },
    { name: "Next.js", icon: NextIcon, color: "#FFFFFF" },
    { name: "AWS", icon: AwsIcon, color: "#FF9900" },
    { name: "Docker", icon: DockerIcon, color: "#2496ED" },
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

                        <h2
                            ref={titleRef}
                            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8 font-sans font-light leading-[1.05] tracking-tight text-foreground"
                            style={{ perspective: "1000px" }}
                        >
                            {t.about.title}
                        </h2>

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

                            <motion.div
                                className="flex flex-wrap gap-4"
                                variants={containerVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                            >
                                {technologies.map((tech, index) => (
                                    <motion.div
                                        key={tech.name}
                                        variants={statVariants}
                                        className="group relative"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                        style={{
                                            "--tech-color": tech.color,
                                            "--tech-shadow": `${tech.color}40`
                                        } as React.CSSProperties}
                                    >
                                        <div
                                            className="w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-300 bg-foreground/5 border border-foreground/10 group-hover:border-foreground/20 group-hover:bg-foreground/10 relative overflow-hidden"
                                        >
                                            {/* Glow effect on hover */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                                style={{ backgroundColor: tech.color }}
                                            />

                                            <tech.icon
                                                className="w-7 h-7 transition-all duration-300 text-foreground/60 group-hover:text-[var(--tech-color)] group-hover:drop-shadow-[0_0_5px_var(--tech-shadow)]"
                                                style={{ color: "currentColor" }}
                                            />
                                        </div>
                                        <span
                                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider text-foreground/40 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap translate-y-2 group-hover:translate-y-0"
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
                        className="flex-1 flex justify-center lg:justify-end"
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
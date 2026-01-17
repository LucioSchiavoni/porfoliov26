"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/context/language-context"

gsap.registerPlugin(ScrollTrigger)

// Icons
const ExternalLinkIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
)

const LockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
)

const projectsData = [
    {
        id: 1,
        title: "Digital Dental Lab",
        location: "Nextjs, Typescript",
        year: "2025",
        image: "/screen-dentallab.png",
        url: "https://www.digitaldentallab.uy/",
        isPrivate: false,
    },
    {
        id: 2,
        title: "Todo en Packaging",
        location: "Nextjs, Sanity CMS, Typescript",
        year: "2025",
        image: "/screen-todo.png",
        url: "https://todoenpackaging.com.uy/",
        isPrivate: false,
    },
    {
        id: 3,
        title: "Repositorio de archivos",
        location: "Nodejs, Mysql, React, Typescript",
        year: "2024",
        image: "/screen-rda.png",
        url: null,
        isPrivate: true,
    },
    {
        id: 4,
        title: "Inventario de equipos",
        location: "Nodejs, Mysql, React, Typescript",
        year: "2023",
        image: "/inventario-proyect.png",
        url: null,
        isPrivate: true,
    },
]

export function Projects() {
    const { t } = useLanguage()

    const projects = projectsData.map((project, index) => ({
        ...project,
        title: t.projects.items[index]?.title || project.title,
        category: t.projects.items[index]?.category || "",
    }))
    const containerRef = useRef<HTMLDivElement>(null)
    const slidesRef = useRef<(HTMLDivElement | null)[]>([])
    const dotsRef = useRef<(HTMLButtonElement | null)[]>([])
    const [isMobile, setIsMobile] = useState<boolean | null>(null)

    // Mobile detection - runs only on client after hydration
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // GSAP ScrollTrigger with cascade/stack animation
    useEffect(() => {
        if (isMobile === null || isMobile) return

        const ctx = gsap.context(() => {
            const totalSlides = projects.length
            const totalTransitions = totalSlides - 1

            // Set initial states - cards stacked with offset
            slidesRef.current.forEach((slide, index) => {
                if (!slide) return
                if (index === 0) {
                    gsap.set(slide, {
                        y: 0,
                        x: 0,
                        scale: 1,
                        opacity: 1,
                        zIndex: totalSlides - index,
                        rotateZ: 0,
                        pointerEvents: "auto",
                    })
                } else {
                    gsap.set(slide, {
                        y: 100,
                        x: 0,
                        scale: 0.95,
                        opacity: 0,
                        zIndex: totalSlides - index,
                        rotateZ: 0,
                        pointerEvents: "none",
                    })
                }
            })

            // Initial dot state
            dotsRef.current.forEach((dot, index) => {
                if (dot) {
                    gsap.set(dot.querySelector('span:last-child'), { scale: index === 0 ? 1 : 0 })
                }
            })

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: `+=${totalTransitions * 100}%`,
                pin: true,
                scrub: 0.3,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const progress = self.progress
                    const rawSlideIndex = progress * totalTransitions
                    const currentSlideIndex = Math.min(Math.floor(rawSlideIndex), totalTransitions - 1)
                    const activeIdx = Math.round(rawSlideIndex)

                    // Update dots
                    dotsRef.current.forEach((dot, index) => {
                        if (!dot) return
                        const bg = dot.querySelector('span:last-child')
                        if (index === activeIdx) {
                            gsap.to(bg, { scale: 1, duration: 0.2, overwrite: true })
                        } else {
                            gsap.to(bg, { scale: 0, duration: 0.2, overwrite: true })
                        }
                    })

                    // Handle final state
                    if (progress >= 0.99) {
                        slidesRef.current.forEach((slide, index) => {
                            if (!slide) return
                            if (index === totalSlides - 1) {
                                gsap.set(slide, {
                                    y: 0,
                                    x: 0,
                                    scale: 1,
                                    opacity: 1,
                                    zIndex: totalSlides,
                                    rotateZ: 0,
                                    pointerEvents: "auto",
                                })
                            } else {
                                gsap.set(slide, {
                                    y: -150,
                                    x: -30,
                                    scale: 0.85,
                                    opacity: 0,
                                    zIndex: 0,
                                    rotateZ: -2,
                                    pointerEvents: "none",
                                })
                            }
                        })
                        return
                    }

                    const slideProgress = rawSlideIndex - currentSlideIndex

                    slidesRef.current.forEach((slide, index) => {
                        if (!slide) return

                        if (index < currentSlideIndex) {
                            // Already passed - stacked behind and up-left
                            const stackOffset = currentSlideIndex - index
                            gsap.set(slide, {
                                y: -150 - (stackOffset * 20),
                                x: -30 - (stackOffset * 10),
                                scale: 0.85 - (stackOffset * 0.03),
                                opacity: 0,
                                zIndex: index,
                                rotateZ: -2 - (stackOffset * 0.5),
                                pointerEvents: "none",
                            })
                        } else if (index === currentSlideIndex) {
                            // Current card - moving up and left as it exits
                            gsap.set(slide, {
                                y: slideProgress * -150,
                                x: slideProgress * -30,
                                scale: 1 - (slideProgress * 0.15),
                                opacity: 1 - (slideProgress * 0.7),
                                zIndex: totalSlides - index + 1,
                                rotateZ: slideProgress * -2,
                                pointerEvents: slideProgress < 0.5 ? "auto" : "none",
                            })
                        } else if (index === currentSlideIndex + 1) {
                            // Next card - coming from below
                            gsap.set(slide, {
                                y: 100 - (slideProgress * 100),
                                x: 0,
                                scale: 0.95 + (slideProgress * 0.05),
                                opacity: slideProgress,
                                zIndex: totalSlides - index + 2,
                                rotateZ: 0,
                                pointerEvents: slideProgress >= 0.5 ? "auto" : "none",
                            })
                        } else {
                            // Future cards - hidden below
                            gsap.set(slide, {
                                y: 100,
                                x: 0,
                                scale: 0.95,
                                opacity: 0,
                                zIndex: totalSlides - index,
                                rotateZ: 0,
                                pointerEvents: "none",
                            })
                        }
                    })
                },
            })
        }, containerRef)

        return () => ctx.revert()
    }, [isMobile])

    // Wait for hydration to determine mobile/desktop
    if (isMobile === null) {
        return (
            <section id="work" className="h-screen w-full" />
        )
    }

    // Mobile - simple list without animations
    if (isMobile === true) {
        return (
            <section id="work" className="py-16 px-6">
                <h2 className="text-2xl font-light tracking-tight text-foreground mb-8">
                    {t.projects.title}
                </h2>
                <div className="flex flex-col gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="flex flex-col gap-4 pb-8 border-b border-foreground/10 last:border-b-0"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <span className="text-foreground/40 text-xs font-mono">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-foreground text-lg font-medium mt-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-foreground/60 text-sm mt-1">
                                        {project.category}
                                    </p>
                                </div>
                                <span className="text-foreground/40 text-xs font-mono">
                                    {project.year}
                                </span>
                            </div>
                            <p className="text-foreground/50 text-xs">
                                {project.location}
                            </p>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full max-w-[280px] h-auto rounded-lg shadow-md"
                            />
                            {project.isPrivate ? (
                                <div className="inline-flex items-center gap-2 text-foreground/40 text-xs mt-3">
                                    <LockIcon />
                                    <span>Proyecto privado</span>
                                </div>
                            ) : (
                                <a
                                    href={project.url!}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors w-fit"
                                >
                                    <span>Ver sitio</span>
                                    <ExternalLinkIcon />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        )
    }

    return (
        <section
            ref={containerRef}
            id="work"
            className="relative h-screen w-full overflow-hidden"
        >
            {/* Slides Container */}
            <div className="relative h-full w-full">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        ref={(el) => {
                            slidesRef.current[index] = el
                        }}
                        className="absolute inset-0 h-full w-full bg-background"
                        style={{
                            transformOrigin: "center top",
                            boxShadow: "0 -10px 40px -10px rgba(0,0,0,0.3)",
                        }}
                    >
                        {/* Glass overlay effect */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse at 30% 20%, var(--foreground) 0%, transparent 50%)",
                                opacity: 0.04,
                            }}
                        />

                        {/* Content Layout - Left text, Right image */}
                        <div className="relative z-10 flex h-full items-center p-8 md:p-16 lg:p-24">
                            {/* Left Side - Text Content */}
                            <div className="flex-1 flex flex-col justify-center">
                                <span className="text-foreground/60 text-sm font-mono mb-4">
                                    {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                                </span>
                                <h2 className="text-foreground text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4">
                                    {project.title}
                                </h2>
                                <div className="flex gap-4 text-foreground/60 text-sm md:text-base">
                                    <span>{project.category}</span>
                                    <span className="text-foreground/30">|</span>
                                    <span>{project.location}</span>
                                </div>
                                <div className="mt-6">
                                    {project.isPrivate ? (
                                        <div className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/20 rounded-lg text-foreground/50 text-sm">
                                            <LockIcon />
                                            <span>Proyecto privado</span>
                                        </div>
                                    ) : (
                                        <a
                                            href={project.url!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                                        >
                                            <span>Ver sitio</span>
                                            <ExternalLinkIcon />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Right Side - Project Image */}
                            <div className="flex-1 flex justify-end items-center">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="max-w-full max-h-[70vh] w-auto h-auto rounded-2xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot Navigation - absolute instead of fixed to stay within section */}
            <nav className="absolute right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
                {projects.map((project, index) => (
                    <button
                        key={project.id}
                        ref={(el) => {
                            dotsRef.current[index] = el
                        }}
                        className="group relative w-3 h-3"
                        aria-label={`Go to ${project.title}`}
                    >
                        <span className="absolute inset-0 rounded-full bg-foreground/30" />
                        <span className="absolute inset-0 rounded-full bg-primary scale-0" />
                    </button>
                ))}
            </nav>
        </section>
    )
}

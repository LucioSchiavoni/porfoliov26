"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        id: 1,
        title: "Digital Dental Lab",
        category: "Proyecto Freelance",
        location: "Nextjs, Typescript",
        year: "2024",
        image: "/screen-dentallab.png",
        bgColor: "#dc2626", // rojo
    },
    {
        id: 2,
        title: "Todo en packaging",
        category: "Proyecto Freelance",
        location: "Nextjs, Sanity CMS, Typescript",
        year: "2023",
        image: "/screen-todo.png",
        bgColor: "#eab308", // amarillo
    },
    {
        id: 3,
        title: "Repositorio de archivos",
        category: "Proyecto MEC",
        location: "Nodejs, Mysql, React, Typescript",
        year: "2024",
        image: "/screen-rda.png",
        bgColor: "#16a34a", // verde
    },
    {
        id: 4,
        title: "Inventario de equipos",
        category: "Proyecto MEC",
        location: "Nodejs, Mysql, React, Typescript",
        year: "2023",
        image: "/inventario-proyect.png",
        bgColor: "#2563eb", // azul
    },
]

export function Projects() {
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

    // GSAP ScrollTrigger with 3D flip animation
    useEffect(() => {
        if (isMobile === null || isMobile) return

        const ctx = gsap.context(() => {
            const totalSlides = projects.length
            const totalTransitions = totalSlides - 1

            // Set initial states
            slidesRef.current.forEach((slide, index) => {
                if (!slide) return
                if (index === 0) {
                    gsap.set(slide, { rotateY: 0, opacity: 1, zIndex: totalSlides })
                } else {
                    gsap.set(slide, { rotateY: -90, opacity: 0, zIndex: totalSlides - index })
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
                scrub: 0.5,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const progress = self.progress
                    const rawSlideIndex = progress * totalTransitions
                    const currentSlideIndex = Math.min(Math.floor(rawSlideIndex), totalTransitions - 1)

                    // Asegurar que el último índice se maneje correctamente
                    const activeIdx = Math.round(rawSlideIndex)

                    // Update dots directly without re-render
                    dotsRef.current.forEach((dot, index) => {
                        if (!dot) return
                        const bg = dot.querySelector('span:last-child')
                        if (index === activeIdx) {
                            gsap.to(bg, { scale: 1, duration: 0.2, overwrite: true })
                        } else {
                            gsap.to(bg, { scale: 0, duration: 0.2, overwrite: true })
                        }
                    })

                    // Handle final state lock
                    if (progress >= 0.99) {
                        slidesRef.current.forEach((slide, index) => {
                            if (!slide) return
                            if (index === totalSlides - 1) {
                                gsap.set(slide, { rotateY: 0, opacity: 1, zIndex: totalSlides })
                            } else {
                                gsap.set(slide, { rotateY: 90, opacity: 0, zIndex: 0 })
                            }
                        })
                        return
                    }

                    const slideProgress = rawSlideIndex - currentSlideIndex

                    slidesRef.current.forEach((slide, index) => {
                        if (!slide) return

                        if (index < currentSlideIndex) {
                            // Already passed
                            gsap.set(slide, { rotateY: 90, opacity: 0, zIndex: 0 })
                        } else if (index === currentSlideIndex) {
                            // Current - exiting
                            gsap.set(slide, {
                                rotateY: slideProgress * 90,
                                opacity: 1 - slideProgress * 0.5,
                                zIndex: totalSlides - index,
                            })
                        } else if (index === currentSlideIndex + 1) {
                            // Next - entering
                            gsap.set(slide, {
                                rotateY: -90 + slideProgress * 90,
                                opacity: 0.5 + slideProgress * 0.5,
                                zIndex: totalSlides - index + 1,
                            })
                        } else {
                            // Future
                            gsap.set(slide, { rotateY: -90, opacity: 0, zIndex: 0 })
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
            <section id="work" className="h-screen w-full bg-[#0a0a0a]" />
        )
    }

    // Mobile fallback - simple scroll with snap
    if (isMobile === true) {
        return (
            <section id="work" className="bg-[#0a0a0a]">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="relative h-screen w-full overflow-hidden flex flex-col"
                        style={{ backgroundColor: project.bgColor }}
                    >
                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-center p-8">
                            <span className="text-white/80 text-sm font-mono mb-4">
                                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                            </span>
                            <h2 className="text-white text-4xl font-medium mb-4">
                                {project.title}
                            </h2>
                            <div className="flex flex-wrap gap-2 text-white/80 text-sm">
                                <span>{project.category}</span>
                                <span className="text-white/50">|</span>
                                <span>{project.location}</span>
                            </div>
                        </div>

                        {/* Project Image */}
                        <div className="px-8 pb-8">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-auto rounded-lg shadow-2xl"
                            />
                        </div>
                    </div>
                ))}
            </section>
        )
    }

    return (
        <section
            ref={containerRef}
            id="work"
            className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]"
            style={{ perspective: "1500px" }}
        >
            {/* Slides Container */}
            <div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
            >
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        ref={(el) => {
                            slidesRef.current[index] = el
                        }}
                        className="absolute inset-0 h-full w-full"
                        style={{
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                            transformOrigin: "left center",
                            backgroundColor: project.bgColor,
                        }}
                    >
                        {/* Content Layout - Left text, Right image */}
                        <div className="relative z-10 flex h-full items-center p-8 md:p-16 lg:p-24">
                            {/* Left Side - Text Content */}
                            <div className="flex-1 flex flex-col justify-center">
                                <span className="text-white/80 text-sm font-mono mb-4">
                                    {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                                </span>
                                <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-medium mb-4">
                                    {project.title}
                                </h2>
                                <div className="flex gap-4 text-white/80 text-sm md:text-base">
                                    <span>{project.category}</span>
                                    <span className="text-white/50">|</span>
                                    <span>{project.location}</span>
                                </div>
                            </div>

                            {/* Right Side - Project Image */}
                            <div className="flex-1 flex justify-end items-center">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="max-w-full max-h-[70vh] w-auto h-auto rounded-lg shadow-2xl"
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
                        <span className="absolute inset-0 rounded-full bg-white/30" />
                        <span className="absolute inset-0 rounded-full bg-[#3b82f6] scale-0" />
                    </button>
                ))}
            </nav>
        </section>
    )
}

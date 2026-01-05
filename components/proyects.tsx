"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        id: 1,
        title: "Villa Serena",
        category: "Residential",
        location: "Malibu, California",
        year: "2024",
        image: "/images/hously-1.png",
    },
    {
        id: 2,
        title: "The Glass Pavilion",
        category: "Commercial",
        location: "Tokyo, Japan",
        year: "2023",
        image: "/images/hously-2.png",
    },
    {
        id: 3,
        title: "Casa Terra",
        category: "Residential",
        location: "Lisbon, Portugal",
        year: "2023",
        image: "/images/hously-3.png",
    },
    {
        id: 4,
        title: "Nordic Retreat",
        category: "Hospitality",
        location: "Oslo, Norway",
        year: "2024",
        image: "/images/hously-4.png",
    },
]

export function Projects() {
    const containerRef = useRef<HTMLDivElement>(null)
    const slidesRef = useRef<(HTMLDivElement | null)[]>([])
    const dotsRef = useRef<(HTMLButtonElement | null)[]>([])
    const [isMobile, setIsMobile] = useState<boolean | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)

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

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: `+=${totalTransitions * 100}%`,
                pin: true,
                scrub: 0.8,
                onUpdate: (self) => {
                    const progress = self.progress
                    const rawSlideIndex = progress * totalTransitions
                    const currentSlideIndex = Math.min(Math.floor(rawSlideIndex), totalTransitions - 1)
                    const slideProgress = rawSlideIndex - currentSlideIndex

                    setActiveIndex(Math.round(rawSlideIndex))

                    slidesRef.current.forEach((slide, index) => {
                        if (!slide) return

                        if (index < currentSlideIndex) {
                            // Already passed - rotated out
                            gsap.set(slide, {
                                rotateY: 90,
                                opacity: 0,
                                zIndex: 0,
                            })
                        } else if (index === currentSlideIndex) {
                            // Current slide - rotating out
                            gsap.set(slide, {
                                rotateY: slideProgress * 90,
                                opacity: 1 - slideProgress * 0.5,
                                zIndex: totalSlides - index,
                            })
                        } else if (index === currentSlideIndex + 1) {
                            // Next slide - rotating in
                            gsap.set(slide, {
                                rotateY: -90 + slideProgress * 90,
                                opacity: 0.5 + slideProgress * 0.5,
                                zIndex: totalSlides - index + 1,
                            })
                        } else {
                            // Future slides - hidden
                            gsap.set(slide, {
                                rotateY: -90,
                                opacity: 0,
                                zIndex: 0,
                            })
                        }
                    })
                },
            })
        }, containerRef)

        return () => ctx.revert()
    }, [isMobile])

    // Mobile fallback - simple scroll with snap
    if (isMobile === true) {
        return (
            <section id="work" className="bg-[#0a0a0a]">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="relative h-screen w-full overflow-hidden"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                        </div>

                        {/* Content Overlay */}
                        <div className="relative z-10 flex h-full flex-col justify-end p-8">
                            <span className="text-[#3b82f6] text-sm font-mono mb-4">
                                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                            </span>
                            <h2 className="text-white text-4xl font-medium mb-4">
                                {project.title}
                            </h2>
                            <div className="flex gap-4 text-white/60 text-sm">
                                <span>{project.category}</span>
                                <span className="text-white/30">|</span>
                                <span>{project.location}</span>
                            </div>
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
                        }}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                        </div>

                        {/* Content Overlay */}
                        <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-16 lg:p-24">
                            <span className="text-[#3b82f6] text-sm font-mono mb-4">
                                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                            </span>
                            <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-medium mb-4">
                                {project.title}
                            </h2>
                            <div className="flex gap-4 text-white/60 text-sm md:text-base">
                                <span>{project.category}</span>
                                <span className="text-white/30">|</span>
                                <span>{project.location}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dot Navigation */}
            <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
                {projects.map((project, index) => (
                    <button
                        key={project.id}
                        ref={(el) => {
                            dotsRef.current[index] = el
                        }}
                        className="group relative w-3 h-3"
                        aria-label={`Go to ${project.title}`}
                    >
                        <span className="absolute inset-0 rounded-full bg-white/30 transition-all duration-300" />
                        <span
                            className={`absolute inset-0 rounded-full bg-[#3b82f6] transition-transform duration-300 ${
                                activeIndex === index ? "scale-100" : "scale-0"
                            }`}
                        />
                    </button>
                ))}
            </nav>
        </section>
    )
}

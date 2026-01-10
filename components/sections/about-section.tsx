"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)

    const aboutText = "Desarrollador Fullstack especializado en Node.js, React y TypeScript. Desde 2022 construyo aplicaciones web completas, con experiencia profesional en el sector público uruguayo y clientes privados."

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial states
            gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" })
            gsap.set(textRef.current, { opacity: 0, y: 60 })
            gsap.set(imageRef.current, {
                opacity: 0,
                clipPath: "inset(100% 0% 0% 0%)"
            })
            gsap.set(statsRef.current, { opacity: 0, y: 40 })

            // Create scroll-triggered animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    scrub: 1,
                }
            })

            // Line expands
            tl.to(lineRef.current, {
                scaleX: 1,
                duration: 0.3,
                ease: "power2.out",
            }, 0)

            // Text fades in and moves up
            tl.to(textRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
            }, 0.1)

            // Image reveals
            tl.to(imageRef.current, {
                opacity: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.6,
                ease: "power3.out",
            }, 0.2)

            // Stats fade in
            tl.to(statsRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out",
            }, 0.4)

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full min-h-screen bg-[#0a0a0a] flex items-center py-20 md:py-0"
        >
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Column - Text */}
                    <div ref={textRef} className="flex-1 max-w-xl lg:max-w-none">
                        <div
                            ref={lineRef}
                            className="w-16 h-[1px] mb-8"
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                        />

                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8"
                            style={{
                                fontFamily: "var(--font-bebas-neue)",
                                color: "#ffffff",
                                letterSpacing: "0.05em",
                            }}
                        >
                            SOBRE MI
                        </h2>

                        <p
                            className="text-base md:text-lg lg:text-xl leading-relaxed mb-8"
                            style={{
                                fontFamily: "var(--font-geist-sans)",
                                color: "rgba(255, 255, 255, 0.7)",
                                fontWeight: 300,
                                maxWidth: "500px",
                            }}
                        >
                            {aboutText}
                        </p>

                        {/* Stats */}
                        <div ref={statsRef} className="flex gap-8 mt-8">
                            <div>
                                <p
                                    className="text-3xl md:text-4xl font-bold"
                                    style={{
                                        fontFamily: "var(--font-bebas-neue)",
                                        color: "#ffffff"
                                    }}
                                >
                                    2022
                                </p>
                                <p
                                    className="text-xs tracking-wider uppercase mt-1"
                                    style={{ color: "rgba(255, 255, 255, 0.4)" }}
                                >
                                    Desde
                                </p>
                            </div>
                            <div>
                                <p
                                    className="text-3xl md:text-4xl font-bold"
                                    style={{
                                        fontFamily: "var(--font-bebas-neue)",
                                        color: "#ffffff"
                                    }}
                                >
                                    +15
                                </p>
                                <p
                                    className="text-xs tracking-wider uppercase mt-1"
                                    style={{ color: "rgba(255, 255, 255, 0.4)" }}
                                >
                                    Proyectos
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div
                        ref={imageRef}
                        className="flex-1 flex justify-center lg:justify-end"
                    >
                        <div
                            className="relative w-[280px] h-[350px] md:w-[350px] md:h-[440px] lg:w-[400px] lg:h-[500px]"
                            style={{
                                borderRadius: "8px",
                                overflow: "hidden",
                            }}
                        >
                            {/* Overlay gradient */}
                            <div
                                className="absolute inset-0 z-10 pointer-events-none"
                                style={{
                                    background: "linear-gradient(180deg, transparent 60%, rgba(10, 10, 10, 0.8) 100%)",
                                }}
                            />
                            <Image
                                src="/perfil.jpg"
                                alt="Lucio Schiavoni"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 400px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

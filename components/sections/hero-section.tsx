"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { motion, AnimatePresence } from "framer-motion"

export function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const nameContainerRef = useRef<HTMLDivElement>(null)
    const firstLineRef = useRef<HTMLDivElement>(null)
    const secondLineRef = useRef<HTMLDivElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const scrollIndicatorRef = useRef<HTMLDivElement>(null)

    const [showSubtitle, setShowSubtitle] = useState(false)

    const firstName = "LUCIO"
    const lastName = "SCHIAVONI"

    // Initial name reveal animation with scroll lock
    useLayoutEffect(() => {
        document.body.style.overflow = "hidden"
        document.documentElement.style.overflow = "hidden"
        const preventScroll = (e: TouchEvent) => e.preventDefault()
        document.addEventListener("touchmove", preventScroll, { passive: false })

        const ctx = gsap.context(() => {
            const firstLineLetters = firstLineRef.current?.querySelectorAll('.letter')
            const secondLineLetters = secondLineRef.current?.querySelectorAll('.letter')

            if (!firstLineLetters || !secondLineLetters) return

            // Set initial states
            gsap.set(nameContainerRef.current, { opacity: 1 })
            gsap.set(firstLineLetters, { opacity: 0, y: 60, rotateX: -90 })
            gsap.set(secondLineLetters, { opacity: 0, y: 60, rotateX: -90 })
            gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 20 })

            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                onComplete: () => {
                    document.body.style.overflow = ""
                    document.documentElement.style.overflow = ""
                    document.removeEventListener("touchmove", preventScroll)
                    setShowSubtitle(true)
                }
            })

            // First line letters animate in
            tl.to(
                firstLineLetters,
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.08,
                },
                0.3
            )

            // Second line letters animate in with slight delay
            tl.to(
                secondLineLetters,
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.05,
                },
                0.6
            )

            // Scroll indicator fades in
            tl.to(
                scrollIndicatorRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                },
                1.5
            )

        }, containerRef)

        return () => {
            document.body.style.overflow = ""
            document.documentElement.style.overflow = ""
            document.removeEventListener("touchmove", preventScroll)
            ctx.revert()
        }
    }, [])

    return (
        <section
            id="home"
            ref={sectionRef}
            className="h-screen w-full bg-[#0a0a0a] relative overflow-hidden"
        >
            <div
                ref={containerRef}
                className="h-full w-full flex items-center justify-center overflow-hidden"
            >

                <div
                    ref={nameContainerRef}
                    className="absolute flex flex-col items-center justify-center opacity-0 z-20"
                    style={{
                        willChange: "transform",
                        maxHeight: "80vh",
                    }}
                >

                    <div
                        ref={firstLineRef}
                        className="flex overflow-visible"
                        style={{
                            fontFamily: "var(--font-bebas-neue)",
                            perspective: "1000px",
                        }}
                    >
                        {firstName.split("").map((letter, index) => (
                            <span
                                key={`first-${index}`}
                                className="letter inline-block leading-none uppercase"
                                style={{
                                    fontSize: "clamp(3rem, 14vw, 16rem)",
                                    letterSpacing: "0.02em",
                                    color: "#c4c4c4",
                                    willChange: "transform, opacity",
                                    transformOrigin: "center center",
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>

                    {/* Segunda linea: SCHIAVONI */}
                    <div
                        ref={secondLineRef}
                        className="flex overflow-visible -mt-1 md:-mt-4 lg:-mt-6"
                        style={{
                            fontFamily: "var(--font-bebas-neue)",
                            perspective: "1000px",
                        }}
                    >
                        {lastName.split("").map((letter, index) => (
                            <span
                                key={`second-${index}`}
                                className="letter inline-block leading-none uppercase"
                                style={{
                                    fontSize: "clamp(3rem, 14vw, 16rem)",
                                    letterSpacing: "0.02em",
                                    color: "#c4c4c4",
                                    willChange: "transform, opacity",
                                    transformOrigin: "center center",
                                }}
                            >
                                {letter}
                            </span>
                        ))}
                    </div>

                    {/* Subtitulo */}
                    <AnimatePresence>
                        {showSubtitle && (
                            <motion.p
                                ref={subtitleRef}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-[0.65rem] md:text-sm lg:text-base tracking-[0.25em] uppercase mt-1 md:mt-2"
                                style={{
                                    fontFamily: "var(--font-geist-sans)",
                                    color: "rgba(255, 255, 255, 0.5)",
                                    fontWeight: 300,
                                }}
                            >
                                Desarrollador de Software
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                {/* SCROLL INDICATOR */}
                <div
                    ref={scrollIndicatorRef}
                    className="absolute bottom-8 left-8 z-30"
                    style={{ opacity: 0 }}
                >
                    <p
                        className="text-xs tracking-[0.2em] uppercase"
                        style={{
                            fontFamily: "var(--font-geist-mono)",
                            color: "rgba(255, 255, 255, 0.4)",
                        }}
                    >
                        [Scroll to explore]
                    </p>
                </div>

                {/* Background lines */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    <div
                        className="absolute top-1/4 left-0 right-0 h-[1px]"
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03) 50%, transparent)",
                        }}
                    />
                    <div
                        className="absolute top-3/4 left-0 right-0 h-[1px]"
                        style={{
                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03) 50%, transparent)",
                        }}
                    />
                    <div
                        className="absolute left-1/4 top-0 bottom-0 w-[1px]"
                        style={{
                            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.02) 50%, transparent)",
                        }}
                    />
                    <div
                        className="absolute right-1/4 top-0 bottom-0 w-[1px]"
                        style={{
                            background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.02) 50%, transparent)",
                        }}
                    />
                </div>
            </div>
        </section>
    )
}

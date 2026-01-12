"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/language-context"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
    const { t } = useLanguage()
    const sectionRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const nameContainerRef = useRef<HTMLDivElement>(null)
    const firstLineRef = useRef<HTMLDivElement>(null)
    const secondLineRef = useRef<HTMLDivElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const scrollIndicatorRef = useRef<HTMLDivElement>(null)

    const [showSubtitle, setShowSubtitle] = useState(false)

    const firstLine = "Lucio"
    const secondLine = "Schiavoni"

    useLayoutEffect(() => {
        document.body.style.overflow = "hidden"
        document.documentElement.style.overflow = "hidden"
        const preventScroll = (e: TouchEvent) => e.preventDefault()
        document.addEventListener("touchmove", preventScroll, { passive: false })

        const ctx = gsap.context(() => {
            const firstLineLetters = firstLineRef.current?.querySelectorAll(".letter")
            const secondLineLetters = secondLineRef.current?.querySelectorAll(".letter")

            if (!firstLineLetters || !secondLineLetters) return

            gsap.set(nameContainerRef.current, { opacity: 1 })
            gsap.set(firstLineLetters, { opacity: 0, y: 60, rotateX: -90 })
            gsap.set(secondLineLetters, { opacity: 0, y: 60, rotateX: -90 })
            gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 20 })

            const introTl = gsap.timeline({
                defaults: { ease: "power3.out" },
                onComplete: () => {
                    document.body.style.overflow = ""
                    document.documentElement.style.overflow = ""
                    document.removeEventListener("touchmove", preventScroll)
                    setShowSubtitle(true)
                },
            })

            introTl.to(
                firstLineLetters,
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.08,
                },
                0.3,
            )

            introTl.to(
                secondLineLetters,
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.05,
                },
                0.6,
            )

            introTl.to(
                scrollIndicatorRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                },
                1.5,
            )

            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=50%",
                    pin: true,
                    scrub: 0.5,
                    anticipatePin: 1,
                },
            })

            scrollTl.to(
                nameContainerRef.current,
                {
                    scale: 1.1,
                    opacity: 0,
                    filter: "blur(10px)",
                    y: -50,
                    duration: 0.8,
                    ease: "power1.in",
                },
                0,
            )

            scrollTl.to(
                subtitleRef.current,
                {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                },
                0,
            )

            scrollTl.to(
                scrollIndicatorRef.current,
                {
                    opacity: 0,
                    duration: 0.2,
                },
                0,
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
        <section id="home" ref={sectionRef} className="h-screen w-full relative overflow-hidden">
            <div ref={containerRef} className="h-full w-full flex items-center justify-center overflow-hidden">
                <div
                    ref={nameContainerRef}
                    className="absolute flex flex-col items-center justify-center opacity-0 z-20"
                    style={{
                        willChange: "transform",
                        maxHeight: "80vh",
                    }}
                >
                    <div ref={firstLineRef} className="flex overflow-visible" style={{ perspective: "1000px" }}>
                        {firstLine.split("").map((letter, index) => (
                            <span
                                key={`first-${index}`}
                                className="letter inline-block leading-[1.05] uppercase font-sans font-light tracking-tight text-foreground"
                                style={{
                                    fontSize: "clamp(4rem, 18vw, 20rem)",
                                    willChange: "transform, opacity",
                                    transformOrigin: "center center",
                                }}
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </span>
                        ))}
                    </div>

                    <div
                        ref={secondLineRef}
                        className="flex overflow-visible -mt-4 md:-mt-8 lg:-mt-12"
                        style={{ perspective: "1000px" }}
                    >
                        {secondLine.split("").map((letter, index) => (
                            <span
                                key={`second-${index}`}
                                className="letter inline-block leading-[1.05] uppercase font-sans font-light tracking-tight text-foreground"
                                style={{
                                    fontSize: "clamp(4rem, 18vw, 20rem)",
                                    willChange: "transform, opacity",
                                    transformOrigin: "center center",
                                }}
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </span>
                        ))}
                    </div>

                    <AnimatePresence>
                        {showSubtitle && (
                            <motion.div
                                ref={subtitleRef}
                                initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                transition={{
                                    duration: 1,
                                    ease: [0.25, 0.1, 0.25, 1],
                                    opacity: { duration: 0.8 },
                                    filter: { duration: 1.2 },
                                }}
                                className="flex flex-col items-center mt-8 md:mt-12"
                            >
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="text-sm md:text-base tracking-[0.3em] uppercase font-medium text-foreground/80"
                                >
                                    {t.hero.role.split("").map((char, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: 0.2 + index * 0.03,
                                                duration: 0.4,
                                                ease: "easeOut",
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* SCROLL INDICATOR */}
                <div ref={scrollIndicatorRef} className="absolute bottom-8 left-8 z-30" style={{ opacity: 0 }}>
                    <p className="text-xs tracking-[0.2em] uppercase font-mono text-foreground/40">
                        {t.hero.scroll}
                    </p>
                </div>


                {/* Background decorative lines */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    {/* Curved lines like in the screenshot */}
                    <svg className="absolute inset-0 w-full h-full opacity-15">
                        <path d="M0,400 Q400,200 800,500 T1600,300" className="stroke-foreground/10" strokeWidth="1" fill="none" />
                        <path d="M0,500 Q500,300 1000,600 T2000,400" className="stroke-foreground/10" strokeWidth="1" fill="none" />
                        <path d="M200,0 Q400,400 200,800" className="stroke-foreground/10" strokeWidth="1" fill="none" />
                    </svg>
                </div>
            </div>
        </section>
    )
}

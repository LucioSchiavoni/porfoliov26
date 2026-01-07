"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const nameRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)

    const fullName = "LUCIO SCHIAVONI"
    const aboutText = "Fullstack Developer based in Montevideo, Uruguay. Passionate about creating seamless digital experiences and writing clean, efficient code."

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const firstLetterL = nameRef.current?.querySelector('[data-letter="L"]') as HTMLElement | null
            const restOfFirstName = nameRef.current?.querySelectorAll('[data-index="1"], [data-index="2"], [data-index="3"], [data-index="4"]')
            const lastNameLetters = nameRef.current?.querySelectorAll('[data-index="5"], [data-index="6"], [data-index="7"], [data-index="8"], [data-index="9"], [data-index="10"], [data-index="11"], [data-index="12"], [data-index="13"], [data-index="14"]')

            if (!firstLetterL || !restOfFirstName || !lastNameLetters) return

            gsap.set(nameRef.current, { opacity: 1 })
            gsap.set(restOfFirstName, { opacity: 0, x: -20 })
            gsap.set(lastNameLetters, { opacity: 0, x: -20 })
            gsap.set(aboutRef.current, { opacity: 0 })
            gsap.set(imageRef.current, { opacity: 0, y: 50 })
            gsap.set(textRef.current, { opacity: 0, y: 50 })

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

            tl.fromTo(
                firstLetterL,
                { scale: 1.3, x: 0 },
                { scale: 1, x: 0, duration: 0.6 }
            )

            tl.to(
                restOfFirstName,
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.04,
                },
                "-=0.3"
            )

            tl.to({}, { duration: 0.15 })

            tl.to(
                lastNameLetters,
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    stagger: 0.04,
                },
            )

            tl.to({}, { duration: 1 })

            tl.to(
                nameRef.current,
                {
                    position: "absolute",
                    top: "8rem",
                    left: "2rem",
                    right: "auto",
                    transform: "none",
                    scale: 0.35,
                    transformOrigin: "left center",
                    duration: 0.8,
                    ease: "power2.inOut",
                }
            )

            tl.to(
                aboutRef.current,
                {
                    opacity: 1,
                    duration: 0.5,
                },
                "-=0.4"
            )

            tl.to(
                imageRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                },
                "-=0.3"
            )

            tl.to(
                textRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                },
                "-=0.4"
            )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div
            ref={containerRef}
            className="min-h-screen w-full bg-black relative overflow-hidden"
        >
            <div className="h-screen w-full flex items-center justify-center">
                <div
                    ref={nameRef}
                    className="flex opacity-0 whitespace-nowrap fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                    style={{ fontFamily: "var(--font-bebas-neue)" }}
                >
                    {fullName.split("").map((letter, index) => (
                        <span
                            key={index}
                            data-letter={letter}
                            data-index={index}
                            className="leading-none uppercase tracking-wider"
                            style={{
                                fontSize: "clamp(2rem, 10vw, 10rem)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                backgroundImage: "linear-gradient(180deg, #ffffff 0%, #e8e8e8 25%, #b8b8b8 50%, #888888 75%, #666666 100%)",
                                display: "inline-block",
                                width: letter === " " ? "0.3em" : "auto",
                            }}
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </span>
                    ))}
                </div>
            </div>

            <div
                ref={aboutRef}
                className="absolute inset-0 flex items-center px-8"
            >
                <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16">
                    <div
                        ref={textRef}
                        className="flex-1 text-center md:text-left md:max-w-xl pt-32 md:pt-0"
                    >
                        <h2
                            className="text-2xl md:text-3xl lg:text-4xl leading-relaxed"
                            style={{
                                fontFamily: "var(--font-bebas-neue)",
                                color: "#e8e8e8",
                                letterSpacing: "0.05em",
                            }}
                        >
                            {aboutText}
                        </h2>
                    </div>

                    <div
                        ref={imageRef}
                        className="flex-shrink-0"
                    >
                        <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden">
                            <Image
                                src="/perfil.jpg"
                                alt="Lucio Schiavoni"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

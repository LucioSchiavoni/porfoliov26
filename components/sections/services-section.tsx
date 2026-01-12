"use client"

import { useEffect, useRef } from "react"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/context/language-context"

gsap.registerPlugin(ScrollTrigger)

export function ExperienceSection() {
    const { t } = useLanguage()
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const timelineRef = useRef<HTMLDivElement>(null)
    const itemsContainerRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const ctx = gsap.context(() => {
            // Título animación rápida
            if (titleRef.current) {
                gsap.fromTo(titleRef.current,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    }
                )
            }

            // Línea de timeline
            if (timelineRef.current) {
                gsap.fromTo(timelineRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        }
                    }
                )
            }

            // Items - animación rápida con stagger
            const items = itemsContainerRef.current?.querySelectorAll(".experience-item")
            if (items) {
                gsap.fromTo(items,
                    {
                        x: -30,
                        opacity: 0
                    },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: itemsContainerRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none"
                        }
                    }
                )
            }



        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative w-full min-h-screen py-20 md:py-24 overflow-hidden"
        >
            <div className="container mx-auto px-6 md:px-12 lg:px-16 relative">
                <div className="max-w-3xl mb-16">
                    <h2
                        ref={titleRef}
                        className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance text-foreground lg:text-8xl"
                    >
                        {t.experience.title}
                    </h2>
                </div>

                <div className="relative max-w-4xl">
                    <div ref={itemsContainerRef} className="space-y-6 relative">
                        {/* Timeline vertical line */}
                        <div
                            ref={timelineRef}
                            className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top opacity-30"
                        />

                        {t.experience.items.map((exp, index) => (
                            <div
                                key={exp.title}
                                className="experience-item relative pl-8 group cursor-pointer"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary transform -translate-x-[3px]">
                                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                                </div>

                                <span className="text-foreground/40 text-sm font-mono block">
                                    {exp.date}
                                </span>

                                <h3 className="text-foreground text-3xl font-semibold mt-2 group-hover:text-primary transition-colors duration-200">
                                    {exp.title}
                                </h3>

                                <p className="text-foreground/60 mt-1">
                                    {exp.description}
                                </p>

                                {/* Hover line */}
                                <div className="absolute bottom-0 left-8 right-0 h-[1px] bg-gradient-to-r from-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </section>
    )
}

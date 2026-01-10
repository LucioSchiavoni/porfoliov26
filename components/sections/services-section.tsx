"use client"

import { useEffect, useRef, useState } from "react"

const expertiseAreas = [
    {
        date: "2025 - Actualidad",
        title: "Ciberseguridad",
        description: "Ministerio de Educacion y Cultura",
    },
    {
        date: "2024 - 2025",
        title: "Desarrollo web",
        description: "Ministerio de Educacion y Cultura",
    },
    {
        date: "2022 - 2025",
        title: "Freelancer",
        description: "Desarrollo Fullstack",
    },
]

export function ExperienceSection() {
    const [visibleItems, setVisibleItems] = useState<number[]>([])
    const sectionRef = useRef<HTMLElement>(null)
    const itemRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.getAttribute("data-index"))
                    if (entry.isIntersecting) {
                        setVisibleItems((prev) => [...new Set([...prev, index])])
                    }
                })
            },
            { threshold: 0.2 },
        )

        itemRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => observer.disconnect()
    }, [])


    return (
        <section id="services" ref={sectionRef} className="relative w-full min-h-screen bg-[#0a0a0a] py-20 md:py-24">
            <div className="container mx-auto px-6 md:px-12 lg:px-16">
                <div className="max-w-3xl mb-20">
                    <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance text-white lg:text-8xl">
                        Mi experiencia
                        <br />
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {expertiseAreas.map((exp, index) => (
                            <div
                                key={exp.title}
                                ref={(el) => { itemRefs.current[index] = el }}
                                className={`border-l-2 ${visibleItems.includes(index) ? 'border-[#3b82f6]' : 'border-white/20'} pl-6 transition-all duration-300 hover:border-[#3b82f6]/70`}
                            >
                                <span className="text-white/40 text-sm font-mono">{exp.date}</span>
                                <h3 className="text-white text-xl font-semibold mt-2">{exp.title}</h3>
                                <p className="text-white/60 mt-2">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

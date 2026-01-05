"use client"

import { useEffect, useRef, useState } from "react"
import { Home, Building, Armchair, Trees } from "lucide-react"
import { HighlightedText } from "./highlighted-text"

const expertiseAreas = [
    {
        title: "Residential Design",
        description: "Creating homes that balance beauty with livability, where every space serves both form and function.",
        icon: Home,
    },
    {
        title: "Commercial Architecture",
        description:
            "Designing workspaces that inspire productivity and reflect the values of forward-thinking organizations.",
        icon: Building,
    },
    {
        title: "Interior Architecture",
        description:
            "Curating interiors that harmonize with their architectural shells, creating cohesive spatial experiences.",
        icon: Armchair,
    },
    {
        title: "Urban Planning",
        description:
            "Shaping communities through thoughtful integration of public spaces, structures, and natural elements.",
        icon: Trees,
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
        <section id="services" ref={sectionRef} className="min-h-screen w-full py-32 md:py-29">
            <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-3xl mb-20">
                    <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
                        Mi experiencia
                        <br />
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Cada proyecto deriva de una experiencia colectiva de décadas, resultando en arquitectura que es innovadora y timeles    s.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {expertiseAreas.map((exp, index) => (
                            <div
                                key={exp.title}
                                ref={(el) => { itemRefs.current[index] = el }}
                                className={`border-l-2 ${visibleItems.includes(index) ? 'border-[#3b82f6]' : 'border-white/20'} pl-6 transition-all duration-300 hover:border-[#3b82f6]/70`}
                            >
                                <span className="text-white/40 text-sm font-mono">{exp.title}</span>
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

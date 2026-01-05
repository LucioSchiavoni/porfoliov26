"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const experienceItemsRef = useRef<(HTMLDivElement | null)[]>([])
    const skillsCardRef = useRef<HTMLDivElement>(null)
    const skillBarsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main content fade in
            gsap.fromTo(
                contentRef.current,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 40%",
                        scrub: 1,
                    },
                },
            )

            // Title parallax effect
            gsap.fromTo(
                titleRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "top 30%",
                        scrub: 0.5,
                    },
                },
            )

            // Experience items stagger animation
            experienceItemsRef.current.forEach((item, index) => {
                if (item) {
                    gsap.fromTo(
                        item,
                        { x: -80, opacity: 0, scale: 0.95 },
                        {
                            x: 0,
                            opacity: 1,
                            scale: 1,
                            scrollTrigger: {
                                trigger: item,
                                start: "top 85%",
                                end: "top 60%",
                                scrub: 0.8,
                            },
                        },
                    )
                }
            })

            // Skills card slide in from right
            gsap.fromTo(
                skillsCardRef.current,
                { x: 100, opacity: 0, rotateY: 15 },
                {
                    x: 0,
                    opacity: 1,
                    rotateY: 0,
                    scrollTrigger: {
                        trigger: skillsCardRef.current,
                        start: "top 80%",
                        end: "top 40%",
                        scrub: 1,
                    },
                },
            )

            // Skill bars animation
            skillBarsRef.current.forEach((bar, index) => {
                if (bar) {
                    gsap.fromTo(
                        bar,
                        { scaleX: 0, transformOrigin: "left" },
                        {
                            scaleX: 1,
                            scrollTrigger: {
                                trigger: bar,
                                start: "top 90%",
                                end: "top 70%",
                                scrub: 0.5,
                            },
                        },
                    )
                }
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const experiences = [
        {
            period: "2022 - Presente",
            title: "Senior Full Stack Developer",
            description: "Desarrollo de aplicaciones web escalables utilizando React, Node.js y servicios cloud.",
            isActive: true,
        },
        {
            period: "2020 - 2022",
            title: "Full Stack Developer",
            description: "Creación de soluciones digitales para startups y empresas en crecimiento.",
            isActive: false,
        },
        {
            period: "2018 - 2020",
            title: "Frontend Developer",
            description: "Desarrollo de interfaces de usuario modernas y experiencias interactivas.",
            isActive: false,
        },
    ]

    const skills = [
        { name: "React", level: 95 },
        { name: "Node.js", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Next.js", level: 92 },
        { name: "PostgreSQL", level: 85 },
        { name: "AWS", level: 80 },
    ]

    return (
        <section ref={sectionRef} id="about" className="min-h-screen bg-[#0a0a0a] py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
            <div ref={contentRef} className="max-w-6xl mx-auto">
                <motion.span className="text-[#3b82f6] text-sm font-mono mb-4 block">{"<Experience />"}</motion.span>

                <h2 ref={titleRef} className="text-white font-bold text-[clamp(2rem,5vw,3.5rem)] leading-tight mb-12">
                    experiencia
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp.period}
                                ref={(el) => { experienceItemsRef.current[index] = el }}
                                className={`border-l-2 ${exp.isActive ? 'border-[#3b82f6]' : 'border-white/20'} pl-6 transition-all duration-300 hover:border-[#3b82f6]/70`}
                            >
                                <span className="text-white/40 text-sm font-mono">{exp.period}</span>
                                <h3 className="text-white text-xl font-semibold mt-2">{exp.title}</h3>
                                <p className="text-white/60 mt-2">{exp.description}</p>
                            </div>
                        ))}
                    </div>

                    <div
                        ref={skillsCardRef}
                        className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm"
                        style={{ perspective: '1000px' }}
                    >
                        <h3 className="text-white text-lg font-semibold mb-6">Tecnologías</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {skills.map((skill, index) => (
                                <div key={skill.name} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/70">{skill.name}</span>
                                        <span className="text-white/40">{skill.level}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            ref={(el) => { skillBarsRef.current[index] = el }}
                                            className="h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full"
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

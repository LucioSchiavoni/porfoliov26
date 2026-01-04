"use client"

import { MagneticButton } from "@/components/magnetic-button"

interface AboutSectionProps {
    scrollToSection: (index: number) => void
}

export function AboutSection({ scrollToSection }: AboutSectionProps) {
    const skills = [
        "React & Next.js",
        "TypeScript",
        "WebGL & Three.js",
        "GSAP",
        "Tailwind CSS",
        "Node.js",
        "UI/UX Design",
        "Creative Coding"
    ]

    return (
        <section id="about" className="flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12">
            <div className="max-w-6xl">
                <div className="mb-12">
                    <p className="mb-4 font-mono text-sm text-foreground/70">About Me</p>
                    <h2 className="font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl">
                        Creating Digital Experiences
                    </h2>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                    <div>
                        <p className="mb-6 text-lg leading-relaxed text-foreground/90">
                            I'm a creative developer specializing in building beautiful, interactive web experiences.
                            With a focus on modern technologies and design principles, I bring ideas to life through
                            code.
                        </p>
                        <p className="mb-6 text-lg leading-relaxed text-foreground/90">
                            My work combines technical expertise with creative thinking to deliver solutions that are
                            not only functional but also engaging and memorable.
                        </p>
                        <MagneticButton variant="primary" onClick={() => scrollToSection(4)}>
                            Get in Touch
                        </MagneticButton>
                    </div>

                    <div>
                        <h3 className="mb-6 font-sans text-2xl font-medium text-foreground">
                            Skills & Technologies
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/10"
                                >
                                    <span className="font-mono text-sm text-foreground/80">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

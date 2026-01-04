"use client"

import { MagneticButton } from "@/components/magnetic-button"

export function WorkSection() {
    const projects = [
        {
            title: "E-Commerce Platform",
            category: "Web Development",
            year: "2024",
            description: "A modern e-commerce solution with real-time inventory management"
        },
        {
            title: "Mobile Banking App",
            category: "Mobile Design",
            year: "2024",
            description: "Intuitive banking experience with advanced security features"
        },
        {
            title: "Analytics Dashboard",
            category: "Data Visualization",
            year: "2023",
            description: "Real-time analytics platform with interactive data visualizations"
        }
    ]

    return (
        <section id="work" className="flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12">
            <div className="max-w-6xl">
                <div className="mb-12">
                    <p className="mb-4 font-mono text-sm text-foreground/70">Selected Work</p>
                    <h2 className="font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl">
                        Recent Projects
                    </h2>
                </div>

                <div className="space-y-6">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer rounded-2xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/10"
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                <div className="flex-1">
                                    <div className="mb-2 flex items-center gap-4">
                                        <h3 className="font-sans text-2xl font-medium text-foreground md:text-3xl">
                                            {project.title}
                                        </h3>
                                        <span className="font-mono text-sm text-foreground/60">{project.year}</span>
                                    </div>
                                    <p className="mb-2 font-mono text-sm text-foreground/70">{project.category}</p>
                                    <p className="max-w-2xl text-foreground/80">{project.description}</p>
                                </div>
                                <div className="shrink-0">
                                    <MagneticButton variant="secondary">View Project</MagneticButton>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

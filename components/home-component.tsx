"use client"

import { ExperienceSection } from "@/components/sections/services-section"
import { Projects } from "./proyects"
import { ContactSection } from "@/components/sections/contact-section"
import { HeroSection } from "./sections/hero-section"
import { AboutSection } from "./sections/about-section"

export default function HomePage() {
    return (
        <main className="bg-background min-h-screen">
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <Projects />
            <ContactSection />
        </main>
    )
}

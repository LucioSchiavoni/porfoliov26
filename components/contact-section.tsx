"use client"

import { HeroSection } from "./sections/hero-section"
import { AboutSection } from "./sections/about-section"
import { ExperienceSection } from "@/components/sections/services-section"
import { Projects } from "./proyects"
import { ContactSection } from "@/components/sections/contact-section"

export default function HomePage() {
    return (
        <main className="bg-[#0a0a0a] min-h-screen">
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <Projects />
            <ContactSection />
        </main>
    )
}

"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

import es from "@/locales/es.json"
import en from "@/locales/en.json"
import de from "@/locales/de.json"

export type Language = "es" | "en" | "de"

type Translations = typeof es

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: Translations
}

const translations: Record<Language, Translations> = { es, en, de }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("es")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("language") as Language | null
        if (saved && translations[saved]) {
            setLanguageState(saved)
        }
        setMounted(true)
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem("language", lang)
    }

    const t = translations[language]

    if (!mounted) {
        return <>{children}</>
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        // Fallback for SSR/build time
        return {
            language: "es" as Language,
            setLanguage: () => {},
            t: translations.es
        }
    }
    return context
}

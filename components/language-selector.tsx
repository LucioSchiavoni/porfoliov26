"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage, Language } from "@/context/language-context"

function SpainFlag({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <rect width="512" height="512" fill="#c60b1e" />
            <rect width="512" height="256" y="128" fill="#ffc400" />
        </svg>
    )
}

function USFlag({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <rect width="512" height="512" fill="#bf0a30" />
            <rect y="39.4" width="512" height="39.4" fill="#fff" />
            <rect y="118.2" width="512" height="39.4" fill="#fff" />
            <rect y="197" width="512" height="39.4" fill="#fff" />
            <rect y="275.8" width="512" height="39.4" fill="#fff" />
            <rect y="354.6" width="512" height="39.4" fill="#fff" />
            <rect y="433.4" width="512" height="39.4" fill="#fff" />
            <rect width="256" height="275.8" fill="#002868" />
        </svg>
    )
}

function GermanyFlag({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <rect width="512" height="512" fill="#ffce00" />
            <rect width="512" height="341.3" fill="#dd0000" />
            <rect width="512" height="170.7" fill="#000" />
        </svg>
    )
}

const languages: { code: Language; label: string; Flag: React.FC<{ className?: string }> }[] = [
    { code: "es", label: "ES", Flag: SpainFlag },
    { code: "en", label: "US", Flag: USFlag },
    { code: "de", label: "DE", Flag: GermanyFlag },
]

export function LanguageSelector() {
    const { language, setLanguage } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)

    const currentLang = languages.find((l) => l.code === language) || languages[0]

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/10 backdrop-blur-md transition-all hover:bg-foreground/20 hover:scale-105 active:scale-95"
                aria-label="Select language"
            >
                <currentLang.Flag className="w-5 h-5 rounded-sm" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute -left-16 top-12 z-50 min-w-[140px] overflow-hidden rounded-lg border border-foreground/10 bg-card/95 backdrop-blur-xl shadow-xl"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code)
                                        setIsOpen(false)
                                    }}
                                    className={`flex w-full items-center gap-3 px-4 py-3 transition-all hover:bg-foreground/10 ${
                                        language === lang.code
                                            ? "bg-foreground/5"
                                            : ""
                                    }`}
                                >
                                    <lang.Flag className="w-6 h-4 rounded-sm" />
                                    <span className="text-sm font-medium text-foreground/80">{lang.label}</span>
                                    {language === lang.code && (
                                        <motion.div
                                            layoutId="activeLang"
                                            className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                                        />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

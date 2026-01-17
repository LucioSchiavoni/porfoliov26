"use client"

import { Mail, MapPin } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { useLanguage } from "@/context/language-context"


export function ContactSection() {
  const { t } = useLanguage()
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Error al enviar')
      }

      setSubmitSuccess(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch {
      setSubmitError(true)
      setTimeout(() => setSubmitError(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="flex min-h-screen w-full items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                }`}
            >
              <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
                {t.contact.title}
                <br />

              </h2>
              <p className="font-mono text-xs text-foreground">{t.contact.subtitle}</p>
            </div>

            <div className="space-y-4 md:space-y-8">
              <a
                href="mailto:hello@studio.com"
                className={`group block transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                  }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-foreground" />
                  <span className="font-mono text-xs text-foreground">{t.contact.email}</span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">
                  luciosc1798@gmail.com
                </p>
              </a>

              <div
                className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-foreground" />
                  <span className="font-mono text-xs text-foreground">{t.contact.location}</span>
                </div>
                <p className="text-base text-foreground md:text-2xl">Montevideo, Uruguay</p>
              </div>

              <div
                className={`flex gap-2 pt-2 transition-all duration-700 md:pt-4 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                  }`}
                style={{ transitionDelay: "500ms" }}
              >
                {["Instagram", "LinkedIn", "Github"].map((social, i) => (
                  <a
                    key={social}
                    href="#"
                    className="border-b border-transparent font-mono text-xs text-foreground transition-all hover:border-foreground/60 hover:text-foreground/90"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Minimal form */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div
                className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                style={{ transitionDelay: "200ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground md:mb-2">{t.contact.form.name}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>

              <div
                className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                style={{ transitionDelay: "350ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground md:mb-2">{t.contact.form.email}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder={t.contact.form.emailPlaceholder}
                />
              </div>

              <div
                className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                style={{ transitionDelay: "500ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground md:mb-2">{t.contact.form.message}</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </div>

              <div
                className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                style={{ transitionDelay: "650ms" }}
              >
                <button
                  className="w-full rounded-md bg-foreground p-1 font-semibold text-background hover:scale-105 hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                  onClick={isSubmitting ? undefined : undefined}
                >
                  {isSubmitting ? t.contact.form.sending : t.contact.form.send}
                </button>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-sm text-foreground/80">{t.contact.form.success}</p>
                )}
                {submitError && (
                  <p className="mt-3 text-center font-mono text-sm text-red-500">Error al enviar el mensaje. Intenta de nuevo.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

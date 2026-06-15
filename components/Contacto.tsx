'use client'

import { useState, useTransition } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { translations } from '@/lib/translations'
import { sendContact } from '@/app/actions/contact'

type Status = 'idle' | 'success' | 'error'

export default function Contacto() {
  const { lang } = useLanguage()
  const t = translations[lang].contact

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const result = await sendContact(name, email, message)
      if (result.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
        setErrorMsg(result.error)
      }
    })
  }

  return (
    <section id="contacto" className="relative overflow-hidden py-28 md:py-36 px-6">
      {/* Soft brand aura */}
      <div
        className="pointer-events-none absolute top-0 -right-24 h-[440px] w-[440px] rounded-full blur-3xl opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, #6D28D9 0%, transparent 70%)' }}
      />
      <div className="relative max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#BF2638]" />
          <div className="w-3 h-px bg-[#D4AC0D]" />
          <span className="text-xs uppercase tracking-[0.35em] text-[#78716C] font-medium">
            {t.eyebrow}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-[#1C1917] mb-5">{t.title}</h2>
        <p className="text-[#78716C] max-w-md mb-12 leading-relaxed text-base md:text-lg">
          {t.subtitle}
        </p>

        {status === 'success' ? (
          <div className="max-w-lg bg-white border border-[#E7E5E4] rounded-2xl p-10 text-center">
            <div className="w-12 h-12 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-[#1C1917] mb-2">{t.successTitle}</h3>
            <p className="text-[#78716C]">{t.successText}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#1C1917] mb-1.5">
                {t.name}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-white text-[#1C1917] placeholder-[#78716C]/50 text-sm focus:outline-none focus:border-[#BF2638] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#1C1917] mb-1.5">
                {t.email}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-white text-[#1C1917] placeholder-[#78716C]/50 text-sm focus:outline-none focus:border-[#BF2638] transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#1C1917] mb-1.5">
                {t.message}
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-[#E7E5E4] bg-white text-[#1C1917] placeholder-[#78716C]/50 text-sm focus:outline-none focus:border-[#BF2638] transition-colors resize-none"
              />
            </div>

            {/* Error */}
            {status === 'error' && (
              <p className="text-sm text-[#BF2638]">{errorMsg || t.errorText}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 bg-[#BF2638] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#A01E30] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isPending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  {t.sending}
                </>
              ) : (
                <>
                  {t.send}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

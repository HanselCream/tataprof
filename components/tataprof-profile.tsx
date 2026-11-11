'use client'

import { useMemo } from 'react'
import {
  ArrowUpRight,
  Download,
  Globe2,
  Mail,
  MessageCircle,
  Phone,
  QrCode,
  Sparkles,
} from 'lucide-react'

export type PublicProfileData = {
  slug: string
  displayName: string
  title: string
  bio: string
  email: string
  phone: string
  whatsapp: string
  website: string
  instagram: string
  facebook: string
  tiktok: string
}

function escapeVCard(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

function saveContact(profile: PublicProfileData) {
  const contact = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${escapeVCard(profile.displayName)}`,
    ...(profile.title ? [`TITLE:${escapeVCard(profile.title)}`] : []),
    ...(profile.email ? [`EMAIL;TYPE=INTERNET:${escapeVCard(profile.email)}`] : []),
    ...(profile.phone ? [`TEL;TYPE=CELL:${escapeVCard(profile.phone)}`] : []),
    ...(profile.website ? [`URL:${escapeVCard(profile.website)}`] : []),
    'END:VCARD',
  ].join('\r\n')
  const file = new Blob([contact], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = `${profile.slug}.vcf`
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function TataprofProfile({ profile }: { profile: PublicProfileData }) {
  const contactLinks = useMemo(() => {
    const items = []
    if (profile.whatsapp) {
      const message = encodeURIComponent(`Hi ${profile.displayName}, I would like to connect.`)
      items.push({ label: 'WhatsApp', detail: 'Start a conversation', href: `https://wa.me/${profile.whatsapp}?text=${message}`, icon: MessageCircle })
    }
    if (profile.phone) items.push({ label: 'Call', detail: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, '')}`, icon: Phone })
    if (profile.email) items.push({ label: 'Email', detail: profile.email, href: `mailto:${profile.email}`, icon: Mail })
    if (profile.website) {
      const detail = new URL(profile.website).hostname.replace(/^www\./, '')
      items.push({ label: 'Website', detail, href: profile.website, icon: Globe2 })
    }
    return items
  }, [profile])

  const socialLinks = [
    { label: 'Instagram', href: profile.instagram },
    { label: 'Facebook', href: profile.facebook },
    { label: 'TikTok', href: profile.tiktok },
  ].filter((item) => item.href)

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#090909] px-4 py-4 text-white sm:px-6 sm:py-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-52 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(185,168,135,0.13),transparent_68%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.025),transparent_35%,rgba(255,255,255,0.015))]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      <section className="relative w-full max-w-[420px] overflow-hidden rounded-[30px] border border-white/[0.11] bg-[#111110]/90 shadow-[0_32px_100px_rgba(0,0,0,0.72)] backdrop-blur-xl">
        <div aria-hidden="true" className="h-px w-full bg-gradient-to-r from-transparent via-[#b9a887]/70 to-transparent" />
        <div className="px-7 pb-5 pt-6 sm:px-9 sm:pb-8 sm:pt-9">
          <div className="mb-5 flex items-center justify-between">
            <a href="#profile" aria-label="TataProf profile" className="font-serif text-[17px] tracking-[0.18em] text-white">TATAPROF</a>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.17em] text-white/50">
              <span className="size-1.5 rounded-full bg-[#b9a887] shadow-[0_0_8px_rgba(185,168,135,.8)]" />
              Digital profile
            </span>
          </div>

          <div id="profile" className="flex flex-col items-center text-center">
            <div className="relative mb-4 flex size-[92px] items-center justify-center rounded-full border border-[#b9a887]/60 bg-[radial-gradient(circle_at_30%_20%,#38352e,#191817_48%,#0c0c0b)] p-1 shadow-[0_0_0_5px_rgba(185,168,135,0.06),0_12px_40px_rgba(0,0,0,.5)]">
              <div className="flex size-full items-center justify-center rounded-full border border-white/[0.12] bg-black/20">
                <span aria-hidden="true" className="font-serif text-[35px] tracking-[-0.08em] text-[#e5ded1]">{initials(profile.displayName)}</span>
              </div>
              <span className="absolute bottom-0.5 right-0.5 flex size-7 items-center justify-center rounded-full border-[3px] border-[#111110] bg-[#b9a887] text-[#12110f]">
                <Sparkles aria-hidden="true" size={12} strokeWidth={1.8} />
              </span>
            </div>

            <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.32em] text-[#b9a887]">Tap. Connect. Experience.</p>
            <h1 className="font-serif text-[38px] leading-tight tracking-[-0.035em] text-[#f5f2ec]">{profile.displayName}</h1>
            {profile.title && <p className="mt-2.5 text-[12px] tracking-[0.04em] text-white/50">{profile.title}</p>}
            {profile.bio && <p className="mt-3 max-w-[280px] whitespace-pre-line text-[13px] leading-5 text-white/65">{profile.bio}</p>}
          </div>

          <div className="mt-5 flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-white/[0.09]" />
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/35">Connect</span>
            <span className="h-px flex-1 bg-white/[0.09]" />
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => saveContact(profile)}
              className="group flex min-h-[50px] w-full items-center justify-between rounded-[15px] border border-[#ded8cb] bg-[#ded8cb] px-4 text-left text-[#141311] transition duration-200 hover:border-white hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9a887] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111110] active:scale-[0.99]"
            >
              <span className="flex items-center gap-3">
                <Download aria-hidden="true" size={17} strokeWidth={1.7} />
                <span className="text-[13px] font-semibold tracking-[0.01em]">Save contact</span>
              </span>
              <ArrowUpRight aria-hidden="true" size={16} className="text-black/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

            {contactLinks.map(({ label, detail, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="group flex min-h-[50px] items-center justify-between rounded-[15px] border border-white/[0.12] bg-white/[0.025] px-4 text-left transition duration-200 hover:border-white/50 hover:bg-white hover:text-[#111110] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9a887] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111110] active:scale-[0.99]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <Icon aria-hidden="true" size={17} strokeWidth={1.6} className="shrink-0 text-[#c9c2b5]/80 transition-colors group-hover:text-[#111110]" />
                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium">{label}</span>
                    <span className="block truncate text-[10px] text-white/40 transition-colors group-hover:text-black/55">{detail}</span>
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" size={15} className="ml-3 shrink-0 text-white/35 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black/60" />
              </a>
            ))}
            {contactLinks.length === 0 && <p className="rounded-[15px] border border-white/[0.08] px-4 py-4 text-center text-xs text-white/40">Contact details coming soon.</p>}
          </div>

          {socialLinks.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2" aria-label="Social media">
              {socialLinks.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/10 px-3 text-[11px] text-white/55 transition hover:border-[#b9a887]/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9a887]">
                  {label}<ArrowUpRight aria-hidden="true" size={12} />
                </a>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.17em] text-white/30">
            <QrCode aria-hidden="true" size={12} strokeWidth={1.5} />
            <span>Tap or scan to connect</span>
          </div>
        </div>
        <footer className="border-t border-white/[0.07] px-6 py-3.5 text-center text-[10px] tracking-[0.08em] text-white/30">
          Powered by <span className="font-medium text-white/55">TataProf</span>
        </footer>
      </section>
    </main>
  )
}

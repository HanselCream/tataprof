'use client'

import {
  ArrowUpRight,
  Download,
  Globe2,
  Mail,
  MessageCircle,
  Music2,
  QrCode,
  Sparkles,
} from 'lucide-react'

const profile = {
  name: 'TataProf',
  title: 'Smart NFC Solutions',
  email: 'hello@tataprof.com',
  website: 'https://tataprof.com',
}

function saveContact() {
  const contact = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.name}`,
    `ORG:${profile.title}`,
    `EMAIL;TYPE=INTERNET:${profile.email}`,
    `URL:${profile.website}`,
    'NOTE:Tap. Connect. Experience.',
    'END:VCARD',
  ].join('\r\n')
  const file = new Blob([contact], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = url
  link.download = 'tataprof.vcf'
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

const links = [
  {
    label: 'WhatsApp',
    detail: 'Let’s talk',
    href: 'https://wa.me/?text=Hi%20TataProf%2C%20I%27d%20like%20to%20learn%20more.',
    icon: MessageCircle,
  },
  {
    label: 'Email us',
    detail: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: 'Visit our website',
    detail: 'tataprof.com',
    href: profile.website,
    icon: Globe2,
  },
]

export function TataprofProfile() {
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
            <a href="#profile" aria-label="TataProf home" className="font-serif text-[17px] tracking-[0.18em] text-white">TATAPROF</a>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.17em] text-white/50">
              <span className="size-1.5 rounded-full bg-[#b9a887] shadow-[0_0_8px_rgba(185,168,135,.8)]" />
              Digital profile
            </span>
          </div>

          <div id="profile" className="flex flex-col items-center text-center">
            <div className="relative mb-4 flex size-[92px] items-center justify-center rounded-full border border-[#b9a887]/60 bg-[radial-gradient(circle_at_30%_20%,#38352e,#191817_48%,#0c0c0b)] p-1 shadow-[0_0_0_5px_rgba(185,168,135,0.06),0_12px_40px_rgba(0,0,0,.5)]">
              <div className="flex size-full items-center justify-center rounded-full border border-white/[0.12] bg-black/20">
                <span className="font-serif text-[35px] tracking-[-0.08em] text-[#e5ded1]">TP</span>
              </div>
              <span className="absolute bottom-0.5 right-0.5 flex size-7 items-center justify-center rounded-full border-[3px] border-[#111110] bg-[#b9a887] text-[#12110f]">
                <Sparkles aria-hidden="true" size={12} strokeWidth={1.8} />
              </span>
            </div>

            <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.32em] text-[#b9a887]">Tap. Connect. Experience.</p>
            <h1 className="font-serif text-[38px] leading-none tracking-[-0.035em] text-[#f5f2ec]">TataProf</h1>
            <p className="mt-2.5 text-[12px] tracking-[0.04em] text-white/50">Smart NFC Solutions</p>
            <p className="mt-3 max-w-[260px] text-[13px] leading-5 text-white/65">
              Thoughtful connections, made with a single tap.
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-white/[0.09]" />
            <span className="text-[9px] uppercase tracking-[0.22em] text-white/35">Connect with us</span>
            <span className="h-px flex-1 bg-white/[0.09]" />
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={saveContact}
              className="group flex min-h-[50px] w-full items-center justify-between rounded-[15px] border border-[#ded8cb] bg-[#ded8cb] px-4 text-left text-[#141311] transition duration-200 hover:border-white hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9a887] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111110] active:scale-[0.99]"
            >
              <span className="flex items-center gap-3">
                <Download aria-hidden="true" size={17} strokeWidth={1.7} />
                <span className="text-[13px] font-semibold tracking-[0.01em]">Save contact</span>
              </span>
              <ArrowUpRight aria-hidden="true" size={16} className="text-black/45 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

            {links.map(({ label, detail, href, icon: Icon }) => (
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
          </div>

          <div className="mt-4 flex items-center justify-center gap-3" aria-label="Social media">
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition hover:border-[#b9a887]/60 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9a887]">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-[17px]" stroke="currentColor" strokeWidth="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.8" r=".8" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition hover:border-[#b9a887]/60 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9a887]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current"><path d="M13.4 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5V13h2.7v8h3.2Z" /></svg>
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok" className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition hover:border-[#b9a887]/60 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9a887]">
              <Music2 aria-hidden="true" size={17} strokeWidth={1.6} />
            </a>
          </div>

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

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Link2, MousePointer2, UsersRound } from 'lucide-react'

const features = [
  {
    number: '01',
    icon: UsersRound,
    title: 'One account, many profiles',
    description: 'Create a separate introduction for each teammate, business, or way you work.',
  },
  {
    number: '02',
    icon: Link2,
    title: 'A link that belongs to them',
    description: 'Every profile gets a distinct address that stays easy to share and remember.',
  },
  {
    number: '03',
    icon: MousePointer2,
    title: 'Ready for the next tap',
    description: 'Add the link to an NFC card, QR code, email signature, or social bio.',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-svh overflow-hidden bg-[#090909] text-white">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link aria-label="TataProf home" className="font-serif text-[17px] tracking-[0.18em] text-white" href="/">TATAPROF</Link>
        <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-7">
          <Link className="text-sm text-white/55 transition hover:text-white" href="/sign-in">Sign in</Link>
          <Link className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#ded8cb] px-4 text-xs font-semibold text-[#171512] transition hover:bg-white sm:px-5 sm:text-sm" href="/sign-up">
            Create profile <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </nav>
      </header>

      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:px-12 lg:pt-20">
        <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-0 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(185,168,135,0.1),transparent_68%)] blur-2xl" />
        <div className="relative z-10 max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.025] px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-[#c7b692] shadow-[0_0_8px_rgba(199,182,146,.7)]" />
            One account. Every introduction.
          </p>
          <h1 className="mt-7 max-w-[720px] font-serif text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.98] tracking-[-0.055em] text-[#f4f0e8]">
            Make every <span className="text-[#c7b692]">connection</span> count.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
            Create a polished digital profile for every person or business you represent. Each gets its own shareable link—ready for an NFC card, a QR code, or a simple introduction.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ded8cb] px-6 text-sm font-semibold text-[#171512] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7b692] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]" href="/sign-up">
              Create your first profile <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/[0.13] px-6 text-sm font-medium text-white/65 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7b692]" href="/sign-in">
              Sign in to your workspace
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/35">Simple to create. Easy to share. Made for real-world introductions.</p>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] lg:ml-auto">
          <div aria-hidden="true" className="absolute -inset-5 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(185,168,135,0.12),transparent_68%)] blur-2xl" />
          <div className="relative rounded-[28px] border border-white/[0.1] bg-[#111110]/90 p-5 shadow-[0_28px_90px_rgba(0,0,0,.5)] sm:p-7">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
              <div>
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/35">A little preview</p>
                <p className="mt-1 text-xs text-white/70">Your story, in one place</p>
              </div>
              <span className="rounded-full border border-[#c7b692]/20 bg-[#c7b692]/[0.06] px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[#d8c9a8]">Digital profile</span>
            </div>
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex size-[86px] items-center justify-center rounded-full border border-[#b9a887]/55 bg-[radial-gradient(circle_at_30%_20%,#38352e,#191817_48%,#0c0c0b)] shadow-[0_0_0_5px_rgba(185,168,135,0.06)]">
                <span aria-hidden="true" className="font-serif text-3xl tracking-[-0.08em] text-[#e5ded1]">JM</span>
              </div>
              <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.28em] text-[#b9a887]">Tap. Connect. Experience.</p>
              <h2 className="mt-2 font-serif text-3xl tracking-tight text-[#f5f2ec]">Jordan Morgan</h2>
              <p className="mt-2 text-xs text-white/45">Creative Director · Studio North</p>
            </div>
            <div className="grid gap-2">
              <div className="flex min-h-12 items-center justify-between rounded-xl border border-[#ded8cb] bg-[#ded8cb] px-4 text-sm font-semibold text-[#171512]">
                <span>Save contact</span><ArrowUpRight aria-hidden="true" size={15} />
              </div>
              <div className="flex min-h-12 items-center justify-between rounded-xl border border-white/[0.1] px-4 text-sm text-white/65">
                <span>Connect on WhatsApp</span><ArrowUpRight aria-hidden="true" size={15} />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">Unique profile link</span>
              <span className="text-xs text-[#c7b692]">/p/jordan-morgan</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/[0.07] px-5 sm:px-8 md:grid-cols-3 lg:px-12">
          {features.map(({ number, icon: Icon, title, description }) => (
            <article key={number} className="bg-[#0a0a0a] px-5 py-7 sm:px-7 sm:py-9">
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.2em] text-[#c7b692]">{number}</span>
                <Icon aria-hidden="true" size={17} strokeWidth={1.5} className="text-white/45" />
              </div>
              <h2 className="mt-5 font-serif text-xl text-[#f4f0e8]">{title}</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/45">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <span className="font-medium tracking-[0.12em] text-white/50">TATAPROF</span>
        <span>Tap. Connect. Experience.</span>
      </footer>
    </main>
  )
}


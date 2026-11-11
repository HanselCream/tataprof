import Link from 'next/link'
import { ArrowLeft, Fingerprint } from 'lucide-react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { AuthForm } from '@/components/auth-form'

export async function AuthPage({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect('/dashboard')

  const isSignUp = mode === 'sign-up'

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#090909] px-4 py-12 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(185,168,135,0.13),transparent_68%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.025),transparent_35%,rgba(255,255,255,0.015))]" />
      </div>
      <section className="relative w-full max-w-[440px] rounded-[28px] border border-white/[0.11] bg-[#111110]/95 p-6 shadow-[0_32px_100px_rgba(0,0,0,0.62)] sm:p-9">
        <div className="mb-8 flex items-center justify-between">
          <Link aria-label="TataProf home" className="font-serif text-[17px] tracking-[0.18em] text-white" href="/">TATAPROF</Link>
          <span className="flex size-9 items-center justify-center rounded-full border border-[#c7b692]/25 bg-[#c7b692]/[0.06] text-[#c7b692]"><Fingerprint aria-hidden="true" size={17} /></span>
        </div>
        <Link className="inline-flex items-center gap-2 text-xs text-white/45 transition hover:text-white" href="/">
          <ArrowLeft aria-hidden="true" size={14} /> Back to home
        </Link>
        <h1 className="mt-7 font-serif text-3xl tracking-tight text-[#f4f0e8]">{isSignUp ? 'Make your introduction.' : 'Welcome back.'}</h1>
        <p className="mt-2 text-sm leading-6 text-white/45">
          {isSignUp ? 'Create an account to build and manage your shareable profiles.' : 'Sign in to manage your TataProf profiles.'}
        </p>
        <AuthForm mode={mode} />
        <p className="mt-7 border-t border-white/[0.08] pt-5 text-center text-[10px] uppercase tracking-[0.18em] text-white/30">Tap. Connect. Experience.</p>
      </section>
    </main>
  )
}

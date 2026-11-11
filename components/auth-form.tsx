'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

type AuthMode = 'sign-in' | 'sign-up'

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const isSignUp = mode === 'sign-up'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)

    try {
      const result = isSignUp
        ? await authClient.signUp.email({ email, password, name: name.trim() })
        : await authClient.signIn.email({ email, password })

      if (result.error) {
        setError(isSignUp ? 'We could not create your account. Check your details or sign in.' : 'Email or password is incorrect.')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('We could not complete that request. Please try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
      {isSignUp && (
        <label className="flex flex-col gap-2 text-sm text-white/70">
          Your name
          <input
            autoComplete="name"
            className="h-12 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#c7b692] focus:ring-2 focus:ring-[#c7b692]/20"
            maxLength={80}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jordan Lee"
            required
            value={name}
          />
        </label>
      )}
      <label className="flex flex-col gap-2 text-sm text-white/70">
        Email address
        <input
          autoComplete="email"
          className="h-12 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#c7b692] focus:ring-2 focus:ring-[#c7b692]/20"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-white/70">
        Password
        <input
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
          className="h-12 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#c7b692] focus:ring-2 focus:ring-[#c7b692]/20"
          minLength={8}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="At least 8 characters"
          required
          type="password"
          value={password}
        />
      </label>

      {error && <p role="alert" className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-200">{error}</p>}

      <button
        className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#ded8cb] px-5 text-sm font-semibold text-[#171512] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7b692] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111110] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <>{isSignUp ? 'Create account' : 'Sign in'} <ArrowRight aria-hidden="true" size={16} /></>}
      </button>

      <p className="text-center text-sm text-white/45">
        {isSignUp ? 'Already have an account?' : 'New to TataProf?'}{' '}
        <Link className="font-medium text-[#ded8cb] underline-offset-4 hover:underline" href={isSignUp ? '/sign-in' : '/sign-up'}>
          {isSignUp ? 'Sign in' : 'Create an account'}
        </Link>
      </p>
    </form>
  )
}

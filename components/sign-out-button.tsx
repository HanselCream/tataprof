'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, LoaderCircle } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

export function SignOutButton() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)

  async function handleSignOut() {
    setPending(true)
    setError(false)
    try {
      const result = await authClient.signOut()
      if (result.error) {
        setError(true)
        setPending(false)
        return
      }
      router.replace('/')
      router.refresh()
    } catch {
      setError(true)
      setPending(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      {error && <span className="text-xs text-rose-200" role="alert">Could not sign out. Try again.</span>}
      <button
        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-medium text-white/65 transition hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7b692] disabled:opacity-50"
        disabled={pending}
        onClick={handleSignOut}
        type="button"
      >
        {pending ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <LogOut aria-hidden="true" size={14} />}
        {pending ? 'Signing out' : 'Sign out'}
      </button>
    </div>
  )
}

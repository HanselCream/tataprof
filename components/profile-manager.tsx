'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Copy, ExternalLink, Plus, Trash2 } from 'lucide-react'
import { createProfile, deleteProfile } from '@/app/actions/profiles'
import { ProfileForm } from '@/components/profile-form'
import type { ProfileActionState } from '@/lib/profiles/types'

type ProfileEntry = {
  id: string
  slug: string
  displayName: string
  title: string
  createdAt: Date
}

const createAction = async (_previousState: ProfileActionState, formData: FormData) => createProfile(_previousState, formData)

function ShareLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/p/${slug}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-medium text-white/70 transition hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7b692]"
      onClick={copyLink}
      type="button"
    >
      <Copy aria-hidden="true" size={14} />
      {copied ? 'Copied' : 'Copy link'}
    </button>
  )
}

function DeleteProfileButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition()

  function removeProfile() {
    if (!window.confirm(`Delete the profile for ${name}? This cannot be undone.`)) return
    startTransition(() => {
      void deleteProfile(id)
    })
  }

  return (
    <button
      aria-label={`Delete ${name} profile`}
      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-medium text-white/45 transition hover:border-rose-300/30 hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7b692] disabled:opacity-50"
      disabled={pending}
      onClick={removeProfile}
      type="button"
    >
      <Trash2 aria-hidden="true" size={14} />
      {pending ? 'Deleting' : 'Delete'}
    </button>
  )
}

export function ProfileManager({ profiles }: { profiles: ProfileEntry[] }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:items-start">
      <section aria-labelledby="profiles-heading" className="order-2 lg:order-1">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#c7b692]">Your directory</p>
            <h2 id="profiles-heading" className="mt-2 font-serif text-2xl text-[#f4f0e8]">Published profiles</h2>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50">{profiles.length} {profiles.length === 1 ? 'profile' : 'profiles'}</span>
        </div>

        {profiles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-10 text-center">
            <div className="mx-auto flex size-11 items-center justify-center rounded-full border border-[#c7b692]/25 bg-[#c7b692]/[0.07] text-[#c7b692]"><Plus aria-hidden="true" size={19} /></div>
            <h3 className="mt-4 text-sm font-medium text-white">Your first profile starts here</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-white/45">Fill in the form to publish a personal or business card with its own shareable link.</p>
          </div>
        ) : (
          <ul className="grid gap-3">
            {profiles.map((profile) => (
              <li key={profile.id} className="rounded-2xl border border-white/[0.09] bg-[#111110]/80 p-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-medium text-[#f4f0e8]">{profile.displayName}</h3>
                    <p className="mt-1 truncate text-sm text-white/45">{profile.title || 'Personal profile'}</p>
                    <p className="mt-3 flex items-center gap-2 text-xs text-[#c7b692]">
                      <span className="size-1.5 rounded-full bg-[#c7b692]" aria-hidden="true" />
                      /p/{profile.slug}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <ShareLinkButton slug={profile.slug} />
                    <Link
                      aria-label={`Open ${profile.displayName} public profile`}
                      className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7b692]"
                      href={`/p/${profile.slug}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <ExternalLink aria-hidden="true" size={15} />
                    </Link>
                    <Link
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-medium text-white/70 transition hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7b692]"
                      href={`/dashboard/${profile.id}/edit`}
                    >
                      Edit <ArrowUpRight aria-hidden="true" size={14} />
                    </Link>
                    <DeleteProfileButton id={profile.id} name={profile.displayName} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="create-profile-heading" className="order-1 rounded-2xl border border-white/[0.1] bg-[#111110]/90 p-5 sm:p-7 lg:order-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#c7b692]">Create a card</p>
        <h2 id="create-profile-heading" className="mt-2 font-serif text-2xl text-[#f4f0e8]">A profile of your own</h2>
        <p className="mb-6 mt-2 text-sm leading-6 text-white/45">Each profile gets a unique URL you can put on an NFC card, QR code, email signature, or social bio.</p>
        <ProfileForm action={createAction} submitLabel="Publish profile" />
      </section>
    </div>
  )
}

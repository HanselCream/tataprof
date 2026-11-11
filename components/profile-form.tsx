'use client'

import { useActionState } from 'react'
import { ArrowRight, Check, LoaderCircle } from 'lucide-react'
import type { ProfileAction, ProfileFormValues } from '@/lib/profiles/types'

const emptyProfile: ProfileFormValues = {
  displayName: '',
  title: '',
  bio: '',
  email: '',
  phone: '',
  whatsapp: '',
  website: '',
  instagram: '',
  facebook: '',
  tiktok: '',
}

const fields: { name: keyof ProfileFormValues; label: string; placeholder: string; type?: string; multiline?: boolean }[] = [
  { name: 'displayName', label: 'Business or person name', placeholder: 'Jordan Lee or Studio North' },
  { name: 'title', label: 'Role or specialty', placeholder: 'Founder · Interior designer' },
  { name: 'email', label: 'Email', placeholder: 'hello@example.com', type: 'email' },
  { name: 'phone', label: 'Phone', placeholder: '+1 (555) 123-4567', type: 'tel' },
  { name: 'whatsapp', label: 'WhatsApp number', placeholder: 'Include country code, e.g. +1 555 123 4567', type: 'tel' },
  { name: 'website', label: 'Website', placeholder: 'https://example.com', type: 'url' },
  { name: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/yourname', type: 'url' },
  { name: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/yourpage', type: 'url' },
  { name: 'tiktok', label: 'TikTok URL', placeholder: 'https://tiktok.com/@yourname', type: 'url' },
  { name: 'bio', label: 'Short introduction', placeholder: 'What should people know about you?', multiline: true },
]

export function ProfileForm({ action, initialValues = emptyProfile, submitLabel }: {
  action: ProfileAction
  initialValues?: ProfileFormValues
  submitLabel: string
}) {
  const [state, formAction, pending] = useActionState(action, {})

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className={`flex flex-col gap-2 text-sm text-white/70 ${field.multiline ? 'sm:col-span-2' : ''}`}>
            {field.label}
            {field.multiline ? (
              <textarea
                className="min-h-24 resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[#c7b692] focus:ring-2 focus:ring-[#c7b692]/20"
                maxLength={280}
                name={field.name}
                placeholder={field.placeholder}
                rows={3}
                defaultValue={initialValues[field.name]}
              />
            ) : (
              <input
                className="h-12 min-w-0 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white outline-none transition placeholder:text-white/30 focus:border-[#c7b692] focus:ring-2 focus:ring-[#c7b692]/20"
                defaultValue={initialValues[field.name]}
                maxLength={field.name === 'displayName' ? 80 : field.name === 'title' ? 100 : field.name === 'bio' ? 280 : field.name === 'email' ? 254 : field.name === 'phone' ? 40 : field.name === 'whatsapp' ? 24 : 2048}
                name={field.name}
                placeholder={field.placeholder}
                required={field.name === 'displayName'}
                type={field.type ?? 'text'}
              />
            )}
          </label>
        ))}
      </div>

      {state.error && <p role="alert" className="rounded-xl border border-rose-300/20 bg-rose-300/[0.06] px-4 py-3 text-sm text-rose-200">{state.error}</p>}
      {state.success && (
        <div role="status" className="rounded-xl border border-emerald-300/20 bg-emerald-300/[0.05] px-4 py-3 text-sm text-emerald-100">
          <p className="flex items-center gap-2"><Check aria-hidden="true" size={15} />{state.success}</p>
          {state.slug && <a className="mt-2 inline-block font-medium underline underline-offset-4" href={`/p/${state.slug}`} rel="noreferrer" target="_blank">Open your profile · /p/{state.slug}</a>}
        </div>
      )}

      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl bg-[#ded8cb] px-5 text-sm font-semibold text-[#171512] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7b692] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111110] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <>{submitLabel}<ArrowRight aria-hidden="true" size={16} /></>}
      </button>
    </form>
  )
}

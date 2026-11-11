'use server'

import { randomUUID } from 'node:crypto'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { profiles } from '@/lib/db/schema'
import type { ProfileActionState, ProfileFormValues } from '@/lib/profiles/types'

const limits: Record<keyof ProfileFormValues, number> = {
  displayName: 80,
  title: 100,
  bio: 280,
  email: 254,
  phone: 40,
  whatsapp: 24,
  website: 2048,
  instagram: 2048,
  facebook: 2048,
  tiktok: 2048,
}

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user.id ?? null
}

function readField(formData: FormData, key: keyof ProfileFormValues) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeUrl(value: string) {
  if (!value) return ''
  const candidate = /^[a-z][a-z\d+.-]*:/i.test(value) ? value : `https://${value}`

  try {
    const url = new URL(candidate)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    return url.toString().replace(/\/$/, '')
  } catch {
    return null
  }
}

function validateProfile(formData: FormData): ProfileFormValues | null {
  const values = Object.fromEntries(
    (Object.keys(limits) as (keyof ProfileFormValues)[]).map((key) => [key, readField(formData, key)]),
  ) as ProfileFormValues

  if (!values.displayName || values.displayName.length > limits.displayName) return null
  if (values.title.length > limits.title || values.bio.length > limits.bio) return null
  if (values.email.length > limits.email || values.phone.length > limits.phone) return null
  if (values.whatsapp.length > limits.whatsapp) return null

  for (const key of ['website', 'instagram', 'facebook', 'tiktok'] as const) {
    if (values[key].length > limits[key]) return null
    const url = normalizeUrl(values[key])
    if (url === null) return null
    values[key] = url
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return null
  if (values.phone && !/^[+\d().\-\s]+$/.test(values.phone)) return null

  if (values.whatsapp) {
    const digits = values.whatsapp.replace(/\D/g, '')
    if (digits.length < 8 || digits.length > 15) return null
    values.whatsapp = digits
  }

  return values
}

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function createProfile(
  _previousState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const userId = await getUserId()
  if (!userId) return { error: 'Sign in to create a profile.' }

  const values = validateProfile(formData)
  if (!values) return { error: 'Please check the profile details and links, then try again.' }

  const id = randomUUID()
  const slug = `${slugify(values.displayName) || 'profile'}-${id.slice(0, 6)}`

  try {
    await db.insert(profiles).values({ id, userId, slug, ...values })
  } catch (error) {
    console.error('[profiles] Profile creation failed', error)
    return { error: 'We could not create that profile. Please try again.' }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/p/${slug}`)
  return { success: 'Your profile is ready to share.', slug }
}

export async function updateProfile(
  id: string,
  _previousState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const userId = await getUserId()
  if (!userId) return { error: 'Sign in to update a profile.' }

  const values = validateProfile(formData)
  if (!values) return { error: 'Please check the profile details and links, then try again.' }

  try {
    const [updated] = await db
      .update(profiles)
      .set({ ...values, updatedAt: new Date() })
      .where(and(eq(profiles.id, id), eq(profiles.userId, userId)))
      .returning({ slug: profiles.slug })

    if (!updated) return { error: 'That profile could not be found.' }

    revalidatePath('/dashboard')
    revalidatePath(`/p/${updated.slug}`)
    return { success: 'Your changes are saved.', slug: updated.slug }
  } catch (error) {
    console.error('[profiles] Profile update failed', error)
    return { error: 'We could not save those changes. Please try again.' }
  }
}

export async function deleteProfile(id: string) {
  const userId = await getUserId()
  if (!userId) return

  await db.delete(profiles).where(and(eq(profiles.id, id), eq(profiles.userId, userId)))
  revalidatePath('/dashboard')
}

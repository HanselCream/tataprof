import { cache } from 'react'
import type { Metadata } from 'next'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { TataprofProfile } from '@/components/tataprof-profile'
import { db } from '@/lib/db'
import { profiles } from '@/lib/db/schema'

const getPublicProfile = cache(async (slug: string) => {
  const [profile] = await db
    .select({
      slug: profiles.slug,
      displayName: profiles.displayName,
      title: profiles.title,
      bio: profiles.bio,
      email: profiles.email,
      phone: profiles.phone,
      whatsapp: profiles.whatsapp,
      website: profiles.website,
      instagram: profiles.instagram,
      facebook: profiles.facebook,
      tiktok: profiles.tiktok,
    })
    .from(profiles)
    .where(eq(profiles.slug, slug))
    .limit(1)

  return profile ?? null
})

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const profile = await getPublicProfile(slug)

  if (!profile) {
    return { title: 'Profile not found | TataProf', robots: { index: false, follow: false } }
  }

  return {
    title: `${profile.displayName} | TataProf`,
    description: profile.bio || `Connect with ${profile.displayName} on TataProf.`,
  }
}

export default async function PublicProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const profile = await getPublicProfile(slug)

  if (!profile) notFound()

  return <TataprofProfile profile={profile} />
}

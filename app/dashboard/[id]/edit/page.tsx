import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { and, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { updateProfile } from '@/app/actions/profiles'
import { ProfileForm } from '@/components/profile-form'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { profiles } from '@/lib/db/schema'

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  const { id } = await params
  const [profile] = await db
    .select({
      id: profiles.id,
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
    .where(and(eq(profiles.id, id), eq(profiles.userId, session.user.id)))
    .limit(1)

  if (!profile) notFound()

  return (
    <main className="min-h-svh bg-[#090909] px-4 pb-16 text-white sm:px-6">
      <div className="mx-auto max-w-3xl pt-8 sm:pt-12">
        <Link className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white" href="/dashboard">
          <ArrowLeft aria-hidden="true" size={15} /> Back to your profiles
        </Link>
        <p className="mt-9 text-[10px] font-medium uppercase tracking-[0.24em] text-[#c7b692]">Profile settings</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight text-[#f4f0e8]">Edit your profile</h1>
        <p className="mb-7 mt-3 text-sm leading-6 text-white/45">Your public link stays the same while you update your details.</p>
        <section className="rounded-2xl border border-white/[0.1] bg-[#111110]/90 p-5 sm:p-7">
          <ProfileForm
            action={updateProfile.bind(null, profile.id)}
            initialValues={profile}
            submitLabel="Save changes"
          />
        </section>
      </div>
    </main>
  )
}

import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { desc, eq } from 'drizzle-orm'
import { ProfileManager } from '@/components/profile-manager'
import { SignOutButton } from '@/components/sign-out-button'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { profiles } from '@/lib/db/schema'

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect('/sign-in')

  const userProfiles = await db
    .select({
      id: profiles.id,
      slug: profiles.slug,
      displayName: profiles.displayName,
      title: profiles.title,
      createdAt: profiles.createdAt,
    })
    .from(profiles)
    .where(eq(profiles.userId, session.user.id))
    .orderBy(desc(profiles.createdAt))

  return (
    <main className="min-h-svh bg-[#090909] px-4 pb-16 text-white sm:px-6">
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-white/[0.08] py-5">
        <Link aria-label="TataProf home" className="font-serif text-[16px] tracking-[0.18em] text-white" href="/">TATAPROF</Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-white/45 sm:inline">{session.user.name}</span>
          <SignOutButton />
        </div>
      </header>

      <div className="mx-auto max-w-6xl pt-12 sm:pt-16">
        <div className="mb-9 max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#c7b692]">Your workspace</p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight text-[#f4f0e8] sm:text-5xl">Make every introduction count.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/50">Create a polished profile for every person or business. Each one has its own link, ready to share with a tap or scan.</p>
        </div>
        <ProfileManager profiles={userProfiles} />
      </div>
    </main>
  )
}

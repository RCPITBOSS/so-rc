import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { SetupList } from '@/components/dashboard/setup-list'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: setups } = await supabase
    .from('setups')
    .select('id, name, car_model, created_at, notes')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const displayName =
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.email

  return (
    <div className="container py-12">

      {/* ── Welcome ── */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">Welcome back, {displayName}</h1>
        {displayName !== user.email && (
          <p className="mt-1 text-sm text-gray-400">{user.email}</p>
        )}
      </div>

      {/* ── Quick Actions ── */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/notebook"
            className="rounded-lg bg-yokomo-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-yokomo-blue/90"
          >
            New Setup
          </Link>
        </div>
      </section>

      {/* ── Your Setups ── */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Your Setups</h2>
        <SetupList initialSetups={setups ?? []} />
      </section>

    </div>
  )
}

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { RunManager, type RunRow } from '@/components/session/run-manager'

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: setup } = await supabase
    .from('setups')
    .select('id, name')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!setup) redirect('/dashboard')

  const { data: runsRaw } = await supabase
    .from('runs')
    .select('id, run_order, run_type, rating, crashes, laps, total_time, fastest_lap, average_lap, average_top_5, average_top_10, notes, setup_snapshot_id, setup_snapshot, created_at')
    .eq('setup_snapshot_id', id)
    .order('created_at', { ascending: true })

  const runs: RunRow[] = (runsRaw ?? []) as RunRow[]

  return (
    <div className="container max-w-3xl py-12">
      <Link
        href="/dashboard"
        className="mb-4 inline-block text-sm text-gray-400 transition-colors hover:text-white"
      >
        &larr; Back to Dashboard
      </Link>
      <RunManager runs={runs} setupId={id} setupName={setup.name} />
    </div>
  )
}

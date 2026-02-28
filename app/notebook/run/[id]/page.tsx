import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { RunLogForm } from '@/components/notebook/run-log-form'

export default async function RunLogPage({
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

  return (
    <div className="container max-w-2xl py-12">
      <Suspense>
        <RunLogForm
          setupId={setup.id}
          setupName={setup.name}
          userId={user.id}
        />
      </Suspense>
    </div>
  )
}

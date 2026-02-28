import { Suspense } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { SetupForm } from '@/components/notebook/setup-form'

export default async function NotebookPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/dashboard" className="mb-4 inline-block text-sm text-gray-400 transition-colors hover:text-white">&larr; Back to Dashboard</Link>
        <h1 className="text-2xl font-bold text-white">Setup Notebook</h1>
        <p className="mt-1 text-sm text-gray-400">{user.email}</p>
      </div>
      <Suspense>
        <SetupForm userId={user.id} />
      </Suspense>
    </div>
  )
}

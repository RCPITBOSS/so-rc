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
        <h1 className="text-2xl font-bold text-white">Setup Notebook</h1>
        <p className="mt-1 text-sm text-gray-400">{user.email}</p>
      </div>
      <SetupForm userId={user.id} />
    </div>
  )
}

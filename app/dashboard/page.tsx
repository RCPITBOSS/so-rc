import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return (
    <div className="container py-16">
      <h1 className="text-2xl font-bold text-white">Welcome to your dashboard</h1>
      <p className="mt-2 text-sm text-gray-400">{user.email}</p>
    </div>
  )
}

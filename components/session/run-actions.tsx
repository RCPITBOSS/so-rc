'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export function RunActions({ runId, setupId }: { runId: string; setupId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Delete this run? This cannot be undone.')) return
    const supabase = createClient()
    const { error } = await supabase.from('runs').delete().eq('id', runId)
    if (!error) router.refresh()
  }

  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/notebook/run/${setupId}?edit=${runId}`}
        aria-label="Edit run"
        className="rounded p-1 text-gray-600 transition-colors hover:text-white"
      >
        <Pencil className="h-3.5 w-3.5" />
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        aria-label="Delete run"
        className="rounded p-1 text-gray-600 transition-colors hover:text-racing-red"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'

interface Setup {
  id: string
  name: string | null
  car_model: string | null
  created_at: string
  notes: string | null
}

export function SetupList({ initialSetups }: { initialSetups: Setup[] }) {
  const [setups, setSetups] = useState(initialSetups)

  async function handleDelete(id: string) {
    if (!confirm('Delete this setup? This cannot be undone.')) return
    const supabase = createClient()
    const { error } = await supabase.from('setups').delete().eq('id', id)
    if (!error) {
      setSetups(prev => prev.filter(s => s.id !== id))
    }
  }

  if (setups.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-[#111] py-16 text-center">
        <p className="text-gray-500">No setups yet. Create your first setup.</p>
        <Link
          href="/notebook"
          className="mt-4 inline-block text-sm font-medium text-yokomo-blue hover:underline"
        >
          Create a setup &rarr;
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {setups.map(setup => (
        <div
          key={setup.id}
          className="rounded-lg border border-white/10 bg-[#111] p-5 transition-colors hover:border-white/20"
        >
          {setup.car_model && (
            <div className="mb-1 text-sm text-yokomo-blue">{setup.car_model}</div>
          )}
          <h3 className="mb-1 font-semibold text-white">
            {setup.name || '(unnamed)'}
          </h3>
          <p className="mb-3 text-xs text-gray-500">
            {new Date(setup.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          {setup.notes && (
            <p className="mb-4 line-clamp-2 text-sm text-gray-400">{setup.notes}</p>
          )}
          <div className="flex items-center justify-between">
            <Link
              href="/notebook"
              className="inline-flex items-center text-sm font-medium text-yokomo-blue hover:underline"
            >
              Load &rarr;
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(setup.id)}
              aria-label="Delete setup"
              className="rounded p-1 text-gray-600 transition-colors hover:text-racing-red"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

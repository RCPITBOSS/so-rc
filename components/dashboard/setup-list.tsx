'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import type { SetupRow } from '@/app/dashboard/page'

interface Run {
  id: string
  setup_snapshot_id: string
  run_type: string | null
  rating: number | null
  crashes: number | null
  notes: string | null
  created_at: string
}

export function SetupList({
  initialSetups,
  initialRuns,
}: {
  initialSetups: SetupRow[]
  initialRuns: Run[]
}) {
  const [setups, setSetups] = useState(initialSetups)

  const runsBySetup = initialRuns.reduce<Record<string, Run[]>>((acc, run) => {
    const key = run.setup_snapshot_id
    if (!acc[key]) acc[key] = []
    acc[key].push(run)
    return acc
  }, {})

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
      {setups.map(setup => {
        const setupRuns = [...(runsBySetup[setup.id] ?? [])]
        setupRuns.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        const runCount  = setupRuns.length
        const latestRun = setupRuns[0] ?? null

        return (
          <div
            key={setup.id}
            className="rounded-lg border border-white/10 bg-[#111] p-5 transition-colors hover:border-white/20"
          >
            <div className="mb-1">
              <h3 className="font-semibold text-white">{setup.name || '(unnamed)'}</h3>
            </div>

            <p className="mb-1 text-xs text-gray-500">
              {new Date(setup.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            {/* Run summary */}
            <div className="mb-3">
              <p className="text-xs text-gray-500">
                {runCount === 0
                  ? 'No runs logged'
                  : `${runCount} run${runCount === 1 ? '' : 's'} logged`}
              </p>
              {latestRun && (latestRun.run_type || latestRun.rating) && (
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-600">
                  {latestRun.run_type && (
                    <span>{latestRun.run_type}</span>
                  )}
                  {latestRun.run_type && latestRun.rating ? <span>·</span> : null}
                  {latestRun.rating != null && latestRun.rating > 0 && (
                    <span>
                      {[1, 2, 3, 4, 5].map(n => (
                        <span
                          key={n}
                          className={n <= (latestRun.rating ?? 0) ? 'text-racing-yellow' : 'text-gray-700'}
                        >
                          ★
                        </span>
                      ))}
                    </span>
                  )}
                </p>
              )}
            </div>

            {setup.notes && (
              <p className="mb-4 line-clamp-2 text-sm text-gray-400">{setup.notes}</p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href={`/notebook?load=${setup.id}`}
                  className="inline-flex items-center text-sm font-medium text-yokomo-blue hover:underline"
                >
                  Load &rarr;
                </Link>
                <Link
                  href={`/notebook/run/${setup.id}`}
                  className="inline-flex items-center text-sm font-medium text-gray-400 transition-colors hover:text-white"
                >
                  Log a run &rarr;
                </Link>
                <Link
                  href={`/session/${setup.id}`}
                  className="inline-flex items-center text-sm font-medium text-gray-400 transition-colors hover:text-white"
                >
                  View Runs &rarr;
                </Link>
              </div>
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
        )
      })}
    </div>
  )
}

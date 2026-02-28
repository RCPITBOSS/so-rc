'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RunActions } from '@/components/session/run-actions'
import { SetupSnapshotModal } from '@/components/session/setup-snapshot-modal'

// ─── Types ────────────────────────────────────────────────────────────────────

type SetupData = Record<string, unknown>

export interface RunRow {
  id: string
  run_order: number
  run_type: string | null
  rating: number | null
  crashes: number | null
  laps: number | null
  total_time: string | null
  fastest_lap: string | null
  average_lap: string | null
  average_top_5: string | null
  average_top_10: string | null
  notes: string | null
  setup_snapshot_id: string | null
  setup_snapshot: SetupData | null
  created_at: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function diffSetupData(
  a: SetupData,
  b: SetupData
): Array<{ key: string; from: unknown; to: unknown }> {
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)])
  const changes: Array<{ key: string; from: unknown; to: unknown }> = []
  for (const key of allKeys) {
    if (String(a[key] ?? '') !== String(b[key] ?? '')) {
      changes.push({ key, from: a[key], to: b[key] })
    }
  }
  return changes
}

function parseSeconds(val: string | null): number | null {
  if (!val) return null
  const mmss = val.match(/^(\d+):(\d+(?:\.\d+)?)$/)
  if (mmss) return parseInt(mmss[1]!) * 60 + parseFloat(mmss[2]!)
  const n = parseFloat(val)
  return isNaN(n) ? null : n
}

function betterLower(a: string | null, b: string | null): 'a' | 'b' | 'tie' | null {
  const pa = parseSeconds(a), pb = parseSeconds(b)
  if (pa == null || pb == null) return null
  return pa < pb ? 'a' : pb < pa ? 'b' : 'tie'
}

function betterHigher(a: number | null, b: number | null): 'a' | 'b' | 'tie' | null {
  if (a == null || b == null) return null
  return a > b ? 'a' : b > a ? 'b' : 'tie'
}

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} className={n <= rating ? 'text-racing-yellow' : 'text-gray-700'}>★</span>
      ))}
    </span>
  )
}

// ─── Compare Modal ────────────────────────────────────────────────────────────

function CompareModal({
  run1, run2, run1Index, run2Index, onClose,
}: {
  run1: RunRow
  run2: RunRow
  run1Index: number
  run2Index: number
  onClose: () => void
}) {
  const lapRows = [
    {
      key: 'laps', label: 'Laps',
      val1: run1.laps != null ? String(run1.laps) : null,
      val2: run2.laps != null ? String(run2.laps) : null,
      better: betterHigher(run1.laps, run2.laps),
    },
    {
      key: 'total', label: 'Total',
      val1: run1.total_time, val2: run2.total_time,
      better: betterLower(run1.total_time, run2.total_time),
    },
    {
      key: 'best', label: 'Best lap',
      val1: run1.fastest_lap, val2: run2.fastest_lap,
      better: betterLower(run1.fastest_lap, run2.fastest_lap),
    },
    {
      key: 'avg', label: 'Avg lap',
      val1: run1.average_lap, val2: run2.average_lap,
      better: betterLower(run1.average_lap, run2.average_lap),
    },
    {
      key: 'top5', label: 'Top 5',
      val1: run1.average_top_5, val2: run2.average_top_5,
      better: betterLower(run1.average_top_5, run2.average_top_5),
    },
    {
      key: 'top10', label: 'Top 10',
      val1: run1.average_top_10, val2: run2.average_top_10,
      better: betterLower(run1.average_top_10, run2.average_top_10),
    },
  ].filter(r => r.val1 != null || r.val2 != null)

  const snap1 = run1.setup_snapshot
  const snap2 = run2.setup_snapshot
  const diffs = snap1 && snap2 ? diffSetupData(snap1, snap2) : null

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative h-full overflow-y-auto">
        <div
          className="mx-auto my-8 max-w-3xl px-4 pb-8"
          onClick={e => e.stopPropagation()}
        >
          <div className="rounded-lg border border-white/10 bg-[#111]">

            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <h2 className="text-base font-semibold text-white">Run comparison</h2>
              <button
                type="button"
                onClick={onClose}
                className="text-lg leading-none text-gray-500 transition-colors hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Run column headers */}
            <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10">
              {([
                { run: run1, idx: run1Index },
                { run: run2, idx: run2Index },
              ] as const).map(({ run, idx }) => (
                <div key={idx} className="px-6 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(run.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    {run.run_type && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-gray-300">
                        {run.run_type}
                      </span>
                    )}
                    {run.rating != null && run.rating > 0 && <Stars rating={run.rating} />}
                  </div>
                  {run.crashes != null && run.crashes > 0 && (
                    <p className="mt-1 text-xs text-racing-red">
                      {run.crashes} crash{run.crashes !== 1 ? 'es' : ''}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Lap times */}
            <div className="border-b border-white/10 px-6 py-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Lap times
              </p>
              {lapRows.length === 0 ? (
                <p className="text-sm text-gray-500">No lap times recorded for either run.</p>
              ) : (
                <div className="overflow-hidden rounded-md">
                  <div className="grid grid-cols-3 bg-white/5 px-4 py-2 text-xs font-medium text-gray-500">
                    <span />
                    <span>Run {run1Index + 1}</span>
                    <span>Run {run2Index + 1}</span>
                  </div>
                  {lapRows.map(row => (
                    <div key={row.key} className="grid grid-cols-3 border-t border-white/5 px-4 py-2.5 text-sm">
                      <span className="text-gray-500">{row.label}</span>
                      <span className={
                        row.better === 'a' ? 'font-medium text-green-400' :
                        row.better === 'tie' ? 'text-gray-400' : 'text-white'
                      }>
                        {row.val1 ?? '—'}
                      </span>
                      <span className={
                        row.better === 'b' ? 'font-medium text-green-400' :
                        row.better === 'tie' ? 'text-gray-400' : 'text-white'
                      }>
                        {row.val2 ?? '—'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Setup diff */}
            <div className="px-6 py-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Setup changes
              </p>
              {diffs === null ? (
                <p className="text-sm text-gray-500">
                  Setup snapshot not available for one or both runs.
                </p>
              ) : diffs.length === 0 ? (
                <p className="text-sm text-gray-500">Setups are identical.</p>
              ) : (
                <div className="overflow-hidden rounded-md">
                  <div className="grid grid-cols-3 bg-white/5 px-4 py-2 text-xs font-medium text-gray-500">
                    <span>Field</span>
                    <span>Run {run1Index + 1}</span>
                    <span>Run {run2Index + 1}</span>
                  </div>
                  {diffs.map(d => (
                    <div key={d.key} className="grid grid-cols-3 border-t border-white/5 px-4 py-2.5 text-sm">
                      <span className="text-gray-400">{d.key.replace(/_/g, ' ')}</span>
                      <span className="text-white">{String(d.from ?? '—')}</span>
                      <span className="text-white">{String(d.to ?? '—')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function RunManager({
  runs,
  setupId,
  setupName,
}: {
  runs: RunRow[]
  setupId: string
  setupName: string | null
}) {
  const [compareMode, setCompareMode]   = useState(false)
  const [selected, setSelected]         = useState<string[]>([])
  const [compareOpen, setCompareOpen]   = useState(false)

  function toggleSelect(id: string) {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 2
        ? [...prev, id]
        : prev
    )
  }

  function enterCompareMode() {
    setCompareMode(true)
    setSelected([])
    setCompareOpen(false)
  }

  function exitCompareMode() {
    setCompareMode(false)
    setSelected([])
    setCompareOpen(false)
  }

  const run1 = runs.find(r => r.id === selected[0]) ?? null
  const run2 = runs.find(r => r.id === selected[1]) ?? null

  return (
    <>
      {/* ── Header ── */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{setupName || '(unnamed)'}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {runs.length} run{runs.length !== 1 ? 's' : ''} logged
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {compareMode ? (
            <>
              <span className="text-xs text-gray-500">{selected.length}/2 selected</span>
              <button
                type="button"
                disabled={selected.length !== 2}
                onClick={() => setCompareOpen(true)}
                className="rounded-lg bg-yokomo-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-yokomo-blue/90 disabled:opacity-40"
              >
                Compare
              </button>
              <button
                type="button"
                onClick={exitCompareMode}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:border-white/20 hover:text-white"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {runs.length >= 2 && (
                <button
                  type="button"
                  onClick={enterCompareMode}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:border-white/20 hover:text-white"
                >
                  Compare runs
                </button>
              )}
              <Link
                href={`/notebook/run/${setupId}`}
                className="shrink-0 inline-flex items-center justify-center rounded-lg bg-yokomo-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-yokomo-blue/90"
              >
                + Log a run
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Empty state ── */}
      {runs.length === 0 && (
        <div className="rounded-lg border border-white/10 bg-[#111] py-16 text-center">
          <p className="text-gray-500">No runs logged yet for this setup.</p>
        </div>
      )}

      {/* ── Run list ── */}
      <div className="space-y-3">
        {runs.map((run, i) => {
          const prev = runs[i - 1]
          const diffs =
            !compareMode && prev && prev.setup_snapshot && run.setup_snapshot
              ? diffSetupData(prev.setup_snapshot, run.setup_snapshot)
              : []

          const hasLapTimes =
            run.laps != null ||
            run.total_time ||
            run.fastest_lap ||
            run.average_lap ||
            run.average_top_5 ||
            run.average_top_10

          const isSelected = selected.includes(run.id)
          const isDisabled = compareMode && !isSelected && selected.length === 2

          return (
            <div key={run.id}>
              {/* Divider (hidden in compare mode) */}
              {i > 0 && !compareMode && (
                diffs.length > 0 ? (
                  <div className="my-3 rounded-lg border border-blue-800/30 bg-blue-950/30 px-4 py-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                      Setup changes
                    </p>
                    <div className="space-y-1">
                      {diffs.map(d => (
                        <div key={d.key} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-xs">
                          <span className="text-gray-400">{d.key.replace(/_/g, ' ')}</span>
                          <span className="text-gray-500 line-through">{String(d.from ?? '—')}</span>
                          <span className="text-gray-500">&rarr;</span>
                          <span className="text-white">{String(d.to ?? '—')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="my-3 flex items-center gap-3">
                    <div className="h-px flex-1 border-t border-dashed border-white/10" />
                    <span className="text-xs text-gray-500">Same setup</span>
                    <div className="h-px flex-1 border-t border-dashed border-white/10" />
                  </div>
                )
              )}

              {/* Run card */}
              <div
                className={`rounded-lg border bg-[#111] p-5 transition-colors ${
                  compareMode
                    ? isSelected
                      ? 'cursor-pointer border-yokomo-blue'
                      : isDisabled
                      ? 'border-white/5 opacity-40'
                      : 'cursor-pointer border-white/10 hover:border-white/20'
                    : 'border-white/10'
                }`}
                onClick={compareMode && !isDisabled ? () => toggleSelect(run.id) : undefined}
              >
                {/* Run header row */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {compareMode && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={() => toggleSelect(run.id)}
                      onClick={e => e.stopPropagation()}
                      className="h-4 w-4 cursor-pointer"
                    />
                  )}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {run.run_type && (
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-gray-300">
                      {run.run_type}
                    </span>
                  )}
                  {run.rating != null && run.rating > 0 && (
                    <Stars rating={run.rating} />
                  )}
                  {run.crashes != null && run.crashes > 0 && (
                    <span className="text-xs text-racing-red">
                      {run.crashes} crash{run.crashes !== 1 ? 'es' : ''}
                    </span>
                  )}
                  <span className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-gray-600">
                      {new Date(run.created_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric',
                      })}
                    </span>
                    {!compareMode && (
                      <>
                        <SetupSnapshotModal snapshot={run.setup_snapshot} />
                        <RunActions runId={run.id} setupId={setupId} />
                      </>
                    )}
                  </span>
                </div>

                {/* Lap times */}
                {hasLapTimes && (
                  <div className="mb-3 grid grid-cols-3 gap-x-4 gap-y-1.5 rounded-md bg-white/5 px-3 py-2.5 text-sm sm:grid-cols-6">
                    {run.laps != null && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Laps</p>
                        <p className="font-medium text-white">{run.laps}</p>
                      </div>
                    )}
                    {run.total_time && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Total</p>
                        <p className="font-medium text-white">{run.total_time}</p>
                      </div>
                    )}
                    {run.fastest_lap && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Best</p>
                        <p className="font-medium text-yokomo-blue">{run.fastest_lap}</p>
                      </div>
                    )}
                    {run.average_lap && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Avg</p>
                        <p className="font-medium text-white">{run.average_lap}</p>
                      </div>
                    )}
                    {run.average_top_5 && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Top 5</p>
                        <p className="font-medium text-white">{run.average_top_5}</p>
                      </div>
                    )}
                    {run.average_top_10 && (
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Top 10</p>
                        <p className="font-medium text-white">{run.average_top_10}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Notes */}
                {run.notes && (
                  <p className="text-sm text-gray-400">{run.notes}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Compare modal ── */}
      {compareOpen && run1 && run2 && (
        <CompareModal
          run1={run1}
          run2={run2}
          run1Index={runs.findIndex(r => r.id === run1.id)}
          run2Index={runs.findIndex(r => r.id === run2.id)}
          onClose={() => setCompareOpen(false)}
        />
      )}
    </>
  )
}

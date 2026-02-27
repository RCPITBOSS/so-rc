'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

const lCls = 'mb-1 block text-sm font-medium text-gray-300'
const iCls = 'h-10 w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue'
const sCls = 'h-10 w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue'
const CARD = 'rounded-lg border border-white/10 bg-[#111] p-6'
const G2   = 'grid grid-cols-1 md:grid-cols-2 gap-4'

const RUN_TYPES = ['Practice', 'Qualifying', 'Main']
const CRASHES   = Array.from({ length: 11 }, (_, i) => String(i))

function StarRating({
  value,
  onChange,
}: {
  value: number
  onChange: (n: number) => void
}) {
  return (
    <div>
      <label className={lCls}>Rating</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(value === n ? 0 : n)}
            className={`text-3xl leading-none transition-colors ${
              n <= value ? 'text-racing-yellow' : 'text-gray-600 hover:text-gray-400'
            }`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  )
}

interface Props {
  setupId: string
  setupName: string | null
  userId: string
}

export function RunLogForm({ setupId, setupName, userId }: Props) {
  const [runType, setRunType]   = useState('')
  const [rating, setRating]     = useState(0)
  const [crashes, setCrashes]   = useState('')
  const [notes, setNotes]       = useState('')
  const [status, setStatus]     = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    setErrorMsg('')

    const supabase = createClient()
    // Actual columns: id, user_id, event_id (required FK), setup_snapshot_id,
    // run_type, run_order, rating, motor_temp, crashes, notes, created_at, updated_at, deleted_at
    const { error } = await supabase.from('runs').insert({
      user_id:            userId,
      setup_snapshot_id:  setupId,
      run_type:           runType || null,
      rating:             rating  || null,
      crashes:            crashes !== '' ? Number(crashes) : 0,
      notes:              notes   || null,
    })

    if (error) {
      setErrorMsg(error.message)
      setStatus('error')
    } else {
      setStatus('saved')
      setRunType('')
      setRating(0)
      setCrashes('')
      setNotes('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className={CARD}>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">Log a Run</h2>
          {setupName && (
            <p className="mt-1 text-sm text-gray-400">Setup: {setupName}</p>
          )}
        </div>

        <div className={G2}>
          {/* Run type */}
          <div>
            <label className={lCls}>Run type</label>
            <select
              value={runType}
              onChange={e => setRunType(e.target.value)}
              className={sCls}
            >
              <option value="">—</option>
              {RUN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Crashes */}
          <div>
            <label className={lCls}>Crashes</label>
            <select
              value={crashes}
              onChange={e => setCrashes(e.target.value)}
              className={sCls}
            >
              <option value="">—</option>
              {CRASHES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          {/* Star rating */}
          <StarRating value={rating} onChange={setRating} />
        </div>

        <div className="mt-4">
          <label className={lCls}>Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="How the car felt, setup changes, anything worth remembering…"
            rows={4}
            className={`${iCls} h-auto resize-none`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          {status === 'saved' && <p className="text-sm text-green-400">Run logged.</p>}
          {status === 'error' && <p className="text-sm text-red-400">{errorMsg || 'Failed to save.'}</p>}
        </div>
        <button
          type="submit"
          disabled={status === 'saving'}
          className="rounded-lg bg-yokomo-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-yokomo-blue/90 disabled:opacity-50"
        >
          {status === 'saving' ? 'Saving…' : 'Save run'}
        </button>
      </div>
    </form>
  )
}

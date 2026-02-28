'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const lCls  = 'mb-1 block text-sm font-medium text-gray-300'
const iCls  = 'h-10 w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue'
const sCls  = 'h-10 w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue'
const CARD  = 'rounded-lg border border-white/10 bg-[#111] p-6'
const GROUP = 'rounded-lg border border-white/10 bg-[#0A0A0A] p-4'
const G2    = 'grid grid-cols-1 md:grid-cols-2 gap-4'

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
  const router = useRouter()
  const [runType, setRunType]       = useState('')
  const [rating, setRating]         = useState(0)
  const [crashes, setCrashes]       = useState('')
  const [laps, setLaps]             = useState('')
  const [totalTime, setTotalTime]   = useState('')
  const [fastestLap, setFastestLap] = useState('')
  const [averageLap, setAverageLap] = useState('')
  const [avgTop5, setAvgTop5]       = useState('')
  const [avgTop10, setAvgTop10]     = useState('')
  const [notes, setNotes]           = useState('')
  const [status, setStatus]         = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [errorMsg, setErrorMsg]     = useState('')
  const [editRunId, setEditRunId]   = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const editId = searchParams.get('edit')
    if (!editId) return
    setEditRunId(editId)
    const supabase = createClient()
    supabase
      .from('runs')
      .select('run_type, rating, crashes, laps, total_time, fastest_lap, average_lap, average_top_5, average_top_10, notes')
      .eq('id', editId)
      .single()
      .then(({ data }) => {
        if (!data) return
        setRunType(data.run_type ?? '')
        setRating(data.rating ?? 0)
        setCrashes(data.crashes != null ? String(data.crashes) : '')
        setLaps(data.laps != null ? String(data.laps) : '')
        setTotalTime(data.total_time ?? '')
        setFastestLap(data.fastest_lap ?? '')
        setAverageLap(data.average_lap ?? '')
        setAvgTop5(data.average_top_5 ?? '')
        setAvgTop10(data.average_top_10 ?? '')
        setNotes(data.notes ?? '')
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    setErrorMsg('')

    const supabase = createClient()

    const payload = {
      run_type:      runType     || null,
      rating:        rating      || null,
      crashes:       crashes !== '' ? Number(crashes) : 0,
      laps:          laps        ? Number(laps) : null,
      total_time:    totalTime   || null,
      fastest_lap:   fastestLap  || null,
      average_lap:   averageLap  || null,
      average_top_5: avgTop5     || null,
      average_top_10: avgTop10   || null,
      notes:         notes       || null,
    }

    let error: { message: string } | null

    if (editRunId) {
      ;({ error } = await supabase.from('runs').update(payload).eq('id', editRunId))
    } else {
      const { data: setupRow } = await supabase
        .from('setups')
        .select('setup_data')
        .eq('id', setupId)
        .single()
      const { data: maxRow } = await supabase
        .from('runs')
        .select('run_order')
        .eq('setup_snapshot_id', setupId)
        .order('run_order', { ascending: false })
        .limit(1)
        .single()
      const nextOrder = (maxRow?.run_order ?? 0) + 1
      ;({ error } = await supabase.from('runs').insert({
        user_id:           userId,
        setup_snapshot_id: setupId,
        run_order:         nextOrder,
        setup_snapshot:    setupRow?.setup_data ?? null,
        ...payload,
      }))
    }

    if (error) {
      setErrorMsg(error.message)
      setStatus('error')
    } else {
      router.push(`/session/${setupId}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Link
        href={`/session/${setupId}`}
        className="inline-block text-sm text-gray-400 transition-colors hover:text-white"
      >
        &larr; Back to runs
      </Link>

      <div className={CARD}>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">{editRunId ? 'Edit Run' : 'Log a Run'}</h2>
          {setupName && (
            <p className="mt-1 text-sm text-gray-400">Setup: {setupName}</p>
          )}
        </div>

        {/* Run type + Crashes */}
        <div className={`${G2} mb-4`}>
          <div>
            <label className={lCls}>Run type</label>
            <select value={runType} onChange={e => setRunType(e.target.value)} className={sCls}>
              <option value="">—</option>
              {RUN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={lCls}>Crashes</label>
            <select value={crashes} onChange={e => setCrashes(e.target.value)} className={sCls}>
              <option value="">—</option>
              {CRASHES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* Lap Times */}
        <div className={`${GROUP} mb-4`}>
          <h3 className="mb-3 text-sm font-semibold text-white">Lap Times</h3>
          <div className={G2}>
            <div>
              <label className={lCls}>Laps</label>
              <input
                type="number" min="0" value={laps}
                onChange={e => setLaps(e.target.value)}
                className={iCls}
              />
            </div>
            <div>
              <label className={lCls}>Total time</label>
              <input
                type="text" value={totalTime}
                onChange={e => setTotalTime(e.target.value)}
                className={iCls}
              />
              <p className="mt-1 text-xs text-gray-500">mm:ss.000</p>
            </div>
            <div>
              <label className={lCls}>Fastest lap</label>
              <input
                type="text" value={fastestLap}
                onChange={e => setFastestLap(e.target.value)}
                className={iCls}
              />
              <p className="mt-1 text-xs text-gray-500">seconds</p>
            </div>
            <div>
              <label className={lCls}>Average lap</label>
              <input
                type="text" value={averageLap}
                onChange={e => setAverageLap(e.target.value)}
                className={iCls}
              />
              <p className="mt-1 text-xs text-gray-500">seconds</p>
            </div>
            <div>
              <label className={lCls}>Average top 5</label>
              <input
                type="text" value={avgTop5}
                onChange={e => setAvgTop5(e.target.value)}
                className={iCls}
              />
              <p className="mt-1 text-xs text-gray-500">seconds</p>
            </div>
            <div>
              <label className={lCls}>Average top 10</label>
              <input
                type="text" value={avgTop10}
                onChange={e => setAvgTop10(e.target.value)}
                className={iCls}
              />
              <p className="mt-1 text-xs text-gray-500">seconds</p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <StarRating value={rating} onChange={setRating} />
        </div>

        {/* Notes */}
        <div>
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
          {status === 'saved' && <p className="text-sm text-green-400">{editRunId ? 'Run updated.' : 'Run logged.'}</p>}
          {status === 'error' && <p className="text-sm text-red-400">{errorMsg || 'Failed to save.'}</p>}
        </div>
        <div className="flex items-center gap-3">
          {editRunId && (
            <Link
              href={`/session/${setupId}`}
              className="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-semibold text-gray-300 transition-colors hover:border-white/20 hover:text-white"
            >
              Cancel
            </Link>
          )}
          <button
            type="submit"
            disabled={status === 'saving'}
            className="rounded-lg bg-yokomo-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-yokomo-blue/90 disabled:opacity-50"
          >
            {status === 'saving' ? 'Saving…' : editRunId ? 'Update run' : 'Save run'}
          </button>
        </div>
      </div>
    </form>
  )
}

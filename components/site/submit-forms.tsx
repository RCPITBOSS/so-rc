'use client';

import { useState, type FormEvent } from 'react';
import { Send, Upload } from 'lucide-react';

const surfaceOptions = ['Indoor Dirt/Clay', 'Indoor Carpet', 'Outdoor Dirt', 'Turf'];

export function SubmitForms() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <SetupForm />
      <TrackForm />
    </div>
  );
}

function SetupForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/submit-setup', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="rounded-lg border border-white/10 bg-[#111] p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Setup Submissions</h2>
        <p className="mt-1 text-sm text-gray-400">
          Have a setup sheet to share? Submit it here.
        </p>
      </div>

      {status === 'sent' ? (
        <div className="rounded-lg bg-yokomo-blue/10 p-6 text-center">
          <p className="font-medium text-yokomo-blue">Setup submitted. Thank you!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Name</label>
            <input
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Track Name</label>
            <input
              name="track"
              type="text"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Surface Type</label>
            <select
              name="surface"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            >
              <option value="">Select surface...</option>
              {surfaceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Setup Sheet (PDF)
            </label>
            <div className="relative">
              <input
                name="file"
                type="file"
                accept=".pdf"
                required
                className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white file:mr-3 file:rounded file:border-0 file:bg-yokomo-blue/20 file:px-3 file:py-1 file:text-xs file:font-medium file:text-yokomo-blue focus:border-yokomo-blue focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Notes{' '}
              <span className="text-gray-600">(optional)</span>
            </label>
            <textarea
              name="notes"
              rows={3}
              className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 rounded-lg bg-racing-yellow px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-racing-yellow/90 disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            {status === 'sending' ? 'Submitting...' : 'Submit Setup'}
          </button>
          {status === 'error' && (
            <p className="text-sm text-racing-red">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </div>
  );
}

function TrackForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/submit-track', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="rounded-lg border border-white/10 bg-[#111] p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">Track Submissions</h2>
        <p className="mt-1 text-sm text-gray-400">
          Know a track that should be listed? Let us know.
        </p>
      </div>

      {status === 'sent' ? (
        <div className="rounded-lg bg-yokomo-blue/10 p-6 text-center">
          <p className="font-medium text-yokomo-blue">Track submitted. Thank you!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Track Name</label>
            <input
              name="trackName"
              type="text"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Location (City, State)
            </label>
            <input
              name="location"
              type="text"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">Surface Type</label>
            <select
              name="surface"
              required
              className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            >
              <option value="">Select surface...</option>
              {surfaceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Website{' '}
              <span className="text-gray-600">(optional)</span>
            </label>
            <input
              name="website"
              type="url"
              className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-300">
              Additional Info
            </label>
            <textarea
              name="info"
              rows={3}
              className="w-full rounded-lg border border-white/10 bg-[#0A0A0A] px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:border-yokomo-blue focus:outline-none focus:ring-1 focus:ring-yokomo-blue"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 rounded-lg bg-racing-yellow px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-racing-yellow/90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {status === 'sending' ? 'Submitting...' : 'Submit Track'}
          </button>
          {status === 'error' && (
            <p className="text-sm text-racing-red">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </div>
  );
}

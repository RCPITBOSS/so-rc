import Link from 'next/link'
import { signUp } from '../actions'

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Create account</h1>
          <p className="mt-2 text-sm text-gray-400">Start your setup notebook</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form action={signUp} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Display name
            </label>
            <input
              name="display_name"
              type="text"
              required
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-yokomo-blue focus:outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Car model
            </label>
            <select
              name="car_model"
              required
              className="w-full rounded-md border border-white/10 bg-[#111] px-3 py-2 text-sm text-white focus:border-yokomo-blue focus:outline-none"
            >
              <option value="">Select a model</option>
              <option value="SO 2.0">SO 2.0</option>
              <option value="SO 3.0">SO 3.0</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-yokomo-blue focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-yokomo-blue focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-yokomo-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-yokomo-blue/90"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-yokomo-blue hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

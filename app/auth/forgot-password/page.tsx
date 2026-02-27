import Link from 'next/link'
import { resetPassword } from '../actions'

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>
}) {
  const { error, sent } = await searchParams

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Reset password</h1>
          <p className="mt-2 text-sm text-gray-400">
            Enter your email and we&apos;ll send a reset link.
          </p>
        </div>

        {sent && (
          <div className="mb-4 rounded-md border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            Check your email for a reset link.
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {!sent && (
          <form action={resetPassword} className="space-y-4">
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

            <button
              type="submit"
              className="w-full rounded-md bg-yokomo-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-yokomo-blue/90"
            >
              Send reset link
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          <Link href="/auth/login" className="text-yokomo-blue hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

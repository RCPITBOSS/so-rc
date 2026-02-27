import Link from 'next/link'
import { resetPasswordUpdate } from '../actions'

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string }>
}) {
  const { code, error } = await searchParams

  if (!code) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold text-white">Invalid reset link</h1>
          <p className="mt-3 text-sm text-gray-400">
            This reset link is invalid or has expired.
          </p>
          <Link
            href="/auth/forgot-password"
            className="mt-6 inline-block text-sm text-yokomo-blue hover:underline"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Set new password</h1>
          <p className="mt-2 text-sm text-gray-400">Enter your new password below.</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form action={resetPasswordUpdate} className="space-y-4">
          <input type="hidden" name="code" value={code} />

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              New password
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-yokomo-blue focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-300">
              Confirm password
            </label>
            <input
              name="confirm_password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-yokomo-blue focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-yokomo-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-yokomo-blue/90"
          >
            Update password
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          <Link href="/auth/login" className="text-yokomo-blue hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

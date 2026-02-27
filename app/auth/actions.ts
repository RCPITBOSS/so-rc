'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const displayName = formData.get('display_name') as string
  const carModel = formData.get('car_model') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName, car_model: carModel },
    },
  })

  if (error) redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`)

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) redirect(`/auth/login?error=${encodeURIComponent(error.message)}`)

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://superoffroadrc.com/auth/reset-password',
  })
  if (error) redirect(`/auth/forgot-password?error=${encodeURIComponent(error.message)}`)
  redirect('/auth/forgot-password?sent=1')
}

export async function resetPasswordUpdate(formData: FormData) {
  const supabase = await createClient()
  const code = formData.get('code') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string

  if (password !== confirmPassword) {
    redirect(
      `/auth/reset-password?code=${encodeURIComponent(code)}&error=${encodeURIComponent('Passwords do not match')}`
    )
  }

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
  if (exchangeError) {
    redirect(`/auth/reset-password?error=${encodeURIComponent(exchangeError.message)}`)
  }

  const { error } = await supabase.auth.updateUser({ password })
  if (error) {
    redirect(
      `/auth/reset-password?code=${encodeURIComponent(code)}&error=${encodeURIComponent(error.message)}`
    )
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

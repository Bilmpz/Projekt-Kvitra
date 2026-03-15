'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [showSignup, setShowSignup] = useState(false)
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupMessage, setSignupMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      router.push('/dashboard')
      router.refresh()
    }

    setLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupLoading(true)
    setSignupMessage('')

    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    })

    if (error) {
      setSignupMessage(error.message)
    } else {
      setSignupMessage('Bruger oprettet. Tjek din email.')
      setTimeout(() => {
        setShowSignup(false)
      }, 1500)
    }

    setSignupLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#11182b] p-6 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4">Log ind</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            required
          />

          <input
            type="password"
            placeholder="Adgangskode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-400 py-2 font-medium text-black"
          >
            {loading ? 'Logger ind...' : 'Log ind'}
          </button>
        </form>

        {message && <p className="mt-3 text-sm text-red-300">{message}</p>}

        <button
          onClick={() => setShowSignup(true)}
          className="mt-4 w-full rounded-lg border border-white/10 py-2"
        >
          Opret konto
        </button>
      </div>

      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f172a] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Opret konto</h2>
              <button
                onClick={() => setShowSignup(false)}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
                required
              />

              <input
                type="password"
                placeholder="Adgangskode"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
                required
              />

              <button
                type="submit"
                disabled={signupLoading}
                className="w-full rounded-lg bg-green-400 py-2 font-medium text-black"
              >
                {signupLoading ? 'Opretter...' : 'Opret bruger'}
              </button>
            </form>

            {signupMessage && (
              <p className="mt-3 text-sm text-green-300">{signupMessage}</p>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
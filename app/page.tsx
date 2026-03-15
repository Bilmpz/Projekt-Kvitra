'use client'

import { useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const supabase = createClient()
  const router = useRouter()

  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginMessage, setLoginMessage] = useState('')

  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupMessage, setSignupMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    })

    if (error) {
      setLoginMessage('Kunne ikke logge ind. Tjek dine oplysninger.')
    } else {
      router.push('/dashboard')
      router.refresh()
    }

    setLoginLoading(false)
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
      setSignupMessage('Kunne ikke oprette bruger.')
    } else {
      setSignupMessage('Bruger oprettet. Tjek din email for bekræftelse.')
    }

    setSignupLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#756e64] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">


        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Velkommen til Kvitra
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
          Få overblik over hvad du bruger dine penge på. Upload dine kvitteringer,
          lad AI analysere dem, og få smarte indsigter i dit forbrug.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => {
              setShowLogin(true)
              setShowSignup(false)
            }}
            className="rounded-2xl bg-white 0 px-8 py-3 font-semibold text-black transition hover:scale-105"
          >
            Log ind
          </button>

          <button
            onClick={() => {
              setShowSignup(true)
              setShowLogin(false)
            }}
            className="rounded-2xl border border-white/20 bg-white/5 px-8 py-3 font-semibold transition hover:bg-white/10"
          >
            Opret konto
          </button>
        </div>
      </section>

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#756e64] p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Log ind</h2>
              <button
                onClick={() => setShowLogin(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#756e64] px-4 py-3 outline-none"
                required
              />

              <input
                type="password"
                placeholder="Adgangskode"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#756e64] px-4 py-3 outline-none"
                required
              />

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full rounded-xl bg-white py-3 font-semibold text-black"
              >
                {loginLoading ? 'Logger ind...' : 'Log ind'}
              </button>
            </form>

            {loginMessage && (
              <p className="mt-4 text-sm text-red-300">{loginMessage}</p>
            )}
          </div>
        </div>
      )}

      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#756e64] p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Opret konto</h2>
              <button
                onClick={() => setShowSignup(false)}
                className="text-white/60 hover:text-white"
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
                className="w-full rounded-xl border border-white/10 bg-[#756e64] px-4 py-3 outline-none"
                required
              />

              <input
                type="password"
                placeholder="Adgangskode"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#756e64] px-4 py-3 outline-none"
                required
              />

              <button
                type="submit"
                disabled={signupLoading}
                className="w-full rounded-xl bg-green-300 py-3 font-semibold text-black"
              >
                {signupLoading ? 'Opretter...' : 'Opret konto'}
              </button>
            </form>

            {signupMessage && (
              <p className="mt-4 text-sm text-green-300">{signupMessage}</p>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function UpdatePasswordPage() {
  const supabase = createClient()
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      setMessage('Kunne ikke opdatere kodeord.')
    } else {
      setMessage('Kodeord opdateret. Du kan nu logge ind.')
      setTimeout(() => {
        router.push('/')
      }, 1200)
    }

    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#7a7268] px-4 text-white">
      <div className="w-full max-w-md rounded-[28px] bg-[#f4efe8] p-6 text-[#2f2a26] shadow-2xl">
        <h1 className="text-2xl font-semibold">Nyt kodeord</h1>
        <p className="mt-2 text-sm text-[#6f665e]">
          Indtast dit nye kodeord herunder.
        </p>

        <form onSubmit={handleUpdatePassword} className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="Nyt kodeord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-[#ddd3c8] bg-white px-4 py-3 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#2f2a26] py-3.5 font-semibold text-white"
          >
            {loading ? 'Gemmer...' : 'Gem nyt kodeord'}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-[#6f665e]">{message}</p>}
      </div>
    </main>
  )
}
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

type AuthView = 'login' | 'signup' | null

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
}

export default function HomePage() {
  const supabase = createClient()
  const router = useRouter()

  const [authView, setAuthView] = useState<AuthView>(null)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginMessage, setLoginMessage] = useState('')

  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupLoading, setSignupLoading] = useState(false)
  const [signupMessage, setSignupMessage] = useState('')

  const [resetLoading, setResetLoading] = useState(false)
  const [resetMessage, setResetMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginMessage('')
    setResetMessage('')

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

  const handleResetPassword = async () => {
    setResetMessage('')
    setLoginMessage('')

    if (!loginEmail) {
      setResetMessage('Skriv din email først, så sender vi et reset-link.')
      return
    }

    setResetLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(loginEmail, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })

    if (error) {
      setResetMessage('Kunne ikke sende reset-link.')
    } else {
      setResetMessage('Vi har sendt et link til nulstilling af kodeord.')
    }

    setResetLoading(false)
  }

  const isLogin = authView === 'login'
  const isSignup = authView === 'signup'

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#7a7268] text-white">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.10),_transparent_35%)]"
          animate={{ opacity: [0.8, 1, 0.85] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-1/2 top-[-140px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-120px] right-[-60px] h-[280px] w-[280px] rounded-full bg-black/10 blur-3xl"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <section className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <motion.div
          className="w-full max-w-4xl text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-6 inline-flex items-center rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm text-white/80 backdrop-blur"
          >
            Kvitteringer, overblik og indsigt samlet ét sted
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              Få styr på dit
            </motion.span>
            <motion.span
              className="block text-white/85"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.7 }}
            >
              forbrug med Kvitra
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg"
          >
            Upload dine kvitteringer, lad AI strukturere dine køb, og få et
            klart billede af hvor dine penge faktisk bliver brugt.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ y: -2, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                setAuthView('login')
                setLoginMessage('')
                setResetMessage('')
              }}
              className="inline-flex min-w-[148px] items-center justify-center rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-[#2e2a26] shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Log ind
            </motion.button>

            <motion.button
              whileHover={{ y: -2, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                setAuthView('signup')
                setSignupMessage('')
              }}
              className="inline-flex min-w-[148px] items-center justify-center rounded-2xl border border-white/15 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Opret konto
            </motion.button>
          </motion.div>

          <motion.div
            variants={stagger}
            className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-3"
          >
            {[
              {
                title: 'Upload nemt',
                text: 'Gem dine kvitteringer ét sted uden rod i billeder og mails.',
              },
              {
                title: 'Automatisk analyse',
                text: 'Få køb kategoriseret og gjort overskuelige med AI.',
              },
              {
                title: 'Bedre overblik',
                text: 'Se mønstre i dit forbrug og tag bedre beslutninger hurtigere.',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-3xl border border-white/10 bg-white/[0.07] p-5 text-left backdrop-blur"
              >
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {authView && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAuthView(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-[28px] border border-black/5 bg-[#f4efe8] p-6 text-[#2f2a26] shadow-[0_30px_80px_rgba(0,0,0,0.28)] sm:p-7"
            >
              <button
                onClick={() => setAuthView(null)}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#6b6259] transition hover:bg-black/5 hover:text-[#2f2a26]"
                aria-label="Luk"
              >
                ✕
              </button>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.3 }}
                className="mb-6"
              >
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8c8278]">
                  Kvitra
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  {isLogin ? 'Velkommen tilbage' : 'Opret din konto'}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#6f665e]">
                  {isLogin
                    ? 'Log ind for at få adgang til dine kvitteringer og dit overblik.'
                    : 'Kom i gang med at samle og forstå dit forbrug.'}
                </p>
              </motion.div>

              <div className="mb-6 grid grid-cols-2 rounded-2xl bg-[#ebe4db] p-1">
                <button
                  type="button"
                  onClick={() => {
                    setAuthView('login')
                    setSignupMessage('')
                  }}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isLogin
                      ? 'bg-white text-[#2f2a26] shadow-sm'
                      : 'text-[#7c7268] hover:text-[#2f2a26]'
                  }`}
                >
                  Log ind
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthView('signup')
                    setLoginMessage('')
                    setResetMessage('')
                  }}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    isSignup
                      ? 'bg-white text-[#2f2a26] shadow-sm'
                      : 'text-[#7c7268] hover:text-[#2f2a26]'
                  }`}
                >
                  Opret konto
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isLogin && (
                  <motion.form
                    key="login"
                    onSubmit={handleLogin}
                    className="space-y-4"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#4f473f]">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="navn@email.dk"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full rounded-2xl border border-[#ddd3c8] bg-white px-4 py-3 text-[#2f2a26] placeholder:text-[#9a9086] outline-none transition focus:border-[#b8ab9e] focus:ring-4 focus:ring-[#d8cec3]/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#4f473f]">
                        Adgangskode
                      </label>
                      <input
                        type="password"
                        placeholder="Din adgangskode"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full rounded-2xl border border-[#ddd3c8] bg-white px-4 py-3 text-[#2f2a26] placeholder:text-[#9a9086] outline-none transition focus:border-[#b8ab9e] focus:ring-4 focus:ring-[#d8cec3]/50"
                        required
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleResetPassword}
                        disabled={resetLoading}
                        className="text-sm font-medium text-[#6f665e] transition hover:text-[#2f2a26] disabled:opacity-60"
                      >
                        {resetLoading ? 'Sender...' : 'Glemt kodeord?'}
                      </button>
                    </div>

                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={loginLoading}
                      className="w-full rounded-2xl bg-[#2f2a26] py-3.5 text-sm font-semibold text-white transition hover:bg-[#211d1a] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loginLoading ? 'Logger ind...' : 'Log ind'}
                    </motion.button>

                    <AnimatePresence mode="popLayout">
                      {loginMessage && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-sm text-red-600"
                        >
                          {loginMessage}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <AnimatePresence mode="popLayout">
                      {resetMessage && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-sm text-[#6f665e]"
                        >
                          {resetMessage}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.form>
                )}

                {isSignup && (
                  <motion.form
                    key="signup"
                    onSubmit={handleSignup}
                    className="space-y-4"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#4f473f]">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="navn@email.dk"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="w-full rounded-2xl border border-[#ddd3c8] bg-white px-4 py-3 text-[#2f2a26] placeholder:text-[#9a9086] outline-none transition focus:border-[#b8ab9e] focus:ring-4 focus:ring-[#d8cec3]/50"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#4f473f]">
                        Adgangskode
                      </label>
                      <input
                        type="password"
                        placeholder="Vælg en adgangskode"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="w-full rounded-2xl border border-[#ddd3c8] bg-white px-4 py-3 text-[#2f2a26] placeholder:text-[#9a9086] outline-none transition focus:border-[#b8ab9e] focus:ring-4 focus:ring-[#d8cec3]/50"
                        required
                      />
                    </div>

                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      disabled={signupLoading}
                      className="w-full rounded-2xl bg-[#2f2a26] py-3.5 text-sm font-semibold text-white transition hover:bg-[#211d1a] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {signupLoading ? 'Opretter konto...' : 'Opret konto'}
                    </motion.button>

                    <AnimatePresence mode="popLayout">
                      {signupMessage && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-sm text-emerald-700"
                        >
                          {signupMessage}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
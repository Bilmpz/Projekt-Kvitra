import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from './logout-button'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  return (
    <main className="min-h-screen bg-[#756e64] text-[#f5f1eb]">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-white/10 bg-[#2b2623] p-6 lg:flex">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Kvitra</h1>
            <p className="mt-2 text-sm text-[#d2c8bc]">Dit økonomiske overblik</p>
          </div>

          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block rounded-2xl bg-[#d6b98c]/15 px-4 py-3 text-sm font-medium text-[#f0d7b0]"
            >
              Dashboard
            </a>
            <a
              href="/upload"
              className="block rounded-2xl px-4 py-3 text-sm text-[#d2c8bc] transition hover:bg-white/5 hover:text-[#f5f1eb]"
            >
              Upload kvittering
            </a>
            <a
              href="/receipts"
              className="block rounded-2xl px-4 py-3 text-sm text-[#d2c8bc] transition hover:bg-white/5 hover:text-[#f5f1eb]"
            >
              Kvitteringer
            </a>
            <a
              href="/insights"
              className="block rounded-2xl px-4 py-3 text-sm text-[#d2c8bc] transition hover:bg-white/5 hover:text-[#f5f1eb]"
            >
              Indsigter
            </a>
            <a
              href="/profile"
              className="block rounded-2xl px-4 py-3 text-sm text-[#d2c8bc] transition hover:bg-white/5 hover:text-[#f5f1eb]"
            >
              Profil
            </a>
            <a
              href="/settings"
              className="block rounded-2xl px-4 py-3 text-sm text-[#d2c8bc] transition hover:bg-white/5 hover:text-[#f5f1eb]"
            >
              Indstillinger
            </a>
          </nav>

          <div className="mt-auto pt-8">
            <LogoutButton />
          </div>
        </aside>

        <section className="flex-1 p-6 lg:p-10">
          <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#2b2623] p-6 shadow-lg lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Dit overblik</h2>
              <p className="mt-2 text-[#d2c8bc]">
                Velkommen tilbage{user.email ? `, ${user.email}` : ''}.
              </p>
            </div>

            <div className="rounded-2xl border border-[#d6b98c]/20 bg-[#d6b98c]/10 px-4 py-2 text-sm text-[#f0d7b0]">
              Data hentes her senere
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-[#2b2623] p-6">
              <p className="text-sm text-[#d2c8bc]">Samlet forbrug</p>
              <h3 className="mt-3 text-3xl font-bold">—</h3>
              <p className="mt-2 text-sm text-[#d2c8bc]">Ingen data endnu</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#2b2623] p-6">
              <p className="text-sm text-[#d2c8bc]">Mest brugte kategori</p>
              <h3 className="mt-3 text-3xl font-bold">—</h3>
              <p className="mt-2 text-sm text-[#d2c8bc]">Ingen data endnu</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#2b2623] p-6">
              <p className="text-sm text-[#d2c8bc]">Uploadede kvitteringer</p>
              <h3 className="mt-3 text-3xl font-bold">—</h3>
              <p className="mt-2 text-sm text-[#d2c8bc]">Ingen data endnu</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#2b2623] p-6">
              <p className="text-sm text-[#d2c8bc]">AI indsigt</p>
              <h3 className="mt-3 text-xl font-semibold">—</h3>
              <p className="mt-2 text-sm text-[#d2c8bc]">Ingen data endnu</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[#2b2623] p-6 xl:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Forbrug</h3>
                  <p className="text-sm text-[#d2c8bc]">
                    Graf og udvikling vises her, når data er tilgængelig
                  </p>
                </div>
              </div>

              <div className="flex h-72 items-center justify-center rounded-2xl bg-[#3a342f]">
                <p className="text-sm text-[#d2c8bc]">
                  Ingen data endnu
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#2b2623] p-6">
              <h3 className="text-xl font-bold">Seneste kvitteringer</h3>

              <div className="mt-6 flex min-h-[288px] items-center justify-center rounded-2xl bg-[#3a342f] p-6 text-center">
                <p className="text-sm text-[#d2c8bc]">
                  Ingen kvitteringer endnu
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#2b2623] p-6">
              <h3 className="text-xl font-bold">Kategori-fordeling</h3>

              <div className="mt-6 flex min-h-[220px] items-center justify-center rounded-2xl bg-[#3a342f] p-6 text-center">
                <p className="text-sm text-[#d2c8bc]">
                  Fordeling vises her, når udgifter er registreret
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#2b2623] p-6">
              <h3 className="text-xl font-bold">AI indsigt</h3>

              <div className="mt-6 rounded-2xl border border-[#d6b98c]/20 bg-[#d6b98c]/10 p-5">
                <p className="text-sm leading-7 text-[#f5f1eb]">
                  AI-baserede indsigter vises her, når der er tilknyttet nok data.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
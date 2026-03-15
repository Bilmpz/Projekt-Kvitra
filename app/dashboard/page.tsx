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
    <main className="min-h-screen bg-[#756e64] text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-72 flex-col border-r border-white/10 bg-[#0d1324] p-6 lg:flex">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Kvitra</h1>
            <p className="mt-2 text-sm text-white/60">Dit økonomiske overblik</p>
          </div>

          <nav className="space-y-2">
            <a
              href="/dashboard"
              className="block rounded-2xl bg-cyan-400/20 px-4 py-3 text-sm font-medium text-cyan-300"
            >
              Dashboard
            </a>
            <a
              href="/upload"
              className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              Upload kvittering
            </a>
            <a
              href="/receipts"
              className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              Kvitteringer
            </a>
            <a
              href="/insights"
              className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              Indsigter
            </a>
            <a
              href="/profile"
              className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              Profil
            </a>
            <a
              href="/settings"
              className="block rounded-2xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              Indstillinger
            </a>
          </nav>

          <div className="mt-auto pt-8">
            <LogoutButton />
          </div>
        </aside>

        {/* Indhold */}
        <section className="flex-1 p-6 lg:p-10">
          {/* Topbar */}
          <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#0d1324]/90 p-6 shadow-[0_0_40px_rgba(0,0,0,0.15)] lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Dit overblik</h2>
              <p className="mt-2 text-white/70">
                Velkommen tilbage{user.email ? `, ${user.email}` : ''}.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10">
                Søg
              </button>
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                Måned: April
              </div>
            </div>
          </div>

          {/* Kort */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-[#0d1324] p-6 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
              <p className="text-sm text-white/60">Samlet forbrug</p>
              <h3 className="mt-3 text-3xl font-bold">4.280 kr</h3>
              <p className="mt-2 text-sm text-red-300">+12% siden sidste måned</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0d1324] p-6">
              <p className="text-sm text-white/60">Mest brugte kategori</p>
              <h3 className="mt-3 text-3xl font-bold">Takeaway</h3>
              <p className="mt-2 text-sm text-white/60">1.240 kr denne måned</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0d1324] p-6">
              <p className="text-sm text-white/60">Uploadede kvitteringer</p>
              <h3 className="mt-3 text-3xl font-bold">18</h3>
              <p className="mt-2 text-sm text-green-300">+4 siden sidste uge</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0d1324] p-6">
              <p className="text-sm text-white/60">AI indsigt</p>
              <h3 className="mt-3 text-xl font-semibold">Du bruger mest torsdag-lørdag</h3>
              <p className="mt-2 text-sm text-white/60">Baseret på dine seneste køb</p>
            </div>
          </div>

          {/* Sektioner */}
          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[#0d1324] p-6 xl:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Forbrug denne måned</h3>
                  <p className="text-sm text-white/60">Oversigt over dine udgifter</p>
                </div>
                <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:bg-white/10">
                  Se detaljer
                </button>
              </div>

              <div className="flex h-72 items-end gap-4 rounded-2xl bg-white/5 p-6">
                <div className="flex w-full items-end justify-between gap-3">
                  <div className="w-full rounded-t-2xl bg-cyan-400/80" style={{ height: '45%' }} />
                  <div className="w-full rounded-t-2xl bg-cyan-400/60" style={{ height: '70%' }} />
                  <div className="w-full rounded-t-2xl bg-cyan-400/40" style={{ height: '38%' }} />
                  <div className="w-full rounded-t-2xl bg-cyan-400/90" style={{ height: '82%' }} />
                  <div className="w-full rounded-t-2xl bg-cyan-400/50" style={{ height: '58%' }} />
                  <div className="w-full rounded-t-2xl bg-cyan-400/70" style={{ height: '66%' }} />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0d1324] p-6">
              <h3 className="text-xl font-bold">Seneste kvitteringer</h3>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="font-medium">Netto</p>
                  <p className="text-sm text-white/60">124 kr • Dagligvarer</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="font-medium">McDonald’s</p>
                  <p className="text-sm text-white/60">89 kr • Takeaway</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="font-medium">DSB</p>
                  <p className="text-sm text-white/60">56 kr • Transport</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nederste række */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#0d1324] p-6">
              <h3 className="text-xl font-bold">Kategori-fordeling</h3>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Takeaway</span>
                    <span>32%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10">
                    <div className="h-3 w-[32%] rounded-full bg-cyan-400" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Dagligvarer</span>
                    <span>24%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10">
                    <div className="h-3 w-[24%] rounded-full bg-cyan-300" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Transport</span>
                    <span>18%</span>
                  </div>
                  <div className="h-3 rounded-full bg-white/10">
                    <div className="h-3 w-[18%] rounded-full bg-cyan-200" />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0d1324] p-6">
              <h3 className="text-xl font-bold">AI indsigt</h3>
              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                <p className="text-sm leading-7 text-white/85">
                  Du bruger mest på takeaway mellem torsdag og lørdag. Dit forbrug
                  på mad ligger over dit gennemsnit for resten af måneden.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
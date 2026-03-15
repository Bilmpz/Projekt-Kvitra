import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

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
            <p className="mt-2 text-sm text-[#d2c8bc]">
              Upload kvitering
            </p>
          </div>

          <Link
            href="/dashboard"
            className="mt-auto pt-2 nline-flex w-fit items-center rounded-lg bg-[#f5f1eb] px-4 py-2 text-sm font-medium text-[#2b2623] transition hover:bg-white"
          >
            Tilbage
          </Link>
        </aside>
      </div>
    </main>
  )
}
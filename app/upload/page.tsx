import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/app/components/Sidebar'
import UploadForm from './upload-form'

export default async function UploadPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/')

  return (
    <main className="min-h-screen bg-[#756e64] text-[#f5f1eb]">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="flex-1 p-6 lg:p-10">
          <div className="mb-8 rounded-3xl border border-white/10 bg-[#2b2623] p-6 shadow-lg">
            <h2 className="text-3xl font-bold">Upload kvittering</h2>
            <p className="mt-2 text-[#d2c8bc]">
              Upload et billede eller PDF af din kvittering — AI analyserer den automatisk
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#2b2623] p-8">
            <UploadForm userId={user.id} />
          </div>
        </section>
      </div>
    </main>
  )
}

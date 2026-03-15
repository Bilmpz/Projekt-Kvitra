import LogoutButton from "./logout-button"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#756e64] p-10 text-white">
      <h1 className="text-3xl font-bold">Dit overblik!</h1>
      <p className="mt-4 text-white/70">Du er logget ind i Kvitra.</p>

      <div className="mt-6">



        <div className="flex flex-1"><LogoutButton/></div>
        
      </div>
    </main>
  )
}
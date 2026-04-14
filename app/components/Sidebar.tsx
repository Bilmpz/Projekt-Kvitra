'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from '@/app/dashboard/logout-button'

const nav = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/upload', label: 'Upload kvittering' },
  { href: '/receipts', label: 'Kvitteringer' },
  { href: '/insights', label: 'Indsigter' },
  { href: '/profile', label: 'Profil' },
  { href: '/settings', label: 'Indstillinger' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-72 flex-col border-r border-white/10 bg-[#2b2623] p-6 lg:flex">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Kvitra</h1>
        <p className="mt-2 text-sm text-[#d2c8bc]">Dit økonomiske overblik</p>
      </div>

      <nav className="space-y-2">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
              pathname === item.href
                ? 'bg-[#d6b98c]/15 text-[#f0d7b0]'
                : 'text-[#d2c8bc] hover:bg-white/5 hover:text-[#f5f1eb]'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <LogoutButton />
      </div>
    </aside>
  )
}

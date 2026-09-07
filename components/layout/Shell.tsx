'use client'

import type { ReactNode } from 'react'
import { Bell, ChevronDown, MapPin, Menu } from 'lucide-react'
import { farmer } from '@/lib/mock-data'
import type { AppRouter } from '@/lib/navigation'
import { MobileNav } from '@/components/layout/MobileNav'
import { Sidebar } from '@/components/layout/Sidebar'

export function Shell({
  children,
  pathname,
  router,
}: {
  children: ReactNode
  pathname: string
  router: AppRouter
}) {
  return (
    <div className="app-shell">
      <Sidebar pathname={pathname} router={router} />
      <main className="main-content">
        <header className="topbar">
          <button type="button" className="menu-button" aria-label="Open menu">
            <Menu />
          </button>
          <div className="location">
            <MapPin />
            <span>{farmer.location}</span>
            <ChevronDown />
          </div>
          <button type="button" className="icon-button" aria-label="Notifications">
            <Bell />
            <i />
          </button>
        </header>
        {children}
      </main>
      <MobileNav pathname={pathname} router={router} />
    </div>
  )
}

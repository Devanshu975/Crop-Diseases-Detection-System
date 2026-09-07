'use client'

import { go, isNavActive, type AppRouter } from '@/lib/navigation'
import { mobileNavPaths, navItems } from '@/components/layout/Sidebar'

export function MobileNav({ pathname, router }: { pathname: string; router: AppRouter }) {
  const items = navItems.filter((item) => mobileNavPaths.includes(item.path))
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {items.map((item) => {
        const Icon = item.icon
        const active = isNavActive(pathname, item.path)
        const label = item.label === 'Dashboard' ? 'Home' : item.label.replace(' Crop', '')
        return (
          <button
            key={item.path}
            type="button"
            className={active ? 'mobile-item active' : 'mobile-item'}
            aria-current={active ? 'page' : undefined}
            onClick={() => go(router, item.path)}
          >
            <Icon />
            <span>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}

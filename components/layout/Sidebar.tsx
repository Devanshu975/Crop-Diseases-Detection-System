'use client'

import {
  Activity,
  ChevronDown,
  CircleHelp,
  History,
  Home,
  Leaf,
  MoreHorizontal,
  ScanLine,
  Settings,
  Sprout,
  SunMedium,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { farmer } from '@/lib/mock-data'
import { go, isNavActive, type AppRouter } from '@/lib/navigation'

export interface NavItemConfig {
  label: string
  path: string
  icon: LucideIcon
}

export const navItems: NavItemConfig[] = [
  { label: 'Dashboard', path: '/dashboard', icon: Home },
  { label: 'Check Crop', path: '/check-crop', icon: ScanLine },
  { label: 'Weather', path: '/weather', icon: SunMedium },
  { label: 'Risk Analysis', path: '/risk', icon: Activity },
  { label: 'History', path: '/history', icon: History },
  { label: 'My Farms', path: '/farms', icon: Sprout },
  { label: 'Profile', path: '/profile', icon: UserRound },
]

export const mobileNavPaths = ['/dashboard', '/check-crop', '/weather', '/history', '/profile']

export function Sidebar({ pathname, router }: { pathname: string; router: AppRouter }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">
          <Leaf />
        </span>
        <span>
          Crop Health<small>ASSISTANT</small>
        </span>
      </div>
      <div className="farm-mini">
        <div className="avatar">{farmer.initials}</div>
        <div>
          <strong>{farmer.name}</strong>
          <span>{farmer.location}</span>
        </div>
        <ChevronDown />
      </div>
      <nav aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isNavActive(pathname, item.path)
          return (
            <button
              key={item.path}
              type="button"
              className={active ? 'nav-item active' : 'nav-item'}
              aria-current={active ? 'page' : undefined}
              onClick={() => go(router, item.path)}
            >
              <Icon />
              {item.label}
            </button>
          )
        })}
      </nav>
      <div className="sidebar-bottom">
        <button type="button" className="nav-item">
          <CircleHelp /> Help Center
        </button>
        <button type="button" className="nav-item">
          <Settings /> Settings
        </button>
        <div className="profile-row">
          <div className="avatar small">{farmer.initials}</div>
          <div>
            <strong>{farmer.name}</strong>
            <span>{farmer.accountType}</span>
          </div>
          <MoreHorizontal />
        </div>
      </div>
    </aside>
  )
}

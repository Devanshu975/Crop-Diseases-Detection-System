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
import { useFarmer } from '@/context/FarmerContext'
import { translations, type SupportedLanguage } from '@/lib/translations'

import { go, isNavActive, type AppRouter } from '@/lib/navigation'

export interface NavItemConfig {
  key: string
  label: string
  path: string
  icon: LucideIcon
}

export const navItems: NavItemConfig[] = [
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: Home },
  { key: 'checkCrop', label: 'Check Crop', path: '/check-crop', icon: ScanLine },
  { key: 'weather', label: 'Weather', path: '/weather', icon: SunMedium },
  { key: 'riskAnalysis', label: 'Risk Analysis', path: '/risk', icon: Activity },
  { key: 'history', label: 'History', path: '/history', icon: History },
  { key: 'myFarms', label: 'My Farms', path: '/farms', icon: Sprout },
  { key: 'profile', label: 'Profile', path: '/profile', icon: UserRound },
]

// Export alias to ensure Turbopack/Next.js resolves whichever name is requested
export const navItemsConfig = navItems

export const mobileNavPaths = ['/dashboard', '/check-crop', '/weather', '/history', '/profile']

export function Sidebar({ pathname, router }: { pathname: string; router: AppRouter }) {
  const { farmer } = useFarmer()

  const langKey = (farmer.language && farmer.language in translations)
    ? (farmer.language as SupportedLanguage)
    : 'en'

  const t = translations[langKey] || translations.en

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
          const label = t[item.key] || item.label

          return (
            <button
              key={item.path}
              type="button"
              className={active ? 'nav-item active' : 'nav-item'}
              aria-current={active ? 'page' : undefined}
              onClick={() => go(router, item.path)}
            >
              <Icon />
              {label}
            </button>
          )
        })}
      </nav>

      <div className="sidebar-bottom">
        <button 
          type="button" 
          className="nav-item"
          onClick={() => go(router, '/help')}
        >
          <CircleHelp /> {t.helpCenter || 'Help Center'}
        </button>
        <button 
          type="button" 
          className="nav-item"
          onClick={() => go(router, '/profile')}
        >
          <Settings /> {t.settings || 'Settings'}
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
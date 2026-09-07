import type { useRouter } from 'next/navigation'

export type AppRouter = ReturnType<typeof useRouter>

export function go(router: AppRouter, path: string) {
  router.push(path)
}

export function normalizePath(pathname: string): string {
  if (!pathname) return '/dashboard'
  const clean = pathname.split('?')[0].split('#')[0]
  if (clean.length > 1 && clean.endsWith('/')) {
    return clean.slice(0, -1)
  }
  return clean
}

export function isCheckCropPath(pathname: string) {
  const norm = normalizePath(pathname)
  return norm === '/check-crop' || norm.startsWith('/check-crop/')
}

export function isNavActive(pathname: string, path: string) {
  const norm = normalizePath(pathname)
  if (path === '/dashboard') {
    return norm === '/' || norm === '/dashboard'
  }
  if (path === '/check-crop') {
    return isCheckCropPath(norm)
  }
  return norm === path
}

export function screenFromPath(pathname: string) {
  const norm = normalizePath(pathname)
  if (norm === '/' || norm === '/dashboard') return 'dashboard' as const
  if (norm === '/check-crop/analyzing') {
    return 'check-crop-analyzing' as const
  }
  if (norm === '/check-crop/result') {
    return 'check-crop-result' as const
  }
  if (norm === '/check-crop') return 'check-crop' as const
  if (norm === '/risk') return 'risk' as const
  if (norm === '/weather') return 'weather' as const
  if (norm === '/history') return 'history' as const
  if (norm === '/farms/1' || norm.startsWith('/farms/')) return 'farm-details' as const
  if (norm === '/farms') return 'farms' as const
  if (norm === '/advisory') return 'advisory' as const
  if (norm === '/profile') return 'profile' as const
  return 'dashboard' as const
}

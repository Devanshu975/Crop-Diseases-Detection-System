'use client'

import {
  Activity,
  ScanLine,
  Sprout,
  SunMedium,
} from 'lucide-react'

import {
  go,
  type AppRouter,
} from '@/lib/navigation'

export function QuickActions({
  router,
}: {
  router: AppRouter
}) {
  return (
    <section className="quick-actions">

      <button
        type="button"
        onClick={() =>
          go(router, '/check-crop')
        }
      >
        <ScanLine />
        <span>Check crop</span>
      </button>

      <button
        type="button"
        onClick={() =>
          go(router, '/weather')
        }
      >
        <SunMedium />
        <span>Weather</span>
      </button>

      <button
        type="button"
        onClick={() =>
          go(router, '/risk')
        }
      >
        <Activity />
        <span>Risk</span>
      </button>

      <button
        type="button"
        onClick={() =>
          go(router, '/farms')
        }
      >
        <Sprout />
        <span>My farms</span>
      </button>

    </section>
  )
}
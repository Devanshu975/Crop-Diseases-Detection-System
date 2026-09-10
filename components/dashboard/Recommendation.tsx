'use client'

import { ArrowRight, Sprout } from 'lucide-react'
import { go, type AppRouter } from '@/lib/navigation'
import type { RiskSummary } from '@/lib/dashboard-api'

export function Recommendation({
  router,
  risk,
}: {
  router: AppRouter
  risk: RiskSummary | null
}) {
  return (
    <section className="card recommendation">
      <div className="recommendation-icon">
        <Sprout />
      </div>
      <div>
        <p className="eyebrow">RECOMMENDED ACTION</p>
        <h3>{risk?.recommendation ? 'Based on your latest check' : 'Complete a crop check'}</h3>
        <p>
          {risk?.recommendation ||
            'Upload a crop image so CropShield can combine disease detection with environmental risk.'}
        </p>
        <button type="button" className="text-button" onClick={() => go(router, '/advisory')}>
          View full advisory <ArrowRight />
        </button>
      </div>
    </section>
  )
}

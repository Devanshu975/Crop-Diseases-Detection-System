'use client'

import { ArrowRight, Sprout } from 'lucide-react'
import { dashboardRecommendation } from '@/lib/mock-data'
import { go, type AppRouter } from '@/lib/navigation'

export function Recommendation({ router }: { router: AppRouter }) {
  return (
    <section className="card recommendation">
      <div className="recommendation-icon">
        <Sprout />
      </div>
      <div>
        <p className="eyebrow">RECOMMENDED ACTION</p>
        <h3>{dashboardRecommendation.title}</h3>
        <p>{dashboardRecommendation.copy}</p>
        <button type="button" className="text-button" onClick={() => go(router, '/advisory')}>
          View full advisory <ArrowRight />
        </button>
      </div>
    </section>
  )
}

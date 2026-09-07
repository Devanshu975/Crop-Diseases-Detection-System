'use client'

import { ArrowRight, Check } from 'lucide-react'
import { currentFarm } from '@/lib/mock-data'
import { go, type AppRouter } from '@/lib/navigation'

export function HealthCard({ router }: { router: AppRouter }) {
  return (
    <section className="card health-card">
      <div className="card-heading">
        <div>
          <p className="eyebrow">CURRENT CROP HEALTH</p>
          <h2>Healthy</h2>
          <p className="card-copy">{currentFarm.healthSummary}</p>
        </div>
        <span className="status-icon healthy" aria-label="Healthy">
          <Check />
        </span>
      </div>
      <div className="health-meter">
        <div className="meter-fill" />
        <span>HEALTHY</span>
      </div>
      <div className="card-footer">
        <span>{currentFarm.healthUpdated}</span>
        <button type="button" className="text-button" onClick={() => go(router, '/farms/1')}>
          View farm <ArrowRight />
        </button>
      </div>
    </section>
  )
}

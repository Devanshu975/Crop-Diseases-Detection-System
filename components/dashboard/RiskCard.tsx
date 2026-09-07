'use client'

import { AlertTriangle, ArrowRight, CloudRain, Droplets, Thermometer } from 'lucide-react'
import { diseaseRisk } from '@/lib/mock-data'
import { go, type AppRouter } from '@/lib/navigation'
import { StatusBadge } from '@/components/ui/status-badge'

export function RiskCard({ router }: { router: AppRouter }) {
  return (
    <section className="card risk-card">
      <div className="risk-top">
        <div className="risk-icon">
          <AlertTriangle />
        </div>
        <div>
          <p className="eyebrow">UPCOMING DISEASE RISK</p>
          <h2>{diseaseRisk.levelLabel}</h2>
        </div>
        <StatusBadge tone="red">{diseaseRisk.levelLabel}</StatusBadge>
      </div>
      <p className="card-copy">{diseaseRisk.cardCopy}</p>
      <div className="risk-score">
        <strong>{diseaseRisk.score}%</strong>
        <span>risk score</span>
        <div className="score-track">
          <div />
        </div>
      </div>
      <div className="factor-row">
        <span>
          <Droplets /> {diseaseRisk.factorChips[0]}
        </span>
        <span>
          <CloudRain /> {diseaseRisk.factorChips[1]}
        </span>
        <span>
          <Thermometer /> {diseaseRisk.factorChips[2]}
        </span>
      </div>
      <button type="button" className="outline-action" onClick={() => go(router, '/risk')}>
        View risk analysis <ArrowRight />
      </button>
    </section>
  )
}

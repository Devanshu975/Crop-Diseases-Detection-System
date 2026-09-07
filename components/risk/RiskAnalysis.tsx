'use client'

import { AlertTriangle, ArrowRight, ChevronDown, CloudRain, Droplets, Thermometer } from 'lucide-react'
import { currentFarm, diseaseRisk } from '@/lib/mock-data'
import { go, type AppRouter } from '@/lib/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'
import type { RiskFactorIcon } from '@/lib/types'

const factorIcons: Record<RiskFactorIcon, typeof Droplets> = {
  humidity: Droplets,
  rainfall: CloudRain,
  temperature: Thermometer,
}

export function RiskAnalysis({ router }: { router: AppRouter }) {
  return (
    <>
      <PageHeader
        eyebrow="WEATHER INTELLIGENCE"
        title="Crop risk analysis"
        subtitle="Understand what is affecting your wheat crop today."
        action={
          <button type="button" className="select-pill">
            {currentFarm.name} <ChevronDown />
          </button>
        }
      />
      <div className="risk-page-grid">
        <section className="card big-risk">
          <div className="big-risk-label">
            <span className="risk-icon">
              <AlertTriangle />
            </span>
            <div>
              <p className="eyebrow">CURRENT RISK</p>
              <h2>{diseaseRisk.heading}</h2>
            </div>
          </div>
          <div className="big-score">
            {diseaseRisk.score}
            <span>%</span>
          </div>
          <p>{diseaseRisk.summary}</p>
          <div className="score-track">
            <div />
          </div>
        </section>
        <section className="card factors">
          <div className="section-heading">
            <div>
              <p className="eyebrow">RISK FACTORS</p>
              <h2>What&apos;s influencing risk</h2>
            </div>
          </div>
          {diseaseRisk.factors.map((factor) => {
            const Icon = factorIcons[factor.icon]
            return (
              <div className="factor-card" key={factor.name}>
                <span className="factor-icon">
                  <Icon />
                </span>
                <div>
                  <strong>{factor.name}</strong>
                  <p>{factor.copy}</p>
                </div>
                <div className="factor-value">
                  <b>{factor.value}</b>
                  <StatusBadge tone={factor.tone}>{factor.status}</StatusBadge>
                </div>
              </div>
            )
          })}
        </section>
        <section className="card trend">
          <div className="section-heading">
            <div>
              <p className="eyebrow">RISK TREND</p>
              <h2>Last 7 days</h2>
            </div>
            <StatusBadge tone="red">{diseaseRisk.trendLabel}</StatusBadge>
          </div>
          <div className="trend-chart">
            {diseaseRisk.trend.map((point) => (
              <div key={point.day}>
                <div
                  className={`bar ${point.level === 'High' ? 'high' : point.level === 'Med' ? 'medium' : ''}`}
                  style={{ height: `${point.height}%` }}
                />
                <small>{point.day}</small>
                <em>{point.level}</em>
              </div>
            ))}
          </div>
        </section>
        <section className="card why-risk">
          <p className="eyebrow">WHY THIS RISK?</p>
          <h2>{diseaseRisk.whyTitle}</h2>
          <p>{diseaseRisk.whyCopy}</p>
          <Button className="primary-button" onClick={() => go(router, '/advisory')}>
            View advisory <ArrowRight data-icon="inline-end" />
          </Button>
        </section>
      </div>
    </>
  )
}

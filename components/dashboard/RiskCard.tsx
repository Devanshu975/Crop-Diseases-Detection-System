'use client'

import {
  AlertTriangle,
  ArrowRight,
  CloudRain,
  Droplets,
  Thermometer,
} from 'lucide-react'

import { go, type AppRouter } from '@/lib/navigation'

import { StatusBadge } from '@/components/ui/status-badge'

import type {
  RiskSummary,
} from '@/lib/dashboard-api'

export function RiskCard({
  router,
  loading,
  risk,
  stats,
}: {
  router: AppRouter
  loading: boolean
  risk: RiskSummary | null
  stats: {
    total: number
    healthy: number
    diseased: number
    highRisk: number
  }
}) {
  const level =
    risk?.risk_level ||
    'No risk data'

  const rawScore =
    Number(risk?.risk_score) || 0

  const score =
    rawScore <= 1
      ? rawScore * 100
      : rawScore

  const safeScore =
    Math.max(
      0,
      Math.min(100, score),
    )

  const tone =
    level === 'High Risk'
      ? 'red'
      : level === 'Medium Risk'
        ? 'amber'
        : 'green'

  return (
    <section className="card risk-card">

      <div className="risk-top">

        <div className="risk-icon">
          <AlertTriangle />
        </div>

        <div>

          <p className="eyebrow">
            LATEST DISEASE RISK
          </p>

          <h2>
            {loading
              ? 'Loading...'
              : level}
          </h2>

        </div>

        <StatusBadge tone={tone}>
          {loading
            ? 'Loading'
            : level}
        </StatusBadge>

      </div>

      <p className="card-copy">

        {risk?.recommendation ||
          'Complete a crop check to calculate environmental disease risk.'}

      </p>

      <div className="risk-score">

        <strong>
          {safeScore.toFixed(0)}%
        </strong>

        <span>
          risk score
        </span>

        <div className="score-track">

          <div
            style={{
              width: `${safeScore}%`,
            }}
          />

        </div>

      </div>

      <div className="factor-row">

        <span>
          <Droplets />

          {risk
            ? 'Humidity included'
            : 'Humidity —'}
        </span>

        <span>
          <CloudRain />

          {stats.total} scans
        </span>

        <span>
          <Thermometer />

          {stats.diseased} detected
        </span>

      </div>

      <button
        type="button"
        className="outline-action"
        onClick={() =>
          go(router, '/risk')
        }
      >
        View risk analysis
        <ArrowRight />
      </button>

    </section>
  )
}
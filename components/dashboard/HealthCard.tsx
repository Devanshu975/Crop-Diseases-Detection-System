'use client'

import { ArrowRight, Check } from 'lucide-react'

import { go, type AppRouter } from '@/lib/navigation'

import type {
  RiskSummary,
  Scan,
} from '@/lib/dashboard-api'

export function HealthCard({
  router,
  loading,
  scans,
  latestRisk,
}: {
  router: AppRouter
  loading: boolean
  scans: Scan[]
  latestRisk: RiskSummary | null
}) {
  const disease =
    latestRisk?.disease ||
    scans[0]?.disease

  const healthy =
    disease?.toLowerCase() === 'healthy'

  const status = !disease
    ? 'No scan yet'
    : healthy
      ? 'Healthy'
      : latestRisk?.overall_status ||
        'Needs attention'

  const summary = !disease
    ? 'Run your first crop check to see real health information here.'
    : healthy
      ? 'The latest AI check found no disease in the crop image.'
      : `Latest detection: ${disease}. Review the risk and recommendation below.`

  return (
    <section className="card health-card">

      <div className="card-heading">

        <div>
          <p className="eyebrow">
            CURRENT CROP HEALTH
          </p>

          <h2>
            {loading
              ? 'Loading...'
              : status}
          </h2>

          <p className="card-copy">
            {summary}
          </p>
        </div>

        <span
          className={`status-icon ${
            healthy
              ? 'healthy'
              : 'warning'
          }`}
          aria-label={status}
        >
          <Check />
        </span>

      </div>

      <div className="health-meter">

        <div
          className="meter-fill"
          style={{
            width:
              healthy
                ? '100%'
                : disease
                  ? '55%'
                  : '0%',
          }}
        />

        <span>
          {healthy
            ? 'HEALTHY'
            : disease
              ? 'MONITOR'
              : 'NO DATA'}
        </span>

      </div>

      <div className="card-footer">

        <span>
          {scans.length}{' '}
          {scans.length === 1
            ? 'scan'
            : 'scans'}{' '}
          recorded
        </span>

        <button
          type="button"
          className="text-button"
          onClick={() =>
            go(router, '/history')
          }
        >
          View history
          <ArrowRight />
        </button>

      </div>

    </section>
  )
}
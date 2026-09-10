'use client'

import { ArrowRight, Leaf } from 'lucide-react'

import { go, type AppRouter } from '@/lib/navigation'

import { StatusBadge } from '@/components/ui/status-badge'

import {
  confidencePercent,
  formatDate,
  type RiskSummary,
  type Scan,
} from '@/lib/dashboard-api'

export function LatestCropCheck({
  router,
  loading,
  scan,
  risk,
}: {
  router: AppRouter
  loading: boolean
  scan: Scan | null
  risk: RiskSummary | null
}) {
  if (loading) {
    return (
      <section className="card latest-check">

        <div className="section-heading">

          <div>
            <p className="eyebrow">
              LATEST CROP CHECK
            </p>

            <h2>
              Loading...
            </h2>
          </div>

        </div>

      </section>
    )
  }

  if (!scan) {
    return (
      <section className="card latest-check">

        <div className="section-heading">

          <div>
            <p className="eyebrow">
              LATEST CROP CHECK
            </p>

            <h2>
              No crop checks yet
            </h2>
          </div>

          <StatusBadge tone="amber">
            No data
          </StatusBadge>

        </div>

        <p className="card-copy">
          Your latest disease detection will appear here after you analyze a crop.
        </p>

      </section>
    )
  }

  const confidence =
    confidencePercent(
      Number(scan.confidence) || 0,
    )

  const healthy =
    scan.disease?.toLowerCase() ===
    'healthy'

  return (
    <section className="card latest-check">

      <div className="section-heading">

        <div>

          <p className="eyebrow">
            LATEST CROP CHECK
          </p>

          <h2>
            {scan.crop || 'Crop'} detection
          </h2>

        </div>

        <StatusBadge
          tone={
            healthy
              ? 'green'
              : 'amber'
          }
        >
          {healthy
            ? 'Healthy'
            : 'Detected'}
        </StatusBadge>

      </div>

      <div className="latest-check-body">

        <div
          className="latest-image"
          role="img"
          aria-label={`Image from latest ${
            scan.crop || 'crop'
          } check`}
          style={
            scan.image_url
              ? {
                  backgroundImage: `url("${scan.image_url}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined
          }
        >
          {!scan.image_url && (
            <Leaf />
          )}
        </div>

        <div className="latest-details">

          <h3>
            {scan.disease}
          </h3>

          <p>
            {risk?.overall_status ||
              'Analysis was saved successfully. Open the result for more details.'}
          </p>

          <div className="latest-meta">

            <span>
              <strong>
                {confidence.toFixed(1)}%
              </strong>

              <small>
                Confidence
              </small>
            </span>

            <span>
              <strong>
                {risk?.risk_level || '—'}
              </strong>

              <small>
                Risk
              </small>
            </span>

            <span>
              <strong>
                {formatDate(
                  scan.created_at,
                )}
              </strong>

              <small>
                Checked
              </small>
            </span>

          </div>

          <button
            type="button"
            className="text-button"
            onClick={() =>
              go(
                router,
                '/check-crop/result',
              )
            }
          >
            View result
            <ArrowRight />
          </button>

        </div>

      </div>

    </section>
  )
}
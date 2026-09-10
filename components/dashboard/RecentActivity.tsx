'use client'

import { ArrowRight } from 'lucide-react'

import {
  go,
  type AppRouter,
} from '@/lib/navigation'

import {
  confidencePercent,
  formatDate,
  type Scan,
} from '@/lib/dashboard-api'

export function RecentActivity({
  router,
  loading,
  scans,
}: {
  router: AppRouter
  loading: boolean
  scans: Scan[]
}) {
  return (
    <section className="card recent">

      <div className="section-heading">

        <div>

          <p className="eyebrow">
            RECENT ACTIVITY
          </p>

          <h2>
            Latest crop checks
          </h2>

        </div>

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

      {loading ? (

        <p className="card-copy">
          Loading real scan history...
        </p>

      ) : scans.length === 0 ? (

        <p className="card-copy">
          No scans have been recorded yet.
        </p>

      ) : (

        scans
          .slice(0, 5)
          .map((item) => (

            <button
              type="button"
              className="history-row"
              key={item.id}
              onClick={() =>
                go(router, '/history')
              }
            >

              <span className="crop-emoji">
                🌱
              </span>

              <span className="history-main">

                <strong>
                  {item.disease}
                </strong>

                <small>
                  {formatDate(
                    item.created_at,
                  )}{' '}
                  · {item.crop}
                </small>

              </span>

              <span className="history-confidence">

                <strong>
                  {confidencePercent(
                    Number(item.confidence) || 0,
                  ).toFixed(1)}
                  %
                </strong>

                <small>
                  confidence
                </small>

              </span>

              <ArrowRight />

            </button>

          ))

      )}

    </section>
  )
}
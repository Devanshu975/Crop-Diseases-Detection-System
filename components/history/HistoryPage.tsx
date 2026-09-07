'use client'

import { useEffect, useState } from 'react'

import {
  ArrowRight,
  ChevronDown,
  Plus,
} from 'lucide-react'

import { go, type AppRouter } from '@/lib/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://127.0.0.1:8000'

type HistoryItem = {
  id: number
  crop: string
  image_url?: string
  disease: string
  confidence: number
  created_at?: string

  risk_level?: string
  risk_score?: number
  recommendation?: string
}

export function HistoryPage({
  router,
}: {
  router: AppRouter
}) {
  const [historyItems, setHistoryItems] =
    useState<HistoryItem[]>([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    loadHistory()
  }, [])

  async function loadHistory() {
    try {
      setLoading(true)
      setError(null)

      // --------------------------------------------------
      // GET ALL SCANS
      // --------------------------------------------------

      const response = await fetch(
        `${API_BASE_URL}/scan-history`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      )

      if (!response.ok) {
        throw new Error(
          `History request failed: ${response.status}`
        )
      }

      const data = await response.json()

      if (data.status !== 'success') {
        throw new Error(
          data.message ||
            'Unable to load crop history.'
        )
      }

      const scans = data.data || []

      // --------------------------------------------------
      // GET RISK INFORMATION FOR EACH SCAN
      // --------------------------------------------------

      const historyWithRisk =
        await Promise.all(
          scans.map(
            async (scan: HistoryItem) => {
              try {
                const riskResponse =
                  await fetch(
                    `${API_BASE_URL}/analysis-summary?scan_id=${scan.id}`,
                    {
                      method: 'GET',
                      cache: 'no-store',
                    }
                  )

                if (!riskResponse.ok) {
                  return scan
                }

                const riskData =
                  await riskResponse.json()

                if (
                  riskData.status ===
                    'success' &&
                  riskData.data
                ) {
                  return {
                    ...scan,
                    risk_level:
                      riskData.data.risk_level,
                    risk_score:
                      riskData.data.risk_score,
                    recommendation:
                      riskData.data.recommendation,
                  }
                }

                return scan
              } catch (error) {
                console.error(
                  `Could not load risk for scan ${scan.id}:`,
                  error
                )

                return scan
              }
            }
          )
        )

      setHistoryItems(
        historyWithRisk
      )
    } catch (error) {
      console.error(
        'Error loading history:',
        error
      )

      setError(
        error instanceof Error
          ? error.message
          : 'Unable to load crop history.'
      )
    } finally {
      setLoading(false)
    }
  }

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------

  function formatDate(
    dateString?: string
  ) {
    if (!dateString) {
      return 'Unknown date'
    }

    const date =
      new Date(dateString)

    if (Number.isNaN(date.getTime())) {
      return dateString
    }

    return date.toLocaleString(
      'en-IN',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }
    )
  }

  // --------------------------------------------------
  // DISEASE ICON
  // --------------------------------------------------

  function getCropIcon(
    crop: string
  ) {
    const cropName =
      crop.toLowerCase()

    if (
      cropName.includes('tomato')
    ) {
      return '🍅'
    }

    if (
      cropName.includes('potato')
    ) {
      return '🥔'
    }

    if (
      cropName.includes('corn') ||
      cropName.includes('maize')
    ) {
      return '🌽'
    }

    if (
      cropName.includes('apple')
    ) {
      return '🍎'
    }

    if (
      cropName.includes('grape')
    ) {
      return '🍇'
    }

    if (
      cropName.includes('rice')
    ) {
      return '🌾'
    }

    return '🌱'
  }

  // --------------------------------------------------
  // RISK / STATUS
  // --------------------------------------------------

  function getSeverity(
    item: HistoryItem
  ) {
    if (item.risk_level) {
      return item.risk_level
    }

    const disease =
      item.disease?.toLowerCase()

    if (disease === 'healthy') {
      return 'Healthy'
    }

    return 'Detected'
  }

  function getSeverityTone(
    item: HistoryItem
  ):
    | 'green'
    | 'yellow'
    | 'red' {
    const severity =
      getSeverity(item).toLowerCase()

    if (
      severity.includes('healthy') ||
      severity.includes('low')
    ) {
      return 'green'
    }

    if (
      severity.includes('medium') ||
      severity.includes('warning')
    ) {
      return 'yellow'
    }

    return 'red'
  }

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <>
        <PageHeader
          eyebrow="YOUR RECORDS"
          title="Crop health history"
          subtitle="Keep track of how your crops are changing over time."
          action={
            <Button
              className="primary-button"
              onClick={() =>
                go(
                  router,
                  '/check-crop'
                )
              }
            >
              <Plus data-icon="inline-start" />
              New check
            </Button>
          }
        />

        <section className="card">
          <p>
            Loading your crop history...
          </p>
        </section>
      </>
    )
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (error) {
    return (
      <>
        <PageHeader
          eyebrow="YOUR RECORDS"
          title="Crop health history"
          subtitle="Keep track of how your crops are changing over time."
          action={
            <Button
              className="primary-button"
              onClick={() =>
                go(
                  router,
                  '/check-crop'
                )
              }
            >
              <Plus data-icon="inline-start" />
              New check
            </Button>
          }
        />

        <section className="card">
          <p>
            Unable to load history.
          </p>

          <p>
            {error}
          </p>

          <Button
            className="primary-button"
            onClick={loadHistory}
          >
            Try again
          </Button>
        </section>
      </>
    )
  }

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <>
      <PageHeader
        eyebrow="YOUR RECORDS"
        title="Crop health history"
        subtitle="Keep track of how your crops are changing over time."
        action={
          <Button
            className="primary-button"
            onClick={() =>
              go(
                router,
                '/check-crop'
              )
            }
          >
            <Plus data-icon="inline-start" />
            New check
          </Button>
        }
      />

      {/* FILTERS */}

      <div className="filter-row">
        <button
          type="button"
          className="filter active"
        >
          All farms
          <ChevronDown />
        </button>

        <button
          type="button"
          className="filter"
        >
          All crops
          <ChevronDown />
        </button>

        <button
          type="button"
          className="filter"
        >
          Health status
          <ChevronDown />
        </button>

        <button
          type="button"
          className="filter"
        >
          Date
          <ChevronDown />
        </button>
      </div>

      {/* HISTORY LIST */}

      <section className="card history-list">

        {historyItems.length === 0 ? (
          <div className="card-copy">
            <p>
              No crop checks have been
              recorded yet.
            </p>

            <Button
              className="primary-button"
              onClick={() =>
                go(
                  router,
                  '/check-crop'
                )
              }
            >
              Start your first crop check
              <ArrowRight
                data-icon="inline-end"
              />
            </Button>
          </div>
        ) : (
          historyItems.map(
            (item) => {
              const confidence =
                item.confidence <= 1
                  ? Math.round(
                      item.confidence *
                        100
                    )
                  : Math.round(
                      item.confidence
                    )

              const severity =
                getSeverity(item)

              const severityTone =
                getSeverityTone(item)

              return (
                <button
                  type="button"
                  className="history-row large"
                  key={item.id}
                  onClick={() => {
                    // IMPORTANT:
                    // Send the real Supabase scan ID
                    // to the result page.
                    go(
                      router,
                      `/check-crop/result?scan_id=${item.id}`
                    )
                  }}
                >
                  <span className="crop-emoji">
                    {getCropIcon(
                      item.crop
                    )}
                  </span>

                  <span className="history-main">

                    <small>
                      {formatDate(
                        item.created_at
                      )}{' '}
                      ·{' '}
                      {item.crop}
                    </small>

                    <strong>
                      {item.disease}
                    </strong>

                    <span>
                      <StatusBadge
                        tone={
                          severityTone
                        }
                      >
                        {severity}
                      </StatusBadge>{' '}

                      {confidence}%
                      {' '}
                      confidence
                    </span>

                  </span>

                  <span className="view-link">
                    View
                    <ArrowRight />
                  </span>
                </button>
              )
            }
          )
        )}

      </section>
    </>
  )
}
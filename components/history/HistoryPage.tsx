'use client'

import { ArrowRight, ChevronDown, Plus } from 'lucide-react'
import { historyItems } from '@/lib/mock-data'
import { go, type AppRouter } from '@/lib/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'

export function HistoryPage({ router }: { router: AppRouter }) {
  return (
    <>
      <PageHeader
        eyebrow="YOUR RECORDS"
        title="Crop health history"
        subtitle="Keep track of how your crops are changing over time."
        action={
          <Button className="primary-button" onClick={() => go(router, '/check-crop')}>
            <Plus data-icon="inline-start" /> New check
          </Button>
        }
      />
      <div className="filter-row">
        <button type="button" className="filter active">
          All farms <ChevronDown />
        </button>
        <button type="button" className="filter">
          All crops <ChevronDown />
        </button>
        <button type="button" className="filter">
          Health status <ChevronDown />
        </button>
        <button type="button" className="filter">
          Date <ChevronDown />
        </button>
      </div>
      <section className="card history-list">
        {historyItems.map((item) => (
          <button
            type="button"
            className="history-row large"
            key={item.id}
            onClick={() => {
              if (item.opensResult) go(router, '/check-crop/result')
            }}
          >
            <span className="crop-emoji">{item.icon}</span>
            <span className="history-main">
              <small>
                {item.date} · {item.farmName}
              </small>
              <strong>{item.disease}</strong>
              <span>
                <StatusBadge tone={item.severityTone}>{item.severity}</StatusBadge> {item.confidence}{' '}
                confidence
              </span>
            </span>
            <span className="view-link">
              View <ArrowRight />
            </span>
          </button>
        ))}
      </section>
    </>
  )
}

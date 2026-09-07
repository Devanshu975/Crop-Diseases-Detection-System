'use client'

import { ArrowRight } from 'lucide-react'
import { historyItems } from '@/lib/mock-data'
import { go, type AppRouter } from '@/lib/navigation'

export function RecentActivity({ router }: { router: AppRouter }) {
  return (
    <section className="card recent">
      <div className="section-heading">
        <div>
          <p className="eyebrow">RECENT ACTIVITY</p>
          <h2>Latest crop checks</h2>
        </div>
        <button type="button" className="text-button" onClick={() => go(router, '/history')}>
          View history <ArrowRight />
        </button>
      </div>
      {historyItems.map((item) => (
        <button
          type="button"
          className="history-row"
          key={item.id}
          onClick={() => go(router, item.opensResult ? '/check-crop/result' : '/history')}
        >
          <span className="crop-emoji">{item.icon}</span>
          <span className="history-main">
            <strong>{item.disease}</strong>
            <small>
              {item.date} · {item.crop}
            </small>
          </span>
          <span className="history-confidence">
            <strong>{item.confidence}</strong>
            <small>confidence</small>
          </span>
          <ArrowRight />
        </button>
      ))}
    </section>
  )
}

'use client'

import { ArrowRight, Leaf } from 'lucide-react'
import { currentAnalysisResult } from '@/lib/mock-data'
import { go, type AppRouter } from '@/lib/navigation'
import { StatusBadge } from '@/components/ui/status-badge'

export function LatestCropCheck({ router }: { router: AppRouter }) {
  const result = currentAnalysisResult
  return (
    <section className="card latest-check">
      <div className="section-heading">
        <div>
          <p className="eyebrow">LATEST CROP CHECK</p>
          <h2>Latest detection</h2>
        </div>
        <StatusBadge tone="amber">{result.badgeLabel}</StatusBadge>
      </div>
      <div className="latest-check-body">
        <div className="latest-image" role="img" aria-label="Wheat leaf image from latest crop check">
          <Leaf />
        </div>
        <div className="latest-details">
          <h3>Leaf Blight Detected</h3>
          <p>{result.latestCopy}</p>
          <div className="latest-meta">
            <span>
              <strong>{result.confidence}%</strong>
              <small>Confidence</small>
            </span>
            <span>
              <strong>{result.severity}</strong>
              <small>Severity</small>
            </span>
            <span>
              <strong>{result.checkedAt}</strong>
              <small>Checked</small>
            </span>
          </div>
          <button type="button" className="text-button" onClick={() => go(router, '/check-crop/result')}>
            View result <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  )
}

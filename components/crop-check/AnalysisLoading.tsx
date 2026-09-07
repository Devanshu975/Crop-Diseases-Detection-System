'use client'

import { useEffect, useState } from 'react'
import { Check, Leaf, ScanLine } from 'lucide-react'
import { go, type AppRouter } from '@/lib/navigation'
import { getCropCheckState } from '@/lib/crop-check-store'

export function AnalysisLoading({ router }: { router: AppRouter }) {
  const [thumbUrl, setThumbUrl] = useState<string | null>(null)

  useEffect(() => {
    const session = getCropCheckState()
    if (session.imagePreviewUrl) {
      setThumbUrl(session.imagePreviewUrl)
    }

    const timer = window.setTimeout(() => {
      go(router, '/check-crop/result')
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [router])

  return (
    <div className="loading-state" aria-live="polite" aria-busy="true">
      <div className="analysis-thumb">
        {thumbUrl ? (
          <img src={thumbUrl} alt="Uploaded crop sample preview" />
        ) : (
          <Leaf />
        )}
      </div>
      <span className="loading-ring">
        <ScanLine />
      </span>
      <p className="eyebrow">CROP CHECK IN PROGRESS</p>
      <h1>Analyzing your crop</h1>
      <p className="subtitle">Checking for signs of disease and pest damage.</p>
      <div className="progress-list">
        <span className="complete">
          <Check /> Image received
        </span>
        <span className="complete">
          <Check /> Examining crop symptoms
        </span>
        <span className="active">
          <i /> Identifying possible disease
        </span>
        <span>
          <i /> Preparing recommendations
        </span>
      </div>
      <button type="button" className="text-button" onClick={() => go(router, '/check-crop')}>
        Cancel
      </button>
    </div>
  )
}

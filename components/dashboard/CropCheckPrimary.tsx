'use client'

import { Camera } from 'lucide-react'
import { go, type AppRouter } from '@/lib/navigation'
import { Button } from '@/components/ui/button'

export function CropCheckPrimary({ router }: { router: AppRouter }) {
  return (
    <section className="card crop-check-primary">
      <div className="crop-check-icon">
        <Camera />
      </div>
      <div>
        <p className="eyebrow">AI CROP DETECTION</p>
        <h2>Check Your Crop</h2>
        <p>Take a photo to detect possible diseases or pests.</p>
      </div>
      <Button className="primary-button" onClick={() => go(router, '/check-crop')}>
        <Camera data-icon="inline-start" /> Check Crop
      </Button>
    </section>
  )
}

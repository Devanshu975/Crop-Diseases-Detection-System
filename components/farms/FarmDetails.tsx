'use client'

import { Camera } from 'lucide-react'
import { currentFarm, diseaseRisk } from '@/lib/mock-data'
import { go, type AppRouter } from '@/lib/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { Recommendation } from '@/components/dashboard/Recommendation'

export function FarmDetails({ router }: { router: AppRouter }) {
  const farm = currentFarm
  return (
    <>
      <PageHeader
        eyebrow="MY WHEAT FARM"
        title={farm.name}
        subtitle={farm.location}
        action={
          <Button className="primary-button" onClick={() => go(router, '/check-crop')}>
            <Camera data-icon="inline-start" /> Check crop
          </Button>
        }
      />
      <div className="farm-detail-stats">
        <div className="card">
          <small>Crop</small>
          <strong>{farm.crop}</strong>
          <span>{farm.stageDetail}</span>
        </div>
        <div className="card">
          <small>Area</small>
          <strong>{farm.area}</strong>
          <span>{farm.fieldLabel}</span>
        </div>
        <div className="card">
          <small>Health</small>
          <strong className="green-text">{farm.healthLabel}</strong>
          <span>{farm.healthUpdatedShort}</span>
        </div>
        <div className="card">
          <small>Risk</small>
          <strong className="red-text">{diseaseRisk.score}%</strong>
          <span>High attention</span>
        </div>
      </div>
      <div className="detail-grid">
        <RecentActivity router={router} />
        <Recommendation router={router} />
      </div>
    </>
  )
}

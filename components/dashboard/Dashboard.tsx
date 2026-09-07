'use client'

import { Camera, ChevronDown, Sprout } from 'lucide-react'
import { currentFarm, farmer, weather } from '@/lib/mock-data'
import { go, type AppRouter } from '@/lib/navigation'
import { Button } from '@/components/ui/button'
import { CropCheckPrimary } from '@/components/dashboard/CropCheckPrimary'
import { HealthCard } from '@/components/dashboard/HealthCard'
import { LatestCropCheck } from '@/components/dashboard/LatestCropCheck'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { Recommendation } from '@/components/dashboard/Recommendation'
import { RiskCard } from '@/components/dashboard/RiskCard'
import { WeatherCard } from '@/components/dashboard/WeatherCard'

export function Dashboard({ router }: { router: AppRouter }) {
  const hour = new Date().getHours()

  const greeting =
    hour >= 5 && hour < 12
      ? 'Good morning'
      : hour >= 12 && hour < 17
        ? 'Good afternoon'
        : hour >= 17 && hour < 21
          ? 'Good evening'
          : 'Good night'

  return (
    <>
      <div className="welcome">
        <div>
          <p className="eyebrow">{weather.dashboardDate}</p>
          <h1>{greeting}, {farmer.firstName}</h1>
          <p className="subtitle">Here&apos;s your crop health overview.</p>
        </div>
        <Button className="primary-button" aria-label="Check your crop" onClick={() => go(router, '/check-crop')}>
          <Camera data-icon="inline-start" /> Check Crop
        </Button>
      </div>
      <div className="farm-select">
        <span className="farm-pin">
          <Sprout />
        </span>
        <span>
          <small>VIEWING FARM</small>
          <strong>{currentFarm.name}</strong>
        </span>
        <ChevronDown />
      </div>
      <div className="dashboard-detection">
        <HealthCard router={router} />
        <LatestCropCheck router={router} />
        <CropCheckPrimary router={router} />
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-main">
          <RiskCard router={router} />
          <RecentActivity router={router} />
        </div>
        <div className="dashboard-side">
          <WeatherCard router={router} />
          <Recommendation router={router} />
          <QuickActions router={router} />
        </div>
      </div>
    </>
  )
}

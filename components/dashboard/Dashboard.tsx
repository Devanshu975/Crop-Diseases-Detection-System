'use client'

import { Camera, ChevronDown, Sprout } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

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

import {
  fetchAnalysisSummary,
  fetchScanHistory,
  getSelectedCity,
  type RiskSummary,
  type Scan,
} from '@/lib/dashboard-api'

export function Dashboard({
  router,
}: {
  router: AppRouter
}) {
  const hour = new Date().getHours()

  const greeting =
    hour >= 5 && hour < 12
      ? 'Good morning'
      : hour >= 12 && hour < 17
        ? 'Good afternoon'
        : hour >= 17 && hour < 21
          ? 'Good evening'
          : 'Good night'

  const [scans, setScans] = useState<Scan[]>([])
  const [latestRisk, setLatestRisk] =
    useState<RiskSummary | null>(null)

  const [selectedCity, setSelectedCity] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadDashboard() {
    setLoading(true)

    const city = getSelectedCity()
    setSelectedCity(city)

    try {
      const history = await fetchScanHistory()

      setScans(history)

      if (history[0]?.id) {
        try {
          const risk = await fetchAnalysisSummary(history[0].id)

          setLatestRisk(risk)
        } catch {
          setLatestRisk(null)
        }
      } else {
        setLatestRisk(null)
      }
    } catch {
      setScans([])
      setLatestRisk(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()

    const onFocus = () => {
      loadDashboard()
    }

    window.addEventListener('focus', onFocus)
    window.addEventListener('trix-city-changed', onFocus)

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('trix-city-changed', onFocus)
    }
  }, [])

  const stats = useMemo(() => {
    const healthy = scans.filter(
      (scan) =>
        scan.disease?.toLowerCase() === 'healthy',
    ).length

    const highRisk =
      latestRisk?.risk_level === 'High Risk'
        ? 1
        : 0

    return {
      total: scans.length,
      healthy,
      diseased: scans.length - healthy,
      highRisk,
    }
  }, [scans, latestRisk])

  return (
    <>
      {/* WELCOME HEADER */}

      <div className="welcome">
        <div>
          <p className="eyebrow">
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          <h1>
            {greeting}, Farmer
          </h1>

          <p className="subtitle">
            Here&apos;s your crop health overview.
          </p>
        </div>

        <Button
          className="primary-button"
          aria-label="Check your crop"
          onClick={() =>
            go(router, '/check-crop')
          }
        >
          <Camera data-icon="inline-start" />
          Check Crop
        </Button>
      </div>

      {/* SELECTED CITY */}

      <div className="farm-select">
        <span className="farm-pin">
          <Sprout />
        </span>

        <span>
          <small>VIEWING LOCATION</small>

          <strong>
            {selectedCity ||
              'Select a city in Crop Check'}
          </strong>
        </span>

        <ChevronDown />
      </div>

      {/* TOP DASHBOARD CARDS */}

      <div
        className="dashboard-detection"
        aria-label="Dashboard statistics"
      >
        <HealthCard
          router={router}
          loading={loading}
          scans={scans}
          latestRisk={latestRisk}
        />

        <LatestCropCheck
          router={router}
          loading={loading}
          scan={scans[0] || null}
          risk={latestRisk}
        />

        <CropCheckPrimary
          router={router}
        />
      </div>

      {/* MAIN DASHBOARD */}

      <div className="dashboard-grid">
        <div className="dashboard-main">

          <RiskCard
            router={router}
            loading={loading}
            risk={latestRisk}
            stats={stats}
          />

          <RecentActivity
            router={router}
            loading={loading}
            scans={scans}
          />

        </div>

        <div className="dashboard-side">

          <WeatherCard
            router={router}
            city={selectedCity}
          />

          <Recommendation
            router={router}
            risk={latestRisk}
          />

          <QuickActions
            router={router}
          />

        </div>
      </div>
    </>
  )
}
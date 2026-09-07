'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Advisory } from '@/components/advisory/Advisory'
import { AnalysisLoading } from '@/components/crop-check/AnalysisLoading'
import { CropCheck } from '@/components/crop-check/CropCheck'
import { Result } from '@/components/crop-check/Result'
import { Dashboard } from '@/components/dashboard/Dashboard'
import { FarmDetails } from '@/components/farms/FarmDetails'
import { Farms } from '@/components/farms/Farms'
import { HistoryPage } from '@/components/history/HistoryPage'
import { Shell } from '@/components/layout/Shell'
import { Profile } from '@/components/profile/Profile'
import { RiskAnalysis } from '@/components/risk/RiskAnalysis'
import { WeatherPage } from '@/components/weather/WeatherPage'
import { screenFromPath } from '@/lib/navigation'

export default function Page() {
  const pathname = usePathname()
  const router = useRouter()
  const screen = screenFromPath(pathname)

  const content =
    screen === 'check-crop-analyzing' ? (
      <AnalysisLoading router={router} />
    ) : screen === 'check-crop-result' ? (
      <Result router={router} />
    ) : screen === 'check-crop' ? (
      <CropCheck router={router} />
    ) : screen === 'risk' ? (
      <RiskAnalysis router={router} />
    ) : screen === 'weather' ? (
      <WeatherPage />
    ) : screen === 'history' ? (
      <HistoryPage router={router} />
    ) : screen === 'farm-details' ? (
      <FarmDetails router={router} />
    ) : screen === 'farms' ? (
      <Farms router={router} />
    ) : screen === 'advisory' ? (
      <Advisory router={router} />
    ) : screen === 'profile' ? (
      <Profile />
    ) : (
      <Dashboard router={router} />
    )

  return (
    <Shell pathname={pathname} router={router}>
      <div className="content-wrap">{content}</div>
    </Shell>
  )
}

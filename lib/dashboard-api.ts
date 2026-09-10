'use client'

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000'

export type Scan = {
  id: number
  crop: string
  image_url?: string | null
  disease: string
  confidence: number
  created_at?: string
}

export type RiskSummary = {
  scan_id: number
  crop: string
  disease: string
  confidence_percent: number
  risk_level: string
  risk_score: number
  overall_status: string
  recommendation: string
  action: string
  warning: string
  image_url?: string | null
}

export type WeatherData = {
  city: string
  country?: string
  temperature: number
  feels_like?: number
  humidity: number
  condition: string
  weather_code?: number
  wind_kmh: number
  forecast?: Array<{
    date: string
    high: number
    low: number
    rainfall_mm: number
    weather_code: number
    condition: string
  }>
}

export async function fetchScanHistory(): Promise<Scan[]> {
  const response = await fetch(`${API_BASE}/scan-history`, {
    cache: 'no-store',
  })
  if (!response.ok) throw new Error(`History request failed (${response.status})`)
  const json = await response.json()
  if (json.status === 'error') throw new Error(json.message || 'Unable to load history')
  return Array.isArray(json.data) ? json.data : []
}

export async function fetchAnalysisSummary(scanId: number): Promise<RiskSummary> {
  const response = await fetch(
    `${API_BASE}/analysis-summary?scan_id=${encodeURIComponent(scanId)}`,
    { cache: 'no-store' },
  )
  if (!response.ok) throw new Error(`Analysis request failed (${response.status})`)
  const json = await response.json()
  if (json.status === 'error') throw new Error(json.message || 'Unable to load analysis')
  return json.data
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${API_BASE}/weather?city=${encodeURIComponent(city)}`,
    { cache: 'no-store' },
  )
  if (!response.ok) throw new Error(`Weather request failed (${response.status})`)
  const json = await response.json()
  if (json.status === 'error') throw new Error(json.message || 'Unable to load weather')
  return json.data
}

export function getSelectedCity(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem('trix_selected_city')?.trim() || ''
}

export function formatDate(value?: string): string {
  if (!value) return 'No scan yet'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function confidencePercent(value: number): number {
  return value <= 1 ? value * 100 : value
}

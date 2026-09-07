import type { ForecastDay, WeatherSnapshot } from '@/lib/types'

export const weather: WeatherSnapshot = {
  dashboardDate: 'THURSDAY, 04 SEPTEMBER 2026',
  todayEyebrow: 'TODAY, 04 SEP',
  temperature: 29,
  condition: 'Partly cloudy',
  humidity: 72,
  humidityLabel: 'High humidity',
  rainfallMm: 18,
  rainfallLabel: 'Recent rainfall',
  windKmh: 12,
  insightTitle: 'Conditions favor fungal growth',
  insightDetail: 'High humidity + recent rainfall',
  cropInsightTitle: 'Fungal disease risk is elevated',
  cropInsightCopy:
    'High humidity and recent rainfall may increase disease risk. Avoid field work when leaves are wet and inspect lower leaves first.',
  cropInsightBadge: 'ATTENTION',
}

export const forecast: ForecastDay[] = [
  { label: 'Today', high: '29°', low: '23°', icon: '☁' },
  { label: 'Fri', high: '30°', low: '24°', icon: '☀' },
  { label: 'Sat', high: '28°', low: '22°', icon: '🌦' },
  { label: 'Sun', high: '27°', low: '21°', icon: '☁' },
  { label: 'Mon', high: '29°', low: '22°', icon: '☀' },
  { label: 'Tue', high: '31°', low: '23°', icon: '☀' },
  { label: 'Wed', high: '30°', low: '22°', icon: '🌦' },
]

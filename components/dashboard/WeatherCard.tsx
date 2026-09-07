'use client'

import { ArrowRight, CloudRain, Droplets, Sprout, SunMedium, Wind } from 'lucide-react'
import { weather } from '@/lib/mock-data'
import { go, type AppRouter } from '@/lib/navigation'

export function WeatherCard({ router }: { router: AppRouter }) {
  return (
    <section className="card weather-card">
      <div className="card-heading">
        <div>
          <p className="eyebrow">TODAY&apos;S WEATHER</p>
          <h2>
            {weather.temperature}° <span>{weather.condition}</span>
          </h2>
        </div>
        <SunMedium className="weather-sun" />
      </div>
      <div className="weather-stats">
        <span>
          <Droplets />
          <strong>{weather.humidity}%</strong>
          <small>Humidity</small>
        </span>
        <span>
          <CloudRain />
          <strong>{weather.rainfallMm} mm</strong>
          <small>Rainfall</small>
        </span>
        <span>
          <Wind />
          <strong>{weather.windKmh} km/h</strong>
          <small>Wind</small>
        </span>
      </div>
      <div className="insight">
        <Sprout />
        <span>
          <strong>{weather.insightTitle}</strong>
          <small>{weather.insightDetail}</small>
        </span>
      </div>
      <button type="button" className="text-button" onClick={() => go(router, '/weather')}>
        View weather <ArrowRight />
      </button>
    </section>
  )
}

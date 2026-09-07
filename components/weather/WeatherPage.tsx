'use client'

import { CloudRain, Droplets, MapPin, Sprout, SunMedium, Wind, ChevronDown } from 'lucide-react'
import { farmer, forecast, weather } from '@/lib/mock-data'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatusBadge } from '@/components/ui/status-badge'

export function WeatherPage() {
  return (
    <>
      <PageHeader
        eyebrow="LOCAL CONDITIONS"
        title="Weather"
        subtitle={farmer.location}
        action={
          <button type="button" className="select-pill">
            <MapPin /> {farmer.locationShort} <ChevronDown />
          </button>
        }
      />
      <section className="card current-weather">
        <div>
          <p className="eyebrow">{weather.todayEyebrow}</p>
          <h2>{weather.temperature}°</h2>
          <p>{weather.condition}</p>
        </div>
        <SunMedium className="weather-sun large" />
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
      </section>
      <section className="card forecast">
        <div className="section-heading">
          <div>
            <p className="eyebrow">UPCOMING</p>
            <h2>7-day forecast</h2>
          </div>
        </div>
        <div className="forecast-row">
          {forecast.map((day, i) => (
            <div className={i === 0 ? 'forecast-day today' : 'forecast-day'} key={day.label}>
              <strong>{day.label}</strong>
              <span>{day.icon}</span>
              <b>
                {day.high} <small>{day.low}</small>
              </b>
            </div>
          ))}
        </div>
      </section>
      <section className="card crop-insight">
        <span className="recommendation-icon">
          <Sprout />
        </span>
        <div>
          <p className="eyebrow">CROP INSIGHT</p>
          <h2>{weather.cropInsightTitle}</h2>
          <p>{weather.cropInsightCopy}</p>
        </div>
        <StatusBadge tone="amber">{weather.cropInsightBadge}</StatusBadge>
      </section>
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight,
  CloudRain,
  Droplets,
  Sprout,
  SunMedium,
  Wind,
} from 'lucide-react'
import { go, type AppRouter } from '@/lib/navigation'

type WeatherData = {
  city: string
  temperature: number
  humidity: number
  condition: string
  wind_kmh: number
}

export function WeatherCard({ router }: { router: AppRouter }) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/weather?city=Meerut')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Weather request failed')
        }

        return response.json()
      })
      .then((result) => {
        setWeather(result.data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  return (
    <section className="card weather-card">
      <div className="card-heading">
        <div>
          <p className="eyebrow">TODAY&apos;S WEATHER</p>

          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>Weather unavailable</h2>
          ) : (
            <h2>
              {weather?.temperature.toFixed(1)}°{' '}
              <span>{weather?.condition}</span>
            </h2>
          )}
        </div>

        <SunMedium className="weather-sun" />
      </div>

      {!loading && !error && weather && (
        <>
          <div className="weather-stats">
            <span>
              <Droplets />
              <strong>{weather.humidity}%</strong>
              <small>Humidity</small>
            </span>

            <span>
              <CloudRain />
              <strong>-- mm</strong>
              <small>Rainfall</small>
            </span>

            <span>
              <Wind />
              <strong>{weather.wind_kmh} km/h</strong>
              <small>Wind</small>
            </span>
          </div>

          <div className="insight">
            <Sprout />
            <span>
              <strong>{weather.city}</strong>
              <small>Live weather from OpenWeather</small>
            </span>
          </div>
        </>
      )}

      <button
        type="button"
        className="text-button"
        onClick={() => go(router, '/weather')}
      >
        View weather <ArrowRight />
      </button>
    </section>
  )
}
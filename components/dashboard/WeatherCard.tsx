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

import {
  fetchWeather,
  type WeatherData,
} from '@/lib/dashboard-api'

export function WeatherCard({
  router,
  city,
}: {
  router: AppRouter
  city: string
}) {
  const [weather, setWeather] =
    useState<WeatherData | null>(null)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState('')

  useEffect(() => {
    if (!city) {
      setWeather(null)
      setError('')
      return
    }

    let cancelled = false

    setLoading(true)
    setError('')

    fetchWeather(city)
      .then((data) => {
        if (!cancelled) {
          setWeather(data)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setWeather(null)

          setError(
            err instanceof Error
              ? err.message
              : 'Weather unavailable',
          )
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [city])

  return (
    <section className="card weather-card">

      <div className="card-heading">

        <div>

          <p className="eyebrow">
            TODAY&apos;S WEATHER
          </p>

          {!city ? (
            <h2>
              Select a city
            </h2>
          ) : loading ? (
            <h2>
              Loading...
            </h2>
          ) : error ? (
            <h2>
              Weather unavailable
            </h2>
          ) : (
            <h2>
              {weather?.temperature.toFixed(1)}°{' '}
              <span>
                {weather?.condition}
              </span>
            </h2>
          )}

        </div>

        <SunMedium className="weather-sun" />

      </div>

      {weather &&
        !loading &&
        !error && (
          <>

            <div className="weather-stats">

              <span>
                <Droplets />

                <strong>
                  {weather.humidity}%
                </strong>

                <small>
                  Humidity
                </small>
              </span>

              <span>
                <CloudRain />

                <strong>
                  {weather.forecast?.[0]
                    ?.rainfall_mm ?? 0}{' '}
                  mm
                </strong>

                <small>
                  Rainfall
                </small>
              </span>

              <span>
                <Wind />

                <strong>
                  {weather.wind_kmh}{' '}
                  km/h
                </strong>

                <small>
                  Wind
                </small>
              </span>

            </div>

            <div className="insight">

              <Sprout />

              <span>

                <strong>
                  {weather.city}
                </strong>

                <small>
                  Live weather from backend
                </small>

              </span>

            </div>

          </>
        )}

      {!city && (
        <p className="card-copy">
          Go to Crop Check and select your city. The dashboard will use that location.
        </p>
      )}

      <button
        type="button"
        className="text-button"
        onClick={() =>
          go(router, '/weather')
        }
      >
        View weather
        <ArrowRight />
      </button>

    </section>
  )
}
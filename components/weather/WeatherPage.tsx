'use client'

import { useEffect, useState } from 'react'

import {
  Droplets,
  MapPin,
  Sprout,
  SunMedium,
  Wind,
  ChevronDown,
  CloudRain,
  Cloud,
  CloudFog,
  CloudLightning,
  Thermometer,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'

import { farmer } from '@/lib/mock-data'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatusBadge } from '@/components/ui/status-badge'

type ForecastDay = {
  date: string
  high: number
  low: number
  rainfall_mm: number
  weather_code: number
  condition: string
}

type WeatherData = {
  city: string
  country?: string
  temperature: number
  feels_like?: number
  humidity: number
  condition: string
  wind_kmh: number
  weather_code?: number
  latitude?: number
  longitude?: number
  forecast: ForecastDay[]
}

type RiskLevel = 'Low Risk' | 'Medium Risk' | 'High Risk'

function getWeatherIcon(code: number, className = '') {
  if (code === 0 || code === 1) {
    return <SunMedium className={className} />
  }

  if (code === 2 || code === 3) {
    return <Cloud className={className} />
  }

  if (code === 45 || code === 48) {
    return <CloudFog className={className} />
  }

  if (
    code === 51 ||
    code === 53 ||
    code === 55 ||
    code === 56 ||
    code === 57 ||
    code === 61 ||
    code === 63 ||
    code === 65 ||
    code === 66 ||
    code === 67 ||
    code === 80 ||
    code === 81 ||
    code === 82
  ) {
    return <CloudRain className={className} />
  }

  if (
    code === 95 ||
    code === 96 ||
    code === 99
  ) {
    return <CloudLightning className={className} />
  }

  if (
    code === 71 ||
    code === 73 ||
    code === 75 ||
    code === 77 ||
    code === 85 ||
    code === 86
  ) {
    return <Cloud className={className} />
  }

  return <Cloud className={className} />
}

function formatDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`)

  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

function isToday(dateString: string) {
  const today = new Date()

  const date = new Date(`${dateString}T00:00:00`)

  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  )
}

/*
 * This follows the same basic temperature + humidity
 * decision boundaries used by the Random Forest training
 * data in your backend.
 *
 * IMPORTANT:
 * The actual risk prediction is still performed by
 * your backend /predict-risk or /complete-analysis endpoint.
 *
 * This frontend calculation is only used to provide an
 * immediate weather-page insight.
 */
function calculateWeatherRisk(
  temperature: number,
  humidity: number
): RiskLevel {
  if (
    humidity >= 80 &&
    temperature >= 23 &&
    temperature <= 33
  ) {
    return 'High Risk'
  }

  if (
    humidity >= 60 &&
    temperature >= 26 &&
    temperature <= 32
  ) {
    return 'Medium Risk'
  }

  if (
    humidity >= 50 &&
    temperature >= 22 &&
    temperature <= 35
  ) {
    return 'Low Risk'
  }

  return 'Low Risk'
}

function getRiskMessage(
  risk: RiskLevel,
  temperature: number,
  humidity: number
) {
  if (risk === 'High Risk') {
    return (
      `High humidity (${humidity.toFixed(
        0
      )}%) with the current temperature of ${temperature.toFixed(
        1
      )}°C may create favorable conditions for crop diseases. Regularly inspect leaves and avoid unnecessary leaf wetness.`
    )
  }

  if (risk === 'Medium Risk') {
    return (
      `Current conditions show moderate environmental risk. Humidity is ${humidity.toFixed(
        0
      )}% and temperature is ${temperature.toFixed(
        1
      )}°C. Continue regular crop monitoring.`
    )
  }

  return (
    `Current environmental conditions are relatively favorable. Temperature is ${temperature.toFixed(
      1
    )}°C with ${humidity.toFixed(
      0
    )}% humidity. Continue normal crop monitoring.`
  )
}

function getRiskTone(risk: RiskLevel) {
  if (risk === 'High Risk') {
    return 'red'
  }

  if (risk === 'Medium Risk') {
    return 'amber'
  }

  return 'green'
}

export function WeatherPage() {
  const [weather, setWeather] =
    useState<WeatherData | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          'http://127.0.0.1:8000/weather?city=Meerut'
        )

        if (!response.ok) {
          throw new Error(
            'Failed to fetch weather'
          )
        }

        const result = await response.json()

        if (result.status !== 'success') {
          throw new Error(
            result.message ||
              'Weather API error'
          )
        }

        setWeather(result.data)
      } catch (err) {
        console.error(err)

        setError(
          'Unable to load live weather'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const risk =
    weather
      ? calculateWeatherRisk(
          weather.temperature,
          weather.humidity
        )
      : 'Low Risk'

  const riskMessage =
    weather
      ? getRiskMessage(
          risk,
          weather.temperature,
          weather.humidity
        )
      : ''

  const riskTone = getRiskTone(risk)

  return (
    <>
      <PageHeader
        eyebrow="LOCAL CONDITIONS"
        title="Weather"
        subtitle={
          weather
            ? `${weather.city}${
                weather.country
                  ? `, ${weather.country}`
                  : ''
              }`
            : farmer.location
        }
        action={
          <button
            type="button"
            className="select-pill"
          >
            <MapPin />
            {farmer.locationShort}
            <ChevronDown />
          </button>
        }
      />

      {/* =====================================================
          CURRENT WEATHER
      ===================================================== */}

      <section className="card current-weather">
        {loading ? (
          <div>
            <p className="eyebrow">
              LIVE CONDITIONS
            </p>

            <h2>Loading...</h2>

            <p>
              Fetching current weather
              conditions
            </p>
          </div>
        ) : error ? (
          <div>
            <p className="eyebrow">
              LIVE CONDITIONS
            </p>

            <h2>
              Weather unavailable
            </h2>

            <p>{error}</p>
          </div>
        ) : weather ? (
          <>
            <div className="weather-main">
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <p className="eyebrow">
                    LIVE CONDITIONS
                  </p>

                  <StatusBadge tone="amber">
                    LIVE
                  </StatusBadge>
                </div>

                <h2>
                  {weather.temperature.toFixed(
                    1
                  )}
                  °
                </h2>

                <p
                  style={{
                    textTransform:
                      'capitalize',
                  }}
                >
                  {weather.condition}
                </p>

                <p
                  style={{
                    fontSize: '0.85rem',
                    opacity: 0.7,
                    marginTop: '4px',
                  }}
                >
                  {weather.city}
                </p>
              </div>

              <div className="weather-icon-large">
                {getWeatherIcon(
                  weather.weather_code ?? 0,
                  'weather-sun large'
                )}
              </div>
            </div>

            <div className="weather-stats">
              <span>
                <Droplets />

                <strong>
                  {weather.humidity.toFixed(
                    0
                  )}
                  %
                </strong>

                <small>
                  Humidity
                </small>
              </span>

              <span>
                <Wind />

                <strong>
                  {weather.wind_kmh.toFixed(
                    1
                  )}{' '}
                  km/h
                </strong>

                <small>
                  Wind
                </small>
              </span>

              <span>
                <Thermometer />

                <strong>
                  {(
                    weather.feels_like ??
                    weather.temperature
                  ).toFixed(1)}
                  °
                </strong>

                <small>
                  Feels like
                </small>
              </span>
            </div>
          </>
        ) : null}
      </section>

      {/* =====================================================
          ENVIRONMENTAL RISK
      ===================================================== */}

      {!loading &&
        !error &&
        weather && (
          <section
            className="card"
            style={{
              marginTop: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent:
                  'space-between',
                gap: '20px',
              }}
            >
              <div>
                <p className="eyebrow">
                  CROP ENVIRONMENT
                </p>

                <h2>
                  Environmental Risk
                </h2>

                <p
                  style={{
                    marginTop: '6px',
                    maxWidth: '700px',
                  }}
                >
                  {riskMessage}
                </p>
              </div>

              <StatusBadge
                tone={
                  riskTone as
                    | 'red'
                    | 'amber'
                    | 'green'
                }
              >
                {risk.toUpperCase()}
              </StatusBadge>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '28px',
                marginTop: '20px',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <small>
                  Temperature
                </small>

                <strong
                  style={{
                    display: 'block',
                    fontSize:
                      '1.2rem',
                  }}
                >
                  {weather.temperature.toFixed(
                    1
                  )}
                  °C
                </strong>
              </div>

              <div>
                <small>
                  Humidity
                </small>

                <strong
                  style={{
                    display: 'block',
                    fontSize:
                      '1.2rem',
                  }}
                >
                  {weather.humidity.toFixed(
                    0
                  )}
                  %
                </strong>
              </div>

              <div>
                <small>
                  Crop
                </small>

                <strong
                  style={{
                    display: 'block',
                    fontSize:
                      '1.2rem',
                    textTransform:
                      'capitalize',
                  }}
                >
                  Tomato
                </strong>
              </div>
            </div>
          </section>
        )}

      {/* =====================================================
          7 DAY FORECAST
      ===================================================== */}

      {!loading &&
        !error &&
        weather && (
          <section
            className="card forecast-section"
          >
            <div className="forecast-header">
              <div>
                <p className="eyebrow">
                  WEATHER FORECAST
                </p>

                <h2>
                  7-Day Forecast
                </h2>
              </div>

              <StatusBadge tone="amber">
                LIVE
              </StatusBadge>
            </div>

            <div className="forecast-grid">
              {weather.forecast.map(
                (day) => {
                  const today =
                    isToday(day.date)

                  return (
                    <div
                      className={`forecast-card ${
                        today
                          ? 'forecast-card-today'
                          : ''
                      }`}
                      key={day.date}
                    >
                      {today && (
                        <span
                          style={{
                            fontSize:
                              '0.7rem',
                            fontWeight: 700,
                            letterSpacing:
                              '0.08em',
                            textTransform:
                              'uppercase',
                            marginBottom:
                              '4px',
                          }}
                        >
                          Today
                        </span>
                      )}

                      <p className="forecast-date">
                        {formatDate(
                          day.date
                        )}
                      </p>

                      <div className="forecast-icon">
                        {getWeatherIcon(
                          day.weather_code
                        )}
                      </div>

                      <strong
                        className="forecast-condition"
                        style={{
                          textTransform:
                            'capitalize',
                        }}
                      >
                        {day.condition}
                      </strong>

                      <div className="forecast-temperature">
                        <span>
                          {day.high.toFixed(
                            1
                          )}
                          °
                        </span>

                        <small>
                          /{' '}
                          {day.low.toFixed(
                            1
                          )}
                          °
                        </small>
                      </div>

                      <div className="forecast-rain">
                        <CloudRain />

                        <span>
                          {(
                            day.rainfall_mm ??
                            0
                          ).toFixed(1)}{' '}
                          mm
                        </span>
                      </div>
                    </div>
                  )
                }
              )}
            </div>
          </section>
        )}

      {/* =====================================================
          CROP INSIGHT
      ===================================================== */}

      {!loading &&
        !error &&
        weather && (
          <section
            className="card crop-insight"
          >
            <span className="recommendation-icon">
              {risk === 'High Risk' ? (
                <AlertTriangle />
              ) : risk ===
                'Medium Risk' ? (
                <Sprout />
              ) : (
                <CheckCircle2 />
              )}
            </span>

            <div>
              <p className="eyebrow">
                CROP INSIGHT
              </p>

              <h2>
                Live environmental
                conditions
              </h2>

              <p>
                {riskMessage}
              </p>
            </div>

            <StatusBadge
              tone={
                riskTone as
                  | 'red'
                  | 'amber'
                  | 'green'
              }
            >
              {risk}
            </StatusBadge>
          </section>
        )}
    </>
  )
}
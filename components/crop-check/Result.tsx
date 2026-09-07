'use client'

import { useEffect, useState } from 'react'

import {
  AlertTriangle,
  ArrowRight,
  Check,
  FileText,
  Leaf,
  MoreHorizontal,
  Sprout,
} from 'lucide-react'

import { go, type AppRouter } from '@/lib/navigation'

import { getCropCheckState } from '@/lib/crop-check-store'

import { PageHeader } from '@/components/layout/PageHeader'

import { Button } from '@/components/ui/button'

import { StatusBadge } from '@/components/ui/status-badge'


type AnalysisResult = {
  scan_id?: number

  crop: string

  city?: string

  disease: string

  confidence: number

  confidence_percent: number

  image_url?: string

  temperature?: number

  humidity?: number

  risk_level?: string

  risk_score?: number

  overall_status?: string

  recommendation?: string

  action?: string

  warning?: string
}


export function Result({
  router,
}: {
  router: AppRouter
}) {

  const [result, setResult] =
    useState<AnalysisResult | null>(null)

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null)


  useEffect(() => {

    const session = getCropCheckState()

    if (session.result) {

      setResult(
        session.result as AnalysisResult
      )

    }

    if (session.imagePreviewUrl) {

      setPreviewUrl(
        session.imagePreviewUrl
      )

    }

  }, [])


  if (!result) {

    return (
      <>
        <PageHeader
          eyebrow="ANALYSIS"
          title="No result found"
          subtitle="Please perform a crop check first."
        />

        <div className="card">
          <Button
            className="primary-button"
            onClick={() =>
              go(router, '/check-crop')
            }
          >
            Start Crop Check
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </>
    )
  }


  const disease =
    result.disease || 'Unknown'


  const confidence =
    result.confidence_percent ??
    Math.round(
      (result.confidence ?? 0) * 100
    )


  const riskLevel =
    result.risk_level || 'Unknown'


  const isHealthy =
    disease.toLowerCase() === 'healthy'


  const isHighRisk =
    riskLevel === 'High Risk'


  const badgeTone =
    isHealthy
      ? 'green'
      : isHighRisk
        ? 'red'
        : 'yellow'


  const image =
    previewUrl ||
    result.image_url ||
    null


  return (
    <>
      <PageHeader
        eyebrow="ANALYSIS COMPLETE"
        title="Crop health result"
        subtitle={
          `Here's what we found in your ${
            result.crop
          } crop.`
        }
        action={
          <button
            type="button"
            className="icon-button"
            aria-label="More result actions"
          >
            <MoreHorizontal />
          </button>
        }
      />


      <div className="result-layout">

        <div className="result-main">

          {/* RESULT CARD */}

          <section className="card result-card">

            <div className="result-image">

              {image ? (

                <img
                  src={image}
                  alt={`Analyzed ${result.crop} sample`}
                />

              ) : (

                <Leaf />

              )}

              <span>
                <Check />
                Image analyzed
              </span>

            </div>


            <div className="result-details">

              <div className="result-title">

                <span className="warning-symbol">

                  {isHealthy ? (
                    <Check />
                  ) : (
                    <AlertTriangle />
                  )}

                </span>


                <div>

                  <p className="eyebrow">

                    {isHealthy
                      ? 'CROP HEALTH'
                      : 'POSSIBLE DISEASE'}

                  </p>


                  <h2>
                    {disease}
                  </h2>

                </div>


                <StatusBadge
                  tone={badgeTone}
                >
                  {riskLevel.toUpperCase()}
                </StatusBadge>

              </div>


              <div className="result-meta">

                <span>

                  <strong>
                    {confidence}%
                  </strong>

                  <small>
                    Confidence
                  </small>

                </span>


                <span>

                  <strong>
                    {result.crop}
                  </strong>

                  <small>
                    Crop
                  </small>

                </span>


                <span>

                  <strong>
                    {result.city || 'Nashik'}
                  </strong>

                  <small>
                    Location
                  </small>

                </span>

              </div>

            </div>


            <p className="disclaimer">

              This result is generated using
              AI-based crop disease detection
              and environmental risk analysis.
              Always verify serious cases with
              a local agricultural expert.

            </p>

          </section>


          {/* WHAT WE FOUND */}

          <section className="card found-card">

            <p className="eyebrow">
              WHAT WE FOUND
            </p>


            <h2>
              {isHealthy
                ? 'Your crop appears healthy'
                : `${disease} detected`}
            </h2>


            <p>
              {result.overall_status ||
                `The system detected ${disease} with ${confidence}% confidence.`}
            </p>


            <div className="symptoms">

              <span>
                <Check />
                Detection confidence: {confidence}%
              </span>


              {result.temperature !== undefined && (

                <span>
                  <Check />
                  Temperature: {result.temperature}°C
                </span>

              )}


              {result.humidity !== undefined && (

                <span>
                  <Check />
                  Humidity: {result.humidity}%
                </span>

              )}

            </div>

          </section>


          {/* ACTION CARD */}

          <section className="card action-card">

            <div className="recommendation-icon">
              <Sprout />
            </div>


            <div>

              <p className="eyebrow">
                WHAT SHOULD YOU DO?
              </p>


              <h2>
                Recommended action
              </h2>


              <ol>

                {result.action && (
                  <li>
                    {result.action}
                  </li>
                )}


                {result.recommendation && (
                  <li>
                    {result.recommendation}
                  </li>
                )}


                {result.warning && (
                  <li>
                    {result.warning}
                  </li>
                )}

              </ol>


              <Button
                className="primary-button"
                onClick={() =>
                  go(router, '/advisory')
                }
              >
                View full advisory
                <ArrowRight data-icon="inline-end" />
              </Button>

            </div>

          </section>

        </div>


        {/* RIGHT SIDE */}

        <aside className="result-side">

          <section className="card mini-risk">

            <div className="section-heading">

              <div>

                <p className="eyebrow">
                  CURRENT RISK
                </p>


                <h2>
                  {riskLevel}
                </h2>

              </div>


              <StatusBadge tone="red">

                {result.risk_score !== undefined
                  ? `${Math.round(
                      result.risk_score * 100
                    )}%`
                  : 'N/A'}

              </StatusBadge>

            </div>


            <p>

              {result.recommendation ||
                'Environmental risk analysis is available for this crop.'}

            </p>


            <button
              type="button"
              className="text-button"
              onClick={() =>
                go(router, '/risk')
              }
            >
              Why is risk high?
              <ArrowRight />
            </button>

          </section>


          <Button
            className="save-button"
            variant="outline"
          >
            <FileText data-icon="inline-start" />
            Save result
          </Button>

        </aside>

      </div>
    </>
  )
}
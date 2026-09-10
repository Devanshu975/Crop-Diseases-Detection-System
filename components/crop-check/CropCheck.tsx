'use client'

import { useEffect, useState } from 'react'

import {
  ArrowRight,
  Check,
  ChevronDown,
  Loader2,
  MapPin,
  Sprout,
} from 'lucide-react'

import {
  crops,
  currentFarm,
  defaultCrop,
} from '@/lib/mock-data'

import {
  go,
  type AppRouter,
} from '@/lib/navigation'

import { saveCropCheckState } from '@/lib/crop-check-store'

import { PageHeader } from '@/components/layout/PageHeader'

import { Button } from '@/components/ui/button'

import { ImageUploader } from '@/components/crop-check/ImageUploader'

// ============================================================
// TYPES
// ============================================================

type CityResult = {
  name: string
  state?: string
  country?: string
  country_code?: string
  latitude?: number
  longitude?: number
  timezone?: string
  population?: number
  feature_code?: string
}

// ============================================================
// STEPS
// ============================================================

function Steps({ current }: { current: number }) {
  const stepLabels = [
    'Select crop',
    'Add photo',
    'Analyze',
    'Result',
  ]

  return (
    <div
      className="steps"
      aria-label="Crop check progress steps"
    >
      {stepLabels.map((label, i) => (
        <div
          className={
            i + 1 <= current
              ? 'step done'
              : 'step'
          }
          key={label}
        >
          <span>
            {i + 1 <= current ? (
              <Check />
            ) : (
              i + 1
            )}
          </span>

          <small>{label}</small>
        </div>
      ))}
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function CropCheck({
  router,
}: {
  router: AppRouter
}) {
  // ==========================================================
  // CROP
  // ==========================================================

  const [crop, setCrop] = useState(
    defaultCrop.name
  )

  // ==========================================================
  // CITY
  // ==========================================================

  const [city, setCity] = useState('')

  const [citySearch, setCitySearch] =
    useState('')

  const [cityResults, setCityResults] =
    useState<CityResult[]>([])

  const [showCityResults, setShowCityResults] =
    useState(false)

  const [isSearchingCity, setIsSearchingCity] =
    useState(false)

  const [cityError, setCityError] =
    useState('')

  // ==========================================================
  // IMAGE
  // ==========================================================

  const [file, setFile] =
    useState<File | null>(null)

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null)

  // ==========================================================
  // ANALYSIS
  // ==========================================================

  const [isAnalyzing, setIsAnalyzing] =
    useState(false)

  // ==========================================================
  // LOAD PREVIOUS CITY
  // ==========================================================

  useEffect(() => {
    try {
      const savedCity =
        localStorage.getItem(
          'selectedCity'
        )

      if (savedCity) {
        setCity(savedCity)
        setCitySearch(savedCity)
      }
    } catch (error) {
      console.error(
        'Unable to load saved city:',
        error
      )
    }
  }, [])

  // ==========================================================
  // CLEANUP IMAGE URL
  // ==========================================================

  useEffect(() => {
    return () => {
      if (
        previewUrl &&
        previewUrl.startsWith('blob:')
      ) {
        URL.revokeObjectURL(
          previewUrl
        )
      }
    }
  }, [previewUrl])

  // ==========================================================
  // SEARCH CITY / TOWN
  // ==========================================================

  useEffect(() => {
    const query =
      citySearch.trim()

    // --------------------------------------------------------
    // DON'T SEARCH FOR EMPTY / VERY SHORT INPUT
    // --------------------------------------------------------

    if (query.length < 2) {
      setCityResults([])
      setIsSearchingCity(false)
      return
    }

    // --------------------------------------------------------
    // DON'T SEARCH AGAIN IF USER HAS SELECTED
    // THE SAME CITY
    // --------------------------------------------------------

    if (
      city &&
      query.toLowerCase() ===
        city.toLowerCase()
    ) {
      setCityResults([])
      setIsSearchingCity(false)
      return
    }

    // --------------------------------------------------------
    // ABORT PREVIOUS REQUEST
    // --------------------------------------------------------

    const controller =
      new AbortController()

    // --------------------------------------------------------
    // DEBOUNCE SEARCH
    // --------------------------------------------------------

    const timer = setTimeout(
      async () => {
        try {
          setIsSearchingCity(true)
          setCityError('')

          const response =
            await fetch(
              `http://127.0.0.1:8000/search-cities?q=${encodeURIComponent(
                query
              )}`,
              {
                method: 'GET',
                signal:
                  controller.signal,
              }
            )

          if (!response.ok) {
            throw new Error(
              'Unable to search locations.'
            )
          }

          const data =
            await response.json()

          const results =
            Array.isArray(data)
              ? data
              : data.results || []

          setCityResults(results)

          setShowCityResults(true)
        } catch (error) {
          if (
            error instanceof DOMException &&
            error.name ===
              'AbortError'
          ) {
            return
          }

          console.error(
            'CITY SEARCH ERROR:',
            error
          )

          setCityResults([])
        } finally {
          setIsSearchingCity(false)
        }
      },
      350
    )

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [citySearch, city])

  // ==========================================================
  // SELECT CITY
  // ==========================================================

  function handleSelectCity(
    selectedCity: CityResult
  ) {
    const selectedName =
      selectedCity.name

    // --------------------------------------------------------
    // UPDATE REACT STATE
    // --------------------------------------------------------

    setCity(selectedName)

    setCitySearch(selectedName)

    // --------------------------------------------------------
    // SAVE CITY FOR WEATHER PAGE
    // --------------------------------------------------------

    try {
      localStorage.setItem(
        'selectedCity',
        selectedName
      )

      // Save additional information too.
      // This allows the Weather page to use
      // coordinates later if needed.

      localStorage.setItem(
        'selectedCityData',
        JSON.stringify({
          name: selectedName,
          state:
            selectedCity.state || '',
          country:
            selectedCity.country || '',
          country_code:
            selectedCity.country_code || '',
          latitude:
            selectedCity.latitude ?? null,
          longitude:
            selectedCity.longitude ?? null,
          timezone:
            selectedCity.timezone || '',
        })
      )
    } catch (error) {
      console.error(
        'Unable to save selected city:',
        error
      )
    }

    // --------------------------------------------------------
    // CLOSE SEARCH RESULTS
    // --------------------------------------------------------

    setCityResults([])

    setShowCityResults(false)

    setCityError('')
  }

  // ==========================================================
  // HANDLE CITY INPUT
  // ==========================================================

  function handleCityChange(
    value: string
  ) {
    setCitySearch(value)

    // Previous city is no longer valid
    // because the user changed the text.

    setCity('')

    setCityError('')

    setShowCityResults(true)

    // --------------------------------------------------------
    // REMOVE OLD CITY FROM WEATHER
    // --------------------------------------------------------

    try {
      localStorage.removeItem(
        'selectedCity'
      )

      localStorage.removeItem(
        'selectedCityData'
      )
    } catch (error) {
      console.error(
        'Unable to clear saved city:',
        error
      )
    }
  }

  // ==========================================================
  // SELECT IMAGE
  // ==========================================================

  function handleSelectFile(
    next: File
  ) {
    // Remove previous preview URL
    if (
      previewUrl &&
      previewUrl.startsWith('blob:')
    ) {
      URL.revokeObjectURL(
        previewUrl
      )
    }

    const objectUrl =
      URL.createObjectURL(next)

    setPreviewUrl(objectUrl)

    setFile(next)

    // --------------------------------------------------------
    // SAVE IMAGE PREVIEW
    // --------------------------------------------------------

    const reader =
      new FileReader()

    reader.onload = (e) => {
      const dataUrl =
        e.target?.result as string

      saveCropCheckState({
        selectedCrop: crop,
        imagePreviewUrl:
          dataUrl,
        fileName: next.name,
      })
    }

    reader.readAsDataURL(next)
  }

  // ==========================================================
  // CLEAR IMAGE
  // ==========================================================

  function handleClearFile() {
    if (
      previewUrl &&
      previewUrl.startsWith('blob:')
    ) {
      URL.revokeObjectURL(
        previewUrl
      )
    }

    setPreviewUrl(null)

    setFile(null)

    saveCropCheckState({
      imagePreviewUrl: null,
      fileName: null,
    })
  }

  // ==========================================================
  // ANALYZE CROP
  // ==========================================================

  async function handleAnalyze() {
    // --------------------------------------------------------
    // CHECK IMAGE
    // --------------------------------------------------------

    if (!file) {
      alert(
        'Please select an image first.'
      )

      return
    }

    // --------------------------------------------------------
    // CHECK CITY
    // --------------------------------------------------------

    if (!city) {
      setCityError(
        'Please select a real city or town from the suggestions.'
      )

      return
    }

    // --------------------------------------------------------
    // CHECK THAT INPUT MATCHES SELECTED CITY
    // --------------------------------------------------------

    if (
      citySearch.trim().toLowerCase() !==
      city.toLowerCase()
    ) {
      setCityError(
        'Please select a city or town from the suggestions.'
      )

      return
    }

    // --------------------------------------------------------
    // PREVENT DOUBLE REQUEST
    // --------------------------------------------------------

    if (isAnalyzing) {
      return
    }

    setIsAnalyzing(true)

    try {
      console.log(
        '================================='
      )

      console.log(
        'STARTING CROP ANALYSIS'
      )

      console.log(
        'Crop:',
        crop
      )

      console.log(
        'City:',
        city
      )

      console.log(
        'File:',
        file.name
      )

      console.log(
        'File type:',
        file.type
      )

      console.log(
        'File size:',
        file.size
      )

      // ======================================================
      // MAKE SURE CITY IS SAVED
      // ======================================================

      try {
        localStorage.setItem(
          'selectedCity',
          city
        )
      } catch (error) {
        console.error(
          'Unable to save city:',
          error
        )
      }

      // ======================================================
      // CREATE FORM DATA
      // ======================================================

      const formData =
        new FormData()

      formData.append(
        'file',
        file
      )

      // ======================================================
      // BACKEND URL
      // ======================================================

      const url =
        `http://127.0.0.1:8000/complete-analysis` +
        `?crop=${encodeURIComponent(crop)}` +
        `&city=${encodeURIComponent(city)}`

      console.log(
        'Sending request to:',
        url
      )

      // ======================================================
      // SEND REQUEST
      // ======================================================

      const response =
        await fetch(
          url,
          {
            method: 'POST',
            body: formData,
          }
        )

      console.log(
        'Backend status:',
        response.status
      )

      console.log(
        'Backend status text:',
        response.statusText
      )

      // ======================================================
      // READ RESPONSE
      // ======================================================

      const responseText =
        await response.text()

      console.log(
        'RAW BACKEND RESPONSE:',
        responseText
      )

      // ======================================================
      // CHECK HTTP STATUS
      // ======================================================

      if (!response.ok) {
        let errorMessage =
          responseText

        try {
          const errorData =
            JSON.parse(
              responseText
            )

          errorMessage =
            errorData.detail ||
            errorData.message ||
            responseText
        } catch {
          // Keep original response text.
        }

        throw new Error(
          `Backend returned ${response.status}: ${errorMessage}`
        )
      }

      // ======================================================
      // PARSE JSON
      // ======================================================

      let backendResult: any

      try {
        backendResult =
          JSON.parse(
            responseText
          )
      } catch {
        throw new Error(
          'Backend did not return valid JSON.'
        )
      }

      console.log(
        'PARSED BACKEND RESULT:',
        backendResult
      )

      // ======================================================
      // CHECK RESPONSE
      // ======================================================

      if (!backendResult) {
        throw new Error(
          'Backend returned an empty response.'
        )
      }

      if (
        backendResult.status ===
        'error'
      ) {
        throw new Error(
          backendResult.message ||
            'Backend analysis failed.'
        )
      }

      // ======================================================
      // GET ANALYSIS DATA
      // ======================================================

      const analysisResult =
        backendResult.data ??
        backendResult

      console.log(
        'FINAL ANALYSIS RESULT:',
        analysisResult
      )

      // ======================================================
      // SAVE RESULT
      // ======================================================

      saveCropCheckState({
        selectedCrop: crop,

        imagePreviewUrl:
          previewUrl,

        fileName:
          file.name,

        result:
          analysisResult,
      })

      console.log(
        'Analysis saved successfully.'
      )

      console.log(
        '================================='
      )

      // ======================================================
      // GO TO ANALYZING PAGE
      // ======================================================

      go(
        router,
        '/check-crop/analyzing'
      )
    } catch (error) {
      console.error(
        '================================='
      )

      console.error(
        'CROP ANALYSIS FAILED'
      )

      console.error(error)

      console.error(
        '================================='
      )

      const message =
        error instanceof Error
          ? error.message
          : String(error)

      alert(
        `Crop analysis failed.\n\n${message}`
      )
    } finally {
      setIsAnalyzing(false)
    }
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <>
      <PageHeader
        eyebrow="CROP CHECK"
        title="Check Your Crop"
        subtitle="Select your location and crop, then upload a photo to detect possible diseases or pests."
      />

      <Steps
        current={
          file
            ? 2
            : 1
        }
      />

      <div className="check-layout">

        {/* ==================================================
            MAIN FORM
        ================================================== */}

        <section className="card form-card">

          {/* =================================================
              FARM
          ================================================= */}

          <div className="form-section">

            <label>
              1. Select farm
            </label>

            <button
              type="button"
              className="select-card"
            >

              <Sprout />

              <span>

                <small>
                  FARM
                </small>

                <strong>
                  {currentFarm.name}
                </strong>

              </span>

              <ChevronDown />

            </button>

          </div>

          {/* =================================================
              LOCATION
          ================================================= */}

          <div className="form-section">

            <label>
              2. Select location
            </label>

            <div
              className="select-card"
              style={{
                position:
                  'relative',
              }}
            >

              <MapPin />

              <span
                style={{
                  flex: 1,
                }}
              >

                <small>
                  CITY / TOWN
                </small>

                <input
                  type="text"
                  value={citySearch}
                  placeholder="Search city or town..."
                  autoComplete="off"
                  onFocus={() => {
                    setShowCityResults(
                      true
                    )
                  }}
                  onChange={(e) => {
                    handleCityChange(
                      e.target.value
                    )
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key ===
                      'Escape'
                    ) {
                      setShowCityResults(
                        false
                      )
                    }
                  }}
                  style={{
                    width:
                      '100%',
                    border:
                      'none',
                    outline:
                      'none',
                    background:
                      'transparent',
                    fontSize:
                      '1rem',
                    fontWeight:
                      600,
                  }}
                />

              </span>

              {isSearchingCity ? (
                <Loader2
                  size={20}
                  className="animate-spin"
                />
              ) : (
                <ChevronDown />
              )}

              {/* =================================================
                  SEARCH RESULTS
              ================================================= */}

              {showCityResults &&
                citySearch.trim()
                  .length >= 2 &&
                !city && (
                  <div
                    style={{
                      position:
                        'absolute',
                      top:
                        'calc(100% + 8px)',
                      left: 0,
                      right: 0,
                      zIndex:
                        100,
                      background:
                        'white',
                      border:
                        '1px solid #e5e7eb',
                      borderRadius:
                        '12px',
                      boxShadow:
                        '0 12px 30px rgba(0,0,0,0.12)',
                      maxHeight:
                        '300px',
                      overflowY:
                        'auto',
                    }}
                  >

                    {cityResults.length >
                    0 ? (
                      cityResults.map(
                        (
                          item,
                          index
                        ) => (
                          <button
                            key={`${item.name}-${item.state}-${item.country}-${index}`}
                            type="button"
                            onClick={() =>
                              handleSelectCity(
                                item
                              )
                            }
                            style={{
                              width:
                                '100%',
                              display:
                                'flex',
                              alignItems:
                                'center',
                              gap:
                                '12px',
                              padding:
                                '13px 14px',
                              border:
                                'none',
                              background:
                                'transparent',
                              textAlign:
                                'left',
                              cursor:
                                'pointer',
                            }}
                          >

                            <MapPin
                              size={
                                18
                              }
                            />

                            <span>

                              <strong
                                style={{
                                  display:
                                    'block',
                                }}
                              >
                                {
                                  item.name
                                }
                              </strong>

                              <small
                                style={{
                                  display:
                                    'block',
                                  color:
                                    '#6b7280',
                                  marginTop:
                                    '3px',
                                }}
                              >

                                {item.state
                                  ? item.state
                                  : ''}

                                {item.state &&
                                item.country
                                  ? ', '
                                  : ''}

                                {item.country
                                  ? item.country
                                  : ''}

                              </small>

                            </span>

                          </button>
                        )
                      )
                    ) : !isSearchingCity ? (
                      <div
                        style={{
                          padding:
                            '18px',
                          textAlign:
                            'center',
                          color:
                            '#6b7280',
                          fontSize:
                            '0.9rem',
                        }}
                      >
                        No matching city
                        or town found.
                      </div>
                    ) : null}

                  </div>
                )}

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {cityError && (
              <p
                style={{
                  color:
                    '#dc2626',
                  fontSize:
                    '0.85rem',
                  marginTop:
                    '8px',
                }}
              >
                {cityError}
              </p>
            )}

            {/* =================================================
                SUCCESS
            ================================================= */}

            {city &&
              !cityError && (
                <p
                  style={{
                    color:
                      '#16a34a',
                    fontSize:
                      '0.85rem',
                    marginTop:
                      '8px',
                  }}
                >
                  ✓ Location selected:{' '}
                  {city}
                </p>
              )}

          </div>

          {/* =================================================
              CROP
          ================================================= */}

          <div className="form-section">

            <label>
              3. Select crop
            </label>

            <div className="crop-grid">

              {crops.map(
                (item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={
                      crop ===
                      item.name
                        ? 'crop-choice selected'
                        : 'crop-choice'
                    }
                    aria-pressed={
                      crop ===
                      item.name
                    }
                    onClick={() => {
                      setCrop(
                        item.name
                      )

                      saveCropCheckState(
                        {
                          selectedCrop:
                            item.name,
                        }
                      )
                    }}
                  >

                    <span>
                      {item.icon}
                    </span>

                    <strong>
                      {item.name}
                    </strong>

                    {crop ===
                      item.name && (
                      <Check />
                    )}

                  </button>
                )
              )}

            </div>

          </div>

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="form-section">

            <label>
              4. Add a photo
            </label>

            <ImageUploader
              file={file}
              previewUrl={
                previewUrl
              }
              onSelect={
                handleSelectFile
              }
              onClear={
                handleClearFile
              }
            />

            <p className="upload-tip">

              <Check />

              Use a clear photo with good
              lighting and keep the affected
              area visible.

            </p>

          </div>

          {/* =================================================
              ANALYZE BUTTON
          ================================================= */}

          <Button
            className="primary-button full"
            disabled={
              !file ||
              !city ||
              isAnalyzing
            }
            onClick={
              handleAnalyze
            }
          >

            {isAnalyzing
              ? 'Analyzing...'
              : 'Analyze crop'}

            {!isAnalyzing && (
              <ArrowRight
                data-icon="inline-end"
              />
            )}

          </Button>

        </section>

        {/* ==================================================
            TIPS
        ================================================== */}

        <aside className="tips-panel">

          <div className="tips-image">
            <Sprout />
          </div>

          <h3>
            Tips for a better result
          </h3>

          <ul>

            <li>
              <Check />
              Get close to the affected leaf
            </li>

            <li>
              <Check />
              Avoid blurry or dark photos
            </li>

            <li>
              <Check />
              Search and select your actual city or town
            </li>

            <li>
              <Check />
              Include the whole plant if possible
            </li>

          </ul>

        </aside>

      </div>
    </>
  )
}
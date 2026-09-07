'use client'

import { useEffect, useState } from 'react'

import {
ArrowRight,
Check,
ChevronDown,
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

function Steps({ current }: { current: number }) {
const stepLabels = [
'Select crop',
'Add photo',
'Analyze',
'Result',
]

return ( <div
   className="steps"
   aria-label="Crop check progress steps"
 >
{stepLabels.map((label, i) => (
<div
className={i + 1 <= current ? 'step done' : 'step'}
key={label}
> <span>
{i + 1 <= current ? <Check /> : i + 1} </span>

      <small>{label}</small>
    </div>
  ))}
</div>


)
}

export function CropCheck({
router,
}: {
router: AppRouter
}) {
const [crop, setCrop] = useState(defaultCrop.name)

const [file, setFile] = useState<File | null>(null)

const [previewUrl, setPreviewUrl] =
useState<string | null>(null)

const [isAnalyzing, setIsAnalyzing] =
useState(false)

useEffect(() => {
return () => {
if (
previewUrl &&
previewUrl.startsWith('blob:')
) {
URL.revokeObjectURL(previewUrl)
}
}
}, [previewUrl])

function handleSelectFile(next: File) {
const objectUrl = URL.createObjectURL(next)


setPreviewUrl(objectUrl)
setFile(next)

const reader = new FileReader()

reader.onload = (e) => {
  const dataUrl = e.target?.result as string

  saveCropCheckState({
    selectedCrop: crop,
    imagePreviewUrl: dataUrl,
    fileName: next.name,
  })
}

reader.readAsDataURL(next)


}

function handleClearFile() {
if (
previewUrl &&
previewUrl.startsWith('blob:')
) {
URL.revokeObjectURL(previewUrl)
}


setPreviewUrl(null)
setFile(null)

saveCropCheckState({
  imagePreviewUrl: null,
  fileName: null,
})


}

async function handleAnalyze() {
if (!file) {
alert('Please select an image first.')
return
}


if (isAnalyzing) {
  return
}

setIsAnalyzing(true)

try {
  console.log('=================================')
  console.log('STARTING CROP ANALYSIS')
  console.log('Crop:', crop)
  console.log('File:', file.name)
  console.log('File type:', file.type)
  console.log('File size:', file.size)

  const formData = new FormData()

  formData.append('file', file)

  const city = 'Nashik'

  const url =
    `http://127.0.0.1:8000/complete-analysis` +
    `?crop=${encodeURIComponent(crop)}` +
    `&city=${encodeURIComponent(city)}`

  console.log('Sending request to:', url)

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  console.log(
    'Backend status:',
    response.status
  )

  console.log(
    'Backend status text:',
    response.statusText
  )

  const responseText = await response.text()

  console.log(
    'RAW BACKEND RESPONSE:',
    responseText
  )

  if (!response.ok) {
    throw new Error(
      `Backend returned ${response.status}: ${responseText}`
    )
  }

  let backendResult: any

  try {
    backendResult = JSON.parse(responseText)
  } catch {
    throw new Error(
      'Backend did not return valid JSON.'
    )
  }

  console.log(
    'PARSED BACKEND RESULT:',
    backendResult
  )

  if (!backendResult) {
    throw new Error(
      'Backend returned an empty response.'
    )
  }

  if (backendResult.status === 'error') {
    throw new Error(
      backendResult.message ||
        'Backend analysis failed.'
    )
  }

  const analysisResult =
    backendResult.data ?? backendResult

  console.log(
    'FINAL ANALYSIS RESULT:',
    analysisResult
  )

  saveCropCheckState({
    selectedCrop: crop,
    imagePreviewUrl: previewUrl,
    fileName: file.name,
    result: analysisResult,
  })

  console.log(
    'Analysis saved successfully.'
  )

  console.log('=================================')

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

return (
<> <PageHeader
     eyebrow="CROP CHECK"
     title="Check Your Crop"
     subtitle="Take a photo to detect possible diseases or pests."
   />

  <Steps
    current={file ? 2 : 1}
  />

  <div className="check-layout">

    <section className="card form-card">

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


      <div className="form-section">

        <label>
          2. Select crop
        </label>

        <div className="crop-grid">

          {crops.map((item) => (
            <button
              type="button"
              key={item.id}
              className={
                crop === item.name
                  ? 'crop-choice selected'
                  : 'crop-choice'
              }
              aria-pressed={
                crop === item.name
              }
              onClick={() => {
                setCrop(item.name)

                saveCropCheckState({
                  selectedCrop: item.name,
                })
              }}
            >

              <span>
                {item.icon}
              </span>

              <strong>
                {item.name}
              </strong>

              {crop === item.name && (
                <Check />
              )}

            </button>
          ))}

        </div>

      </div>


      <div className="form-section">

        <label>
          3. Add a photo
        </label>

        <ImageUploader
          file={file}
          previewUrl={previewUrl}
          onSelect={handleSelectFile}
          onClear={handleClearFile}
        />

        <p className="upload-tip">

          <Check />

          Use a clear photo with good
          lighting and keep the affected
          area visible.

        </p>

      </div>


      <Button
        className="primary-button full"
        disabled={
          !file || isAnalyzing
        }
        onClick={handleAnalyze}
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
          Include the whole plant if possible
        </li>

      </ul>

    </aside>

  </div>
</>


)
}

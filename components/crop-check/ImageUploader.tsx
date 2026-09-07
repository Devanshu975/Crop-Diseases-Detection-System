'use client'

import { useId, useRef, type ChangeEvent } from 'react'
import { Upload, X } from 'lucide-react'

const MAX_BYTES = 10 * 1024 * 1024

export function ImageUploader({
  file,
  previewUrl,
  onSelect,
  onClear,
}: {
  file: File | null
  previewUrl: string | null
  onSelect: (file: File) => void
  onClear: () => void
}) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const next = event.target.files?.[0]
    event.target.value = ''
    if (!next) return
    if (!/^image\/(png|jpeg)$/i.test(next.type) && !/\.(png|jpe?g)$/i.test(next.name)) return
    if (next.size > MAX_BYTES) return
    onSelect(next)
  }

  if (!file || !previewUrl) {
    return (
      <>
        <input
          id={inputId}
          ref={inputRef}
          className="sr-only"
          type="file"
          accept="image/png,image/jpeg,.png,.jpg,.jpeg"
          aria-label="Upload a crop photo"
          onChange={handleChange}
        />
        <button type="button" className="upload-box" onClick={() => inputRef.current?.click()}>
          <span className="upload-icon">
            <Upload />
          </span>
          <strong>Upload a crop photo</strong>
          <small>Take a photo or choose from your gallery</small>
          <em>PNG, JPG up to 10 MB</em>
        </button>
      </>
    )
  }

  return (
    <div className="preview-box">
      <div className="leaf-preview">
        <img src={previewUrl} alt="Selected crop photo preview" />
      </div>
      <button type="button" className="remove-preview" aria-label="Remove photo" onClick={onClear}>
        <X />
      </button>
      <div>
        <strong>{file.name}</strong>
        <small>Photo ready for analysis</small>
      </div>
    </div>
  )
}

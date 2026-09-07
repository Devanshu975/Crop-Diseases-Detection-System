import { leafBlightResult } from '@/lib/mock-data/crops'
import type { DiseaseAnalysisResult } from '@/lib/types'

export interface CropCheckSessionState {
  selectedCrop: string
  imagePreviewUrl: string | null
  fileName: string | null
  result: DiseaseAnalysisResult
}

const STORAGE_KEY = 'crop_health_check_session'

const defaultState: CropCheckSessionState = {
  selectedCrop: 'Wheat',
  imagePreviewUrl: null,
  fileName: null,
  result: leafBlightResult,
}

let memoryState: CropCheckSessionState = { ...defaultState }

export function getCropCheckState(): CropCheckSessionState {
  if (typeof window === 'undefined') {
    return memoryState
  }
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CropCheckSessionState>
      return {
        selectedCrop: parsed.selectedCrop || defaultState.selectedCrop,
        imagePreviewUrl: parsed.imagePreviewUrl ?? defaultState.imagePreviewUrl,
        fileName: parsed.fileName ?? defaultState.fileName,
        result: parsed.result || defaultState.result,
      }
    }
  } catch {
    // fallback to memoryState
  }
  return memoryState
}

export function saveCropCheckState(updates: Partial<CropCheckSessionState>): CropCheckSessionState {
  const current = getCropCheckState()
  const next: CropCheckSessionState = {
    ...current,
    ...updates,
  }
  memoryState = next
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore storage quota or private browsing errors
    }
  }
  return next
}

export function resetCropCheckState(): void {
  memoryState = { ...defaultState }
  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }
}

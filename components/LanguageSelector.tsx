'use client'

import { useFarmer } from '@/context/FarmerContext'
import { translations, type SupportedLanguage } from '@/lib/translations'

const languages: { code: SupportedLanguage; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी (Hindi)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
]

export function LanguageSelector() {
  const { farmer, updateFarmer } = useFarmer()

  return (
    <div className="language-selector">
      <label htmlFor="language-select">Language / भाषा</label>
      <select
        id="language-select"
        value={farmer.language || 'en'}
        onChange={(e) => updateFarmer({ language: e.target.value })}
        className="form-select"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}
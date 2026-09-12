'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  Bell, 
  ChevronDown, 
  CircleHelp, 
  FileText, 
  MapPin, 
  Check, 
  X
} from 'lucide-react'
import { useFarmer } from '@/context/FarmerContext'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'bn', label: 'বাংলা (Bengali)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'gu', label: 'ગુજરાતી (Gujarati)' },
]

export function Profile() {
  // 1. Consume global state and update function
  const { farmer, updateFarmer } = useFarmer()

  // 2. Local form & toggle states
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [nameInput, setNameInput] = useState(farmer.name)
  const [locationInput, setLocationInput] = useState(farmer.location)

  // Settings State
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [isEditingLocation, setIsEditingLocation] = useState(false)

  const currentLangCode = farmer.language || 'en'
  const currentLangLabel = LANGUAGES.find((l) => l.code === currentLangCode)?.label || 'English'

  // 3. Save handler updates global context + localStorage
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateFarmer({
      name: nameInput,
      location: locationInput,
    })
    setIsEditingProfile(false)
    setIsEditingLocation(false)
  }

  const handleStartEdit = () => {
    setNameInput(farmer.name)
    setLocationInput(farmer.location)
    setIsEditingProfile(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="YOUR ACCOUNT"
        title="Profile"
        subtitle="Manage your preferences and support settings."
      />

      {/* --------------------------------------------------------------------- */}
      {/* USER PROFILE CARD */}
      {/* --------------------------------------------------------------------- */}
      <section className="card profile-card">
        {!isEditingProfile ? (
          <>
            <div className="profile-avatar">{farmer.initials}</div>
            <div>
              <h2>{farmer.name}</h2>
              <p>
                {farmer.accountType} · {farmer.location}
              </p>
            </div>
            <Button variant="outline" onClick={handleStartEdit}>
              Edit profile
            </Button>
          </>
        ) : (
          /* EDIT PROFILE FORM */
          <form onSubmit={handleSaveProfile} className="w-full space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-semibold">Edit Profile</h3>
              <button 
                type="button" 
                onClick={() => setIsEditingProfile(false)}
                className="opacity-70 hover:opacity-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold opacity-70 mb-1">FULL NAME</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full p-2 text-sm rounded-lg border bg-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold opacity-70 mb-1">LOCATION</label>
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="w-full p-2 text-sm rounded-lg border bg-transparent"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setIsEditingProfile(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* SETTINGS LIST */}
      {/* --------------------------------------------------------------------- */}
      <div className="settings-list">
        
        {/* PREFERENCES */}
        <section className="card">
          <p className="eyebrow">PREFERENCES</p>

          {/* LANGUAGE */}
          <div className="w-full">
            <button
              type="button"
              className="setting cursor-pointer w-full text-left"
              onClick={() => setShowLangMenu(!showLangMenu)}
            >
              <span className="setting-icon">
                <span>अ</span>
              </span>
              <span>
                <strong>Language</strong>
                <small>Currently: {currentLangLabel}</small>
              </span>
              <ChevronDown className={`transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
            </button>

            {showLangMenu && (
              <div className="ml-12 my-2 p-2 border rounded-lg space-y-1 max-h-60 overflow-y-auto">
                {LANGUAGES.map((lang) => {
                  const isSelected = currentLangCode === lang.code
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        updateFarmer({ language: lang.code }) // ✅ Global context updated here
                        setShowLangMenu(false)
                      }}
                      className="flex items-center justify-between w-full p-2 text-sm rounded hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      <span>{lang.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* NOTIFICATIONS */}
          <button
            type="button"
            className="setting cursor-pointer w-full text-left"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            <span className="setting-icon">
              <Bell />
            </span>
            <span>
              <strong>Notifications</strong>
              <small>{notificationsEnabled ? 'Crop alerts active' : 'Notifications muted'}</small>
            </span>
            <div className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${notificationsEnabled ? 'bg-emerald-600' : 'bg-zinc-400'}`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
          </button>

          {/* LOCATION */}
          <div className="w-full">
            {!isEditingLocation ? (
              <button
                type="button"
                className="setting cursor-pointer w-full text-left"
                onClick={() => {
                  setLocationInput(farmer.location)
                  setIsEditingLocation(true)
                }}
              >
                <span className="setting-icon">
                  <MapPin />
                </span>
                <span>
                  <strong>Location</strong>
                  <small>{farmer.location}</small>
                </span>
                <ChevronDown />
              </button>
            ) : (
              <div className="p-3 my-2 border rounded-lg space-y-2">
                <label className="block text-xs font-semibold opacity-70">UPDATE LOCATION</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    className="flex-1 p-2 text-sm rounded-lg border bg-transparent"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      updateFarmer({ location: locationInput })
                      setIsEditingLocation(false)
                    }}
                  >
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsEditingLocation(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SUPPORT */}
        <section className="card">
          <p className="eyebrow">SUPPORT</p>

          <Link href="/help" className="block">
            <div className="setting cursor-pointer">
              <span className="setting-icon">
                <CircleHelp />
              </span>
              <span>
                <strong>Help center</strong>
                <small>Get answers and guidance</small>
              </span>
              <ArrowRight />
            </div>
          </Link>

          <Link href="/privacy" className="block">
            <div className="setting cursor-pointer">
              <span className="setting-icon">
                <FileText />
              </span>
              <span>
                <strong>Privacy</strong>
                <small>How we handle your information</small>
              </span>
              <ArrowRight />
            </div>
          </Link>
        </section>
      </div>
    </>
  )
}
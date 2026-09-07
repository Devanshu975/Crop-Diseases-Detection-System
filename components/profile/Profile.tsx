'use client'

import { ArrowRight, Bell, ChevronDown, CircleHelp, FileText, MapPin } from 'lucide-react'
import { farmer } from '@/lib/mock-data'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'

export function Profile() {
  return (
    <>
      <PageHeader
        eyebrow="YOUR ACCOUNT"
        title="Profile"
        subtitle="Manage your preferences and support settings."
      />
      <section className="card profile-card">
        <div className="profile-avatar">{farmer.initials}</div>
        <div>
          <h2>{farmer.name}</h2>
          <p>
            {farmer.accountType} · {farmer.location}
          </p>
        </div>
        <Button variant="outline">Edit profile</Button>
      </section>
      <div className="settings-list">
        <section className="card">
          <p className="eyebrow">PREFERENCES</p>
          <button type="button" className="setting">
            <span className="setting-icon">
              <span>अ</span>
            </span>
            <span>
              <strong>Language</strong>
              <small>English · हिंदी available</small>
            </span>
            <ChevronDown />
          </button>
          <button type="button" className="setting">
            <span className="setting-icon">
              <Bell />
            </span>
            <span>
              <strong>Notifications</strong>
              <small>Crop alerts and reminders</small>
            </span>
            <ChevronDown />
          </button>
          <button type="button" className="setting">
            <span className="setting-icon">
              <MapPin />
            </span>
            <span>
              <strong>Location</strong>
              <small>{farmer.location}</small>
            </span>
            <ChevronDown />
          </button>
        </section>
        <section className="card">
          <p className="eyebrow">SUPPORT</p>
          <button type="button" className="setting">
            <span className="setting-icon">
              <CircleHelp />
            </span>
            <span>
              <strong>Help center</strong>
              <small>Get answers and guidance</small>
            </span>
            <ArrowRight />
          </button>
          <button type="button" className="setting">
            <span className="setting-icon">
              <FileText />
            </span>
            <span>
              <strong>Privacy</strong>
              <small>How we handle your information</small>
            </span>
            <ArrowRight />
          </button>
        </section>
      </div>
    </>
  )
}

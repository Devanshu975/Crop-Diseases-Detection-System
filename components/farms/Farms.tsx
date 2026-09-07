'use client'

import { ArrowRight, MapPin, Plus, Sprout } from 'lucide-react'
import { farms } from '@/lib/mock-data'
import { go, type AppRouter } from '@/lib/navigation'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/ui/status-badge'

export function Farms({ router }: { router: AppRouter }) {
  const farm = farms[0]
  return (
    <>
      <PageHeader
        eyebrow="YOUR LAND"
        title="My farms"
        subtitle="Manage your farms and keep every crop in view."
        action={
          <Button className="primary-button">
            <Plus data-icon="inline-start" /> Add farm
          </Button>
        }
      />
      <div className="farm-grid">
        <section className="card farm-card featured">
          <div className="farm-card-top">
            <span className="farm-avatar">
              <Sprout />
            </span>
            <StatusBadge tone={farm.healthTone}>{farm.healthLabel.toUpperCase()}</StatusBadge>
          </div>
          <h2>{farm.name}</h2>
          <p>
            <MapPin /> {farm.location}
          </p>
          <div className="farm-details">
            <span>
              <small>Crop</small>
              <strong>{farm.crop}</strong>
            </span>
            <span>
              <small>Area</small>
              <strong>{farm.area}</strong>
            </span>
            <span>
              <small>Stage</small>
              <strong>{farm.stage}</strong>
            </span>
          </div>
          <div className="farm-risk">
            <span>Current risk</span>
            <StatusBadge tone={farm.listRiskTone}>{farm.listRiskLabel}</StatusBadge>
          </div>
          <Button variant="outline" className="full" onClick={() => go(router, `/farms/${farm.id}`)}>
            View farm <ArrowRight data-icon="inline-end" />
          </Button>
        </section>
        <button type="button" className="card add-farm-card">
          <span>
            <Plus />
          </span>
          <strong>Add another farm</strong>
          <small>Track a new field or crop</small>
        </button>
      </div>
    </>
  )
}

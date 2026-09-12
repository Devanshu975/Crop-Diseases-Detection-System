'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { farmer as initialFarmer } from '@/lib/mock-data'

export interface Farmer {
  name: string
  initials: string
  location: string
  accountType: string
  language?: string
  phone?: string
  email?: string
  [key: string]: any
}

interface FarmerContextType {
  farmer: Farmer
  updateFarmer: (updatedFields: Partial<Farmer>) => void
}

const FarmerContext = createContext<FarmerContextType | undefined>(undefined)

export function FarmerProvider({ children }: { children: React.ReactNode }) {
  const [farmer, setFarmer] = useState<Farmer>({
    language: 'en',
    ...initialFarmer,
  })

  // 1. Load persisted data from localStorage on client load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('trix_farmer_profile')
      if (saved) {
        const parsed = JSON.parse(saved)
        setFarmer((prev) => ({
          ...prev,
          ...parsed,
          language: parsed.language || prev.language || 'en',
        }))
      }
    } catch (error) {
      console.error('Failed to load farmer profile from localStorage:', error)
    }
  }, [])

  // 2. Update state AND sync directly to localStorage
  const updateFarmer = (updatedFields: Partial<Farmer>) => {
    setFarmer((prev) => {
      const newName = updatedFields.name !== undefined ? updatedFields.name : prev.name
      
      // Calculate new initials dynamically
      const newInitials = newName
        ? newName
            .trim()
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : prev.initials

      const updated: Farmer = {
        ...prev,
        ...updatedFields,
        initials: newInitials || prev.initials,
      }

      // Save to localStorage immediately
      localStorage.setItem('trix_farmer_profile', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <FarmerContext.Provider value={{ farmer, updateFarmer }}>
      {children}
    </FarmerContext.Provider>
  )
}

export function useFarmer() {
  const context = useContext(FarmerContext)
  if (!context) {
    throw new Error('useFarmer must be used within a FarmerProvider')
  }
  return context
}
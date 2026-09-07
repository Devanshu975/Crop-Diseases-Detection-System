import type { Farm } from '@/lib/types'

export const currentFarm: Farm = {
  id: '1',
  name: 'My Wheat Farm',
  crop: 'Wheat',
  area: '2.5 acres',
  stage: 'Flowering',
  stageDetail: 'Flowering stage',
  location: 'Meerut, Uttar Pradesh',
  fieldLabel: 'North field',
  healthLabel: 'Good',
  healthTone: 'green',
  healthSummary: 'Your crop currently shows no detected disease.',
  healthUpdated: 'Updated 15 minutes ago',
  healthUpdatedShort: 'Updated 15 min ago',
  listRiskLabel: 'MEDIUM',
  listRiskTone: 'amber',
}

export const farms: Farm[] = [currentFarm]

export function getFarmById(id: string): Farm | undefined {
  return farms.find((farm) => farm.id === id)
}

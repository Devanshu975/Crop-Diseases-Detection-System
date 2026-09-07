import type { AdvisoryContent, DashboardRecommendation } from '@/lib/types'

export const advisory: AdvisoryContent = {
  eyebrow: 'WHEAT · LEAF BLIGHT',
  title: 'Crop advisory',
  subtitle: 'Simple next steps for your crop.',
  priorityLabel: 'HIGH PRIORITY',
  nowTitle: 'Protect your crop',
  actions: [
    'Inspect nearby plants for similar symptoms.',
    'Remove severely affected plant material where appropriate.',
    'Monitor field humidity and moisture.',
    'Follow locally approved integrated pest management guidance.',
  ],
  safetyNote:
    'Always follow locally approved agricultural guidance and product label instructions.',
  nextCheckTitle: 'Inspect again in 2 days',
  nextCheckCopy: 'Look for new spots on lower leaves and compare with this result.',
}

export const dashboardRecommendation: DashboardRecommendation = {
  title: 'Check your crop today',
  copy: 'High humidity is expected. Look for early signs of fungal infection.',
}

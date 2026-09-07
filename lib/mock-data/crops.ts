import type { CropOption, DiseaseAnalysisResult } from '@/lib/types'

export const defaultCrop: CropOption = {
  id: 'wheat',
  name: 'Wheat',
  icon: '🌾',
}

export const crops: CropOption[] = [
  defaultCrop,

  { id: 'potato', name: 'Potato', icon: '🥔' },
  { id: 'rice', name: 'Rice', icon: '🌾' },
  { id: 'mustard', name: 'Mustard', icon: '🌱' },
  { id: 'tomato', name: 'Tomato', icon: '🍅' },
]

export const leafBlightResult: DiseaseAnalysisResult = {
  id: 'analysis-wheat-leaf-blight',
  outcome: 'disease',
  crop: 'Wheat',
  disease: 'Leaf Blight',
  diseaseTitle: 'Leaf blight detected',
  confidence: 94,
  severity: 'Moderate',
  severityTone: 'amber',
  dateLabel: '04 Sep',
  checkedAt: '04 Sep, 9:42 AM',
  badgeLabel: 'DISEASE FOUND',
  findingsTitle: 'Symptoms match leaf blight',
  findingsCopy:
    'Visible spots and discoloration are consistent with early leaf blight symptoms.',
  disclaimer:
    'AI result. Consider expert verification for important treatment decisions.',
  actionTitle: 'Inspect nearby plants today',
  actions: [
    'Inspect nearby plants for similar symptoms.',
    'Remove heavily affected leaves where appropriate.',
    'Monitor field humidity and moisture.',
    'Follow locally approved IPM guidance.',
  ],
  symptoms: ['Brown leaf spots', 'Yellowing edges', 'Spreading pattern'],
  latestCopy:
    'No disease is confirmed until a crop image is checked. This result is from your latest Wheat analysis.',
}

export const healthyResult: DiseaseAnalysisResult = {
  id: 'analysis-wheat-healthy',
  outcome: 'healthy',
  crop: 'Wheat',
  disease: 'Healthy',
  diseaseTitle: 'No disease detected',
  confidence: 92,
  severity: 'Good',
  severityTone: 'green',
  dateLabel: '28 Aug',
  checkedAt: '28 Aug, 8:15 AM',
  badgeLabel: 'HEALTHY',
  findingsTitle: 'The crop appears healthy',
  findingsCopy:
    'No visible disease symptoms were identified in this wheat image.',
  disclaimer:
    'AI result. Consider expert verification for important treatment decisions.',
  actionTitle: 'Continue regular scouting',
  actions: [
    'Keep monitoring leaves after rain or high humidity.',
    'Compare new growth with this healthy baseline.',
    'Check again if weather risk rises.',
    'Follow locally approved crop care guidance.',
  ],
  symptoms: ['No leaf spots', 'Normal color', 'Even growth'],
  latestCopy: 'The latest wheat image did not show disease symptoms.',
}

export const currentAnalysisResult = leafBlightResult
import type { DiseaseRisk } from '@/lib/types'

export const diseaseRisk: DiseaseRisk = {
  score: 78,
  levelLabel: 'HIGH',
  heading: 'High risk',
  summary: 'Conditions are favorable for disease development.',
  cardCopy: 'Weather conditions may increase the chance of fungal disease.',
  factorChips: ['High humidity', 'Recent rainfall', '29°C'],
  whyTitle: 'Weather and crop conditions are connected',
  whyCopy:
    'High humidity combined with recent rainfall can create favorable conditions for fungal diseases like leaf blight.',
  miniCopy: 'Humidity and recent rainfall are creating favorable conditions.',
  trendLabel: 'Rising',
  factors: [
    {
      name: 'Humidity',
      value: '72%',
      status: 'High',
      copy: 'High moisture can help fungal disease spread.',
      icon: 'humidity',
      tone: 'red',
    },
    {
      name: 'Recent rainfall',
      value: '18 mm',
      status: 'Recent',
      copy: 'Wet leaves may stay damp longer.',
      icon: 'rainfall',
      tone: 'amber',
    },
    {
      name: 'Temperature',
      value: '29°C',
      status: 'Favorable',
      copy: 'Warm conditions support disease activity.',
      icon: 'temperature',
      tone: 'amber',
    },
  ],
  trend: [
    { day: 'Mon', level: 'Low', height: 25 },
    { day: 'Tue', level: 'Low', height: 28 },
    { day: 'Wed', level: 'Med', height: 48 },
    { day: 'Thu', level: 'High', height: 78 },
    { day: 'Fri', level: 'High', height: 82 },
    { day: 'Sat', level: 'Med', height: 62 },
    { day: 'Sun', level: 'Med', height: 58 },
  ],
}

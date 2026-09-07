export type BadgeTone = 'green' | 'amber' | 'red' | 'blue'

export type DetectionOutcome = 'disease' | 'healthy'

export type RiskLevel = 'Low' | 'Med' | 'High'

export type RiskFactorIcon = 'humidity' | 'rainfall' | 'temperature'

export interface Farmer {
  id: string
  name: string
  firstName: string
  initials: string
  location: string
  locationShort: string
  accountType: string
  greeting: string
}

export interface Farm {
  id: string
  name: string
  crop: string
  area: string
  stage: string
  stageDetail: string
  location: string
  fieldLabel: string
  healthLabel: string
  healthTone: BadgeTone
  healthSummary: string
  healthUpdated: string
  healthUpdatedShort: string
  listRiskLabel: string
  listRiskTone: BadgeTone
}

export interface CropOption {
  id: string
  name: string
  icon: string
}

export interface WeatherSnapshot {
  dashboardDate: string
  todayEyebrow: string
  temperature: number
  condition: string
  humidity: number
  humidityLabel: string
  rainfallMm: number
  rainfallLabel: string
  windKmh: number
  insightTitle: string
  insightDetail: string
  cropInsightTitle: string
  cropInsightCopy: string
  cropInsightBadge: string
}

export interface ForecastDay {
  label: string
  high: string
  low: string
  icon: string
}

export interface RiskFactor {
  name: string
  value: string
  status: string
  copy: string
  icon: RiskFactorIcon
  tone: BadgeTone
}

export interface RiskTrendPoint {
  day: string
  level: RiskLevel
  height: number
}

export interface DiseaseRisk {
  score: number
  levelLabel: string
  heading: string
  summary: string
  cardCopy: string
  factorChips: string[]
  whyTitle: string
  whyCopy: string
  miniCopy: string
  trendLabel: string
  factors: RiskFactor[]
  trend: RiskTrendPoint[]
}

export interface DiseaseAnalysisResult {
  id: string
  outcome: DetectionOutcome
  crop: string
  disease: string
  diseaseTitle: string
  confidence: number
  severity: string
  severityTone: BadgeTone
  dateLabel: string
  checkedAt: string
  badgeLabel: string
  findingsTitle: string
  findingsCopy: string
  disclaimer: string
  actionTitle: string
  actions: string[]
  symptoms: string[]
  latestCopy: string
}

export interface HistoryItem {
  id: string
  date: string
  crop: string
  farmName: string
  disease: string
  confidence: string
  severity: string
  severityTone: BadgeTone
  icon: string
  opensResult: boolean
}

export interface AdvisoryContent {
  eyebrow: string
  title: string
  subtitle: string
  priorityLabel: string
  nowTitle: string
  actions: string[]
  safetyNote: string
  nextCheckTitle: string
  nextCheckCopy: string
}

export interface DashboardRecommendation {
  title: string
  copy: string
}

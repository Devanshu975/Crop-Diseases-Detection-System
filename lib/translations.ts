// lib/translations.ts

export type SupportedLanguage = 'en' | 'hi' | 'pa' | 'mr' | 'bn' | 'te' | 'ta' | 'gu'

export interface TranslationKeys {
  dashboard: string
  checkCrop: string
  weather: string
  riskAnalysis: string
  history: string
  myFarms: string
  profile: string
  helpCenter: string
  settings: string
}

export const translations: Record<SupportedLanguage, TranslationKeys> = {
  en: {
    dashboard: 'Dashboard',
    checkCrop: 'Check Crop',
    weather: 'Weather',
    riskAnalysis: 'Risk Analysis',
    history: 'History',
    myFarms: 'My Farms',
    profile: 'Profile',
    helpCenter: 'Help Center',
    settings: 'Settings',
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    checkCrop: 'फसल जांच',
    weather: 'मौसम',
    riskAnalysis: 'जोखिम विश्लेषण',
    history: 'इतिहास',
    myFarms: 'मेरे खेत',
    profile: 'प्रोफाइल',
    helpCenter: 'सहायता केंद्र',
    settings: 'सेटिंग्स',
  },
  pa: {
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    checkCrop: 'ਫਸਲ ਦੀ ਜਾਂਚ',
    weather: 'ਮੌਸਮ',
    riskAnalysis: 'ਜੋਖਮ ਵਿਸ਼ਲੇਸ਼ਣ',
    history: 'ਇਤਿਹਾਸ',
    myFarms: 'ਮੇਰੇ ਖੇਤ',
    profile: 'ਪ੍ਰੋਫਾਈਲ',
    helpCenter: 'ਮਦਦ ਕੇਂਦਰ',
    settings: 'ਸੈਟਿੰਗਾਂ',
  },
  mr: {
    dashboard: 'डॅशबोर्ड',
    checkCrop: 'पिकांची तपासणी',
    weather: 'हवामान',
    riskAnalysis: 'धोका विश्लेषण',
    history: 'इतिहास',
    myFarms: 'माझी शेती',
    profile: 'प्रोफाइल',
    helpCenter: 'मदत केंद्र',
    settings: 'सेटिंग्ज',
  },
  bn: {
    dashboard: 'ড্যাশবোর্ড',
    checkCrop: 'ফসল পরীক্ষা',
    weather: 'আবহাওয়া',
    riskAnalysis: 'ঝুঁকি বিশ্লেষণ',
    history: 'ইতিহাস',
    myFarms: 'আমার খামার',
    profile: 'প্রোফাইল',
    helpCenter: 'সহায়তা কেন্দ্র',
    settings: 'সেটিংস',
  },
  te: {
    dashboard: 'డాష్‌బోర్డ్',
    checkCrop: 'పంట పరిశీలన',
    weather: 'వాతావరణం',
    riskAnalysis: 'ప్రమాద విశ్లేషణ',
    history: 'చరిత్ర',
    myFarms: 'నా పొలాలు',
    profile: 'ప్రొఫైల్',
    helpCenter: 'సహాయ కేంద్రం',
    settings: 'సెట్టింగ్‌లు',
  },
  ta: {
    dashboard: 'டாஷ்போர்டு',
    checkCrop: 'பயிர் ஆய்வு',
    weather: 'வானிலை',
    riskAnalysis: 'அபாய பகுப்பாய்வு',
    history: 'வரலாறு',
    myFarms: 'என் பண்ணைகள்',
    profile: 'சுயவிவரம்',
    helpCenter: 'உதவி மையம்',
    settings: 'அமைப்புகள்',
  },
  gu: {
    dashboard: 'ડેશબોર્ડ',
    checkCrop: 'પાક તપાસ',
    weather: 'હવામાન',
    riskAnalysis: 'જોખમ વિશ્લેષણ',
    history: 'ઇતિહાસ',
    myFarms: 'મારા ખેતરો',
    profile: 'પ્રોફાઇલ',
    helpCenter: 'મદદ કેન્દ્ર',
    settings: 'સેટિંગ્સ',
  },
}

// lib/translations.ts

export interface TranslationKeys {
  [key: string]: string // <-- Add this index signature
  dashboard: string
  checkCrop: string
  weather: string
  riskAnalysis: string
  history: string
  myFarms: string
  profile: string
  helpCenter: string
  settings: string
}
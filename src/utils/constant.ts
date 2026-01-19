import { url } from './setup/url.config'

export const lngs: {
  [key: string]: {
    nativeName: string
  }
} = {
  en: { nativeName: 'English' },
  ar: { nativeName: 'Arabic' },
}

export const API = {
  application: `${url}/rest/v1/application`,
}

export const ERROR_EMAIL = 'a@a.com'

export const SITUATIONS = {
  CURRENT_FINANCIAL: 'Current Financial Situation',
  EMPLOYMENT: 'Employment Circumstances',
  REASON: 'Reason for Applying',
}

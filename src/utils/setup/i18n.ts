import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const isDev = import.meta.env.DEV

i18n.use(initReactI18next).init({
  debug: isDev,
  fallbackLng: 'en',
  saveMissing: isDev, // you should not use saveMissing in production
  resources: {
    en: {
      translation: {
        application_title: 'Social Support Application',
        person_name: 'Name',
        national_id: 'National ID',
        next: 'Next',
        back: 'Back',
        save: 'Save',
        dob: 'Date of Birth',
      },
    },
    ar: {
      translation: {
        application_title: 'SSA',
        person_name: 'fghttttttt',
        national_id: 'dddddddd',
        next: 'nnnn',
        back: 'bbbb',
        save: 'ssss',
        dob: 'dob',
      },
    },
  },
})

export default i18n

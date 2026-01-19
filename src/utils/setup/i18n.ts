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
        submit: 'Submit',
        dob: 'Date of Birth',
        personal_information: 'Personal Information',
        gender: 'Gender',
        address: 'Address',
        city: 'City',
        state: 'State',
        country: 'Country',
        email: 'EMail',
        phone: 'Phone',
      },
    },
    ar: {
      translation: {
        application_title: 'تطبيق الدعم الاجتماعي',
        person_name: 'اسم',
        national_id: 'رقم الهوية الوطنية',
        next: 'تالي',
        back: 'ظهر',
        save: 'أنجى',
        submit: 'رافع',
        dob: 'تاريخ الميلاد',
        personal_information: 'معلومات شخصية',
        gender: 'جنس',
        address: 'عنوان الشخص',
        city: 'المنطقة التجارية بلندن',
        state: 'ولاية',
        country: 'دولة',
        email: 'بريد إلكتروني',
        phone: 'هاتف',
      },
    },
  },
})

export default i18n

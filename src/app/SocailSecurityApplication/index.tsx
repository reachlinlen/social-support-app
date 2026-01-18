import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'

import { StageProvider } from '../../utils/setup/stage'
import { SelectStageForm } from './select-stage-form'
import { lngs } from '../../utils/constant'

export function SocialSecurityApplication() {
  const { t, i18n } = useTranslation()
  return (
    <>
      <h1 className="hidden md:block">{t('application_title')}</h1>
      <h2 className="md:hidden">{t('application_title')}</h2>
      <div className="desktopView mx-auto flex justify-end mt-2">
        {Object.keys(lngs).map((lng) => (
          <Button
            type="submit"
            variant={i18n.language == lng ? 'contained' : 'text'}
            onClick={() => {
              i18n.changeLanguage(lng)
            }}
          >
            {lngs[lng].nativeName}
          </Button>
        ))}
      </div>
      <StageProvider>
        <SelectStageForm />
      </StageProvider>
    </>
  )
}

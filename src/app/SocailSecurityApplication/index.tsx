import { StageProvider } from '../../utils/stage'
import { SelectStageForm } from './select-stage-form'

export function SocialSecurityApplication() {
  return (
    <>
      <h1 className="hidden md:block">Social Support Application</h1>
      <h2 className="md:hidden">Social Support Application</h2>
      <StageProvider>
        <SelectStageForm />
      </StageProvider>
    </>
  )
}

import { StageProvider } from '../../utils/stage'
import { SelectStageForm } from './select-stage-form'

export function SocialSecurityApplication() {
  return (
    <StageProvider>
      <SelectStageForm />
    </StageProvider>
  )
}

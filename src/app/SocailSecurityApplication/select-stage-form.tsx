import { useCallback } from 'react'
import { useStage } from '../../utils/setup/stage'
import { FamilyFinancialInfo } from '../FamilyFinancialInfo'
import { PersonalInfoForm } from '../PersonalInfo'
import { SituationDescriptions } from '../SituationDescriptions'

export function SelectStageForm() {
  const { stage, isFormComplete } = useStage()
  const StageComponent = useCallback(() => {
    switch (stage) {
      case 1:
        return <PersonalInfoForm />
      case 2:
        return <FamilyFinancialInfo />
      case 3:
        return <SituationDescriptions />
      default:
        return <p>Issue in Stage. Please revisit.</p>
    }
  }, [stage])

  let processPercent = '0'
  if (stage == 2) {
    processPercent = '33'
  } else if (stage == 3) {
    processPercent = isFormComplete ? '100' : '66'
  }

  return (
    <>
      <hr className="fixed top-0 border-2 border-blue-600" style={{ width: `${processPercent}%` }} />
      <StageComponent />
    </>
  )
}

import { useStage } from '../../utils/setup/stage'
import { FamilyFinancialInfo } from '../FamilyFinancialInfo'
import { PersonalInfoForm } from '../PersonalInfo'
import { SituationDescriptions } from '../SituationDescriptions'

export function SelectStageForm() {
  const { stage } = useStage()
  const StageComponent = () => {
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
  }
  const processPercent =
    stage == 1 ? '0'
    : stage == 2 ? '33'
    : '66'
  return (
    <>
      <hr className="fixed top-0 border-2 border-blue-600" style={{ width: `${processPercent}%` }} />
      <StageComponent />
    </>
  )
}

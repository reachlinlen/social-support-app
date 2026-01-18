import { useStage } from '../../utils/setup/stage'
import { FamilyFinancialInfo } from '../FamilyFinancialInfo'
import { PersonalInfoForm } from '../PersonalInfo'
import { SituationDescriptions } from '../SituationDescriptions'

export function SelectStageForm() {
  const { stage } = useStage()
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

import { useStage } from '../../utils/stage'
import { FamilyFinancialInfo } from '../FamilyFinancialInfo'
import { PersonalInfoForm } from '../PersonalInfo'

export function SelectStageForm() {
  const { stage } = useStage()
  console.log({ stage })
  switch (stage) {
    case 1:
      return <PersonalInfoForm />
    case 2:
      return <FamilyFinancialInfo />
    default:
      return <p>Issue in Stage. Please revisit.</p>
  }
}

import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import { Button } from '@mui/material'

import { FormTextArea } from '../../ui/designsystem/Input'
import { HelpMeWrite } from './HelpMeWrite'
import type { SituationsDescriptionsType } from './situation-descriptions.types'
import { useStage } from '../../utils/stage'

export function SituationDescriptions() {
  const { setStage } = useStage()
  const { control, handleSubmit, setValue } = useForm<SituationsDescriptionsType>({
    defaultValues: {
      current_financial_situation: '',
      employment_circumstances: '',
      reason_for_applying: '',
    },
    mode: 'onChange',
  })

  const handleBack = () => {
    setStage((previousStage) => previousStage - 1)
  }
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log({ data })
  }
  return (
    <div className="desktopView">
      <h2 className="hidden md:block mt-8">Situation Descriptions</h2>
      <h3 className="block md:hidden mt-8 text-center">Situation Descriptions</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="grid space-y-6 mt-4 md:mt-8">
        <div className="grid md:flex gap-4 items-end">
          <FormTextArea
            control={control}
            name="current_financial_situation"
            label="Current Financial Situation"
            className="min-w-2/3"
            rows={5}
          />
          <HelpMeWrite
            type="current_financial_situation"
            handleAccept={(acceptedResponse: string) => {
              setValue('current_financial_situation', acceptedResponse, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
          />
          <hr className="md:hidden" />
        </div>
        <div className="grid md:flex gap-4 items-end">
          <FormTextArea
            control={control}
            name="employment_circumstances"
            label="Employment Circumstances"
            className="min-w-2/3"
            rows={5}
          />
          <HelpMeWrite
            type="employment_circumstances"
            handleAccept={(acceptedResponse: string) => {
              setValue('employment_circumstances', acceptedResponse, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
          />
          <hr className="md:hidden" />
        </div>
        <div className="grid md:flex gap-4 items-end">
          <FormTextArea
            control={control}
            name="reason_for_applying"
            label="Reason For Applying"
            className="min-w-2/3"
            rows={5}
          />
          <HelpMeWrite
            type="reason_for_applying"
            handleAccept={(acceptedResponse: string) => {
              setValue('reason_for_applying', acceptedResponse, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
          />
          <hr className="md:hidden" />
        </div>
        <hr className="hidden md:block" />
        <div className="flex flex-wrap justify-end flex-col-reverse md:flex-row gap-8">
          <Button type="submit" variant="contained" className="w-80 justify-self-end">
            Save
          </Button>
          <Button variant="outlined" className="w-80 justify-self-end" onClick={handleBack}>
            Back
          </Button>
        </div>
      </form>
    </div>
  )
}

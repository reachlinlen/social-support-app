import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import { Alert, Button, Snackbar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { FormTextArea } from '../../ui/designsystem/Input'
import { HelpMeWrite } from './HelpMeWrite'
import type { SituationsDescriptionsType } from './situation-descriptions.types'
import { useStage } from '../../utils/setup/stage'
import { appFetch } from '../../utils/setup/fetch'
import { API } from '../../utils/constant'

export function SituationDescriptions() {
  const { setStage } = useStage()
  const { t } = useTranslation()
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState('')
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const personalInfo = JSON.parse(localStorage.getItem('personal_info') ?? '')
    const familyInfo = JSON.parse(localStorage.getItem('family_info') ?? '')
    const resp = await appFetch({
      url: API.application,
      method: 'POST',
      payLoad: JSON.stringify({
        ...personalInfo,
        ...familyInfo,
        ...data,
      }),
    })
    // handle response
    let message = ''
    if ((resp as { error: Error }).error) {
      message = `ERROR: ${(resp as { error: Error }).error.message}`
      setShowSnackbar(true)
      setTimeout(() => {
        setShowSnackbar(false)
        setSnackBarMsg('')
      }, 3000)
    } else {
      const msg = await (resp as Response).json()
      message = `New Application has been created successfully. Application Number is ${msg.application_number}.`
      localStorage.removeItem('personal_info')
      localStorage.removeItem('family_info')
    }
    setSnackBarMsg(message)
  }

  if (!showSnackbar && snackBarMsg) {
    return (
      <div className="desktopView">
        <div className="absolute left-1/3 top-1/3 border border-dotted p-8 grid space-y-8">
          <p>{snackBarMsg}</p>
          <Button variant="contained" onClick={() => setStage(1)}>
            Click here to create another application.
          </Button>
        </div>
      </div>
    )
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
            {t('save')}
          </Button>
          <Button variant="outlined" className="w-80 justify-self-end" onClick={handleBack}>
            {t('back')}
          </Button>
        </div>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        // message={snackBarMsg}
        // slotProps={{
        //   content: {
        //     className: 'bg-red-500 text-white text-xl',
        //   },
        // }}
      >
        <Alert severity="error">{snackBarMsg}</Alert>
      </Snackbar>
    </div>
  )
}

import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import { Alert, Button, Snackbar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { FormTextArea } from '../../ui/designsystem/Input'
import { HelpMeWrite } from './HelpMeWrite'
import type { SituationsDescriptionsType } from './situation-descriptions.types'
import { useStage } from '../../utils/setup/stage'
import { appFetch } from '../../utils/setup/fetch'
import { API, SITUATIONS } from '../../utils/constant'

export function SituationDescriptions() {
  const { setStage, setIsFormComplete } = useStage()
  const { t } = useTranslation()
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState('')
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SituationsDescriptionsType>({
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
      setIsFormComplete(true)
    }
    setSnackBarMsg(message)
  }

  if (!showSnackbar && snackBarMsg) {
    return (
      <div className="absolute w-full mx-auto">
        <div className="w-11/12 mx-auto lg:w-3xl p-2 mt-40 border border-dotted lg:p-8 grid space-y-8 text-center">
          <p>{snackBarMsg}</p>
          <Button
            variant="contained"
            onClick={() => {
              setStage(1)
              setIsFormComplete(false)
            }}
          >
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
      <form
        onSubmit={(e) => {
          e.stopPropagation()
          handleSubmit(onSubmit)
        }}
        className="grid space-y-6 mt-4 md:mt-8"
      >
        <div className="grid md:flex gap-4 items-end">
          <FormTextArea
            control={control}
            name="current_financial_situation"
            label={SITUATIONS.CURRENT_FINANCIAL}
            className="w-full md:w-2/3"
            rows={5}
            rules={{
              required: 'Current Financial Situation is required',
            }}
            error={errors['current_financial_situation']}
          />
          <HelpMeWrite
            type={SITUATIONS.CURRENT_FINANCIAL}
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
            label={SITUATIONS.EMPLOYMENT}
            className="w-full md:w-2/3"
            rows={5}
            rules={{
              required: 'Employment Circumstances is required',
            }}
            error={errors['employment_circumstances']}
          />
          <HelpMeWrite
            type={SITUATIONS.EMPLOYMENT}
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
            label={SITUATIONS.REASON}
            className="w-full md:w-2/3"
            rows={5}
            rules={{
              required: 'Reason For Applying is required',
            }}
            error={errors['reason_for_applying']}
          />
          <HelpMeWrite
            type={SITUATIONS.REASON}
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
        <div className="flex flex-wrap mx-auto justify-end flex-col-reverse md:flex-row gap-8">
          <Button type="submit" variant="contained" className="w-80 justify-self-end">
            {t('save')}
          </Button>
          <Button variant="outlined" className="w-80 justify-self-end" onClick={handleBack}>
            {t('back')}
          </Button>
        </div>
      </form>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={showSnackbar}>
        <Alert severity="error">{snackBarMsg}</Alert>
      </Snackbar>
    </div>
  )
}

import { useForm, type SubmitHandler, type FieldValues } from 'react-hook-form'
import { Button } from '@mui/material'

import { FormInput, FormTextArea } from '../../ui/designsystem/Input'
import { FormDesktopDate, FormMobileDate } from '../../ui/designsystem/DatePicker'
import { FormSelect } from '../../ui/designsystem/Select'
import { Gender } from './personal-info.service'
import type { IFormPersonalInfoType } from './personal-info.types'
import { useStage } from '../../utils/setup/stage'
import { useTranslation } from 'react-i18next'

export function PersonalInfoForm() {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormPersonalInfoType>({
    defaultValues: {
      name: '',
      national_id: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      country: '',
      phone: '',
      email: '',
    },
    mode: 'onChange',
  })
  // } = useForm<IFormPersonalInfoType>()
  const { setStage } = useStage()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log({ data })
    setStage((previousStage) => previousStage + 1)
  }
  return (
    <div className="desktopView">
      <h2 className="mt-4">Personal Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid justify-evenly md:justify-start my-12 gap-y-8">
        <FormInput control={control} name="name" label={t('person_name')} />
        <div className="grid md:flex md:flex-wrap gap-6">
          <FormInput control={control} name="national_id" label={t('national_id')} />
          <FormDesktopDate control={control} name="date_of_birth" label={t('dob')} />
          <FormMobileDate control={control} name="date_of_birth" label={t('dob')} />
          <FormSelect control={control} id="select-gender" name="gender" label="Gender" items={Gender} />
        </div>
        <div className="grid lg:flex gap-6">
          <FormTextArea control={control} name="address" label="Address" rows={6} />
          <div className="grid md:flex md:flex-wrap gap-6">
            <FormInput control={control} name="city" label="City" />
            <FormInput control={control} name="state" label="State" />
            <FormInput control={control} name="country" label="Country" />
          </div>
        </div>
        <div className="grid md:flex gap-6">
          <FormInput control={control} name="phone" label="Phone" />
          <FormInput control={control} name="email" label="EMail" />
        </div>
        <hr />
        <Button type="submit" variant="contained" className="w-80 justify-self-end">
          {t('next')}
        </Button>
      </form>
    </div>
  )
}

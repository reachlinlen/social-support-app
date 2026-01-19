import { useForm, type SubmitHandler, type FieldValues } from 'react-hook-form'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { useEffect } from 'react'

import { FormInput, FormTextArea } from '../../ui/designsystem/Input'
import { FormDesktopDate, FormMobileDate } from '../../ui/designsystem/DatePicker'
import { FormSelect } from '../../ui/designsystem/Select'
import { Gender } from './personal-info.service'
import type { IFormPersonalInfoType } from './personal-info.types'
import { useStage } from '../../utils/setup/stage'

export function PersonalInfoForm() {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormPersonalInfoType>({
    defaultValues: {
      name: '',
      national_id: '',
      date_of_birth: dayjs(undefined), // dayjs(new Date().toISOString().slice(0, 10)),
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
  const { setStage } = useStage()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    localStorage.setItem('personal_info', JSON.stringify({ ...data }))
    setStage((previousStage) => previousStage + 1)
  }

  useEffect(() => {
    if (localStorage.getItem('personal_info')) {
      const info = JSON.parse(localStorage.getItem('personal_info'))
      setValue('name', info.name)
      setValue('national_id', info.national_id)
      setValue('gender', info.gender)
      setValue('date_of_birth', dayjs(new Date(info.date_of_birth).toString()))
      setValue('address', info.address)
      setValue('city', info.city)
      setValue('state', info.state)
      setValue('country', info.country)
      setValue('phone', info.phone)
      setValue('email', info.email)
    }
  }, [setValue])

  return (
    <div className="desktopView">
      <h2 className="mt-4">Personal Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid justify-evenly md:justify-start my-12 gap-y-8">
        <FormInput control={control} name="name" label={t('person_name')} />
        <div className="grid md:flex md:flex-wrap gap-6">
          <FormInput
            control={control}
            name="national_id"
            label={t('national_id')}
            rules={{
              required: 'National ID is required',
              pattern: {
                value: /^784-?\d{4}-?\d{7}-?\d{1}$/g,
                message: 'Invalid pattern',
              },
            }}
            error={errors['national_id']}
          />
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
          <FormInput control={control} name="email" label="EMail" type="email" />
        </div>
        <hr />
        <Button type="submit" variant="contained" className="w-80 justify-self-end">
          {t('next')}
        </Button>
      </form>
    </div>
  )
}

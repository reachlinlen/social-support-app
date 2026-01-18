import { useForm, type SubmitHandler, type FieldValues } from 'react-hook-form'
import { Button } from '@mui/material'

import { FormInput, FormTextArea } from '../../ui/designsystem/Input'
import { FormDesktopDate, FormMobileDate } from '../../ui/designsystem/DatePicker'
import { FormSelect } from '../../ui/designsystem/Select'
import { Gender } from './personal-info.service'
import type { IFormPersonalInfoType } from './personal-info.types'

export function PersonalInfoForm() {
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
  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log({ data })
  return (
    <div className="desktopView">
      <h1>Social Support Application</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid justify-start my-12 gap-y-8">
        <FormInput control={control} name="name" label="Name" />
        <div className="grid md:flex md:flex-wrap gap-6">
          <FormInput control={control} name="national_id" label="National ID" />
          <FormDesktopDate control={control} name="date_of_birth" label="Date of Birth" />
          <FormMobileDate control={control} name="date_of_birth" label="Date of Birth" />
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
        <FormInput control={control} name="phone" label="Phone" />
        <FormInput control={control} name="email" label="EMail" />
        <hr />
        <Button type="submit" variant="contained" className="w-80 justify-self-end">
          Next
        </Button>
      </form>
    </div>
  )
}

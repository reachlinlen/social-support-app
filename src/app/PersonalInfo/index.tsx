import { useForm } from 'react-hook-form'
import type { IFormPersonalInfoType } from './personal-info.types'
import { FormInput } from '../../designsystem/Input'
import { FormDesktopDate, FormMobileDate } from '../../designsystem/DatePicker'

export function PersonalInfoForm() {
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<IFormPersonalInfoType>()
  const onSubmit = () => console.log('hi')
  return (
    <div className="desktopView">
      <h1>Social Support Application</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid justify-start mt-12">
        <FormInput control={control} name="name" label="Name" />
        <div className="grid md:flex md:flex-wrap gap-6 mt-8">
          <FormInput control={control} name="national_id" label="National ID" />
          <FormDesktopDate control={control} name="date_of_birth" label="Date of Birth" />
          <FormMobileDate control={control} name="date_of_birth" label="Date of Births" />
          <FormInput control={control} name="phone" label="Phone" />
          <FormInput control={control} name="email" label="EMail" />
        </div>
      </form>
    </div>
  )
}

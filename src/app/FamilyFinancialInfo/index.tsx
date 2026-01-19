import { useForm, type SubmitHandler, type FieldValues, useFieldArray } from 'react-hook-form'
import { Button } from '@mui/material'
import { IconPlus, IconTrashFilled } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

import { FormSelect } from '../../ui/designsystem/Select'
import { useStage } from '../../utils/setup/stage'
import type { IFormFamilyFinancialInfoType } from './family-financial.types'
import { EmploymentStatus, HousingStatus, MaritalStatus, NEW_DEPENDENT } from './family-financial.service'
import { FormInput } from '../../ui/designsystem/Input'

export function FamilyFinancialInfo() {
  const { setStage } = useStage()
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormFamilyFinancialInfoType>({
    defaultValues: {
      marital_status: '',
      dependents: [NEW_DEPENDENT],
      employment_status: '',
      monthly_income: undefined,
      housing_status: '',
    },
    mode: 'onChange',
  })
  const { fields: dependentFields, append, remove } = useFieldArray({ name: 'dependents', control })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const dependents = data.dependents.filter(({ relationship }: { relationship: string }) => relationship != '')
    localStorage.setItem('family_info', JSON.stringify({ ...data, dependents }))
    setStage((previousStage) => previousStage + 1)
  }

  const handleBack = () => {
    setStage((previousStage) => previousStage - 1)
  }

  useEffect(() => {
    if (localStorage.getItem('family_info')) {
      const finalcialInfo = JSON.parse(localStorage.getItem('family_info'))
      const dependents = finalcialInfo.dependents.length == 0 ? [NEW_DEPENDENT] : finalcialInfo.dependents
      setValue('marital_status', finalcialInfo.marital_status)
      setValue('dependents', dependents)
      setValue('employment_status', finalcialInfo.employment_status)
      setValue('monthly_income', finalcialInfo.monthly_income)
      setValue('housing_status', finalcialInfo.housing_status)
    }
  }, [setValue])

  return (
    <div className="desktopView">
      <h2 className="hidden md:block mt-8">Family & Financial Information</h2>
      <h3 className="block md:hidden mt-8 text-center">Family & Financial Information</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="grid justify-evenly md:justify-start gap-8">
        <div className="grid md:flex md:flex-wrap justify-evenly md:justify-start my-12 gap-8">
          <FormSelect
            control={control}
            id="select-marital-status"
            name="marital_status"
            label="Marital Status"
            items={MaritalStatus}
            rules={{
              required: 'Marital Status is required',
            }}
            error={errors['marital_status']}
          />
          <FormSelect
            control={control}
            id="select-employment-status"
            name="employment_status"
            label="Employment Status"
            items={EmploymentStatus}
            rules={{
              required: 'Employment Status is required',
            }}
            error={errors['employment_status']}
          />
          <FormSelect
            control={control}
            id="select-housing-status"
            name="housing_status"
            label="Housing Status"
            items={HousingStatus}
            rules={{
              required: 'Housing Status is required',
            }}
            error={errors['housing_status']}
          />
        </div>
        <div className="grid space-y-4">
          <h3>DEPENDENTS</h3>
          {dependentFields.map((field, fieldIndex) => {
            return (
              <div key={field.id} className="grid md:flex gap-4">
                <FormInput control={control} name={`dependents.${fieldIndex}.relationship`} label="Relationship" />
                <FormInput control={control} name={`dependents.${fieldIndex}.name`} label="Name" />
                <hr className="md:hidden" />
                <div className="min-w-20 flex flex-start self-end gap-x-2">
                  {fieldIndex == dependentFields.length - 1 && (
                    <button
                      className="rounded-md bg-white border border-primary focus-visible:outline-none! p-1 hover:text-white hover:bg-blue-600 text-primary size-9 grid justify-center content-center"
                      onClick={(e) => {
                        e.stopPropagation()
                        append(NEW_DEPENDENT)
                      }}
                    >
                      <IconPlus width={25} height={25} strokeWidth={3} />
                    </button>
                  )}
                  {fieldIndex != 0 && (
                    <button
                      className="hover:bg-blue-600 rounded-md bg-white border border-destructive focus-visible:outline-none! p-1 hover:text-white text-destructive size-9 grid justify-center content-center"
                      onClick={(e) => {
                        e.stopPropagation()
                        remove(fieldIndex)
                      }}
                    >
                      <IconTrashFilled width={20} height={20} strokeWidth={1} />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <hr />
        <div className="flex flex-wrap justify-end flex-col-reverse md:flex-row gap-8">
          <Button type="submit" variant="contained" className="w-80 justify-self-end">
            {t('next')}
          </Button>
          <Button variant="outlined" className="w-80 justify-self-end" onClick={handleBack}>
            {t('back')}
          </Button>
        </div>
      </form>
    </div>
  )
}

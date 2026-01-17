import dayjs from 'dayjs'
import { Controller, type Control, type FieldValues } from 'react-hook-form'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { cn } from '../../utils'

export function FormDesktopDate({
  control,
  name,
  label,
  date = new Date(),
  isRequired = true,
  className,
}: {
  control: Control<FieldValues, any, FieldValues>
  name: string
  label: string
  date?: Date
  isRequired?: boolean
  className?: string
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired }}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label={label}
            defaultValue={dayjs(date)}
            {...field}
            format="LL"
            className={cn('min-w-80 max-w-80 hidden lg:block', className)}
          />
        </LocalizationProvider>
      )}
    />
  )
}

export function FormMobileDate({
  control,
  name,
  label,
  date = new Date(),
  isRequired = true,
  className,
}: {
  control: Control<FieldValues, any, FieldValues>
  name: string
  label: string
  date?: Date
  isRequired?: boolean
  className?: string
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired }}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label={label}
            defaultValue={dayjs(date)}
            {...field}
            format="LL"
            className={cn('min-w-80 max-w-80 lg:hidden', className)}
          />
        </LocalizationProvider>
      )}
    />
  )
}

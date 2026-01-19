import { Controller, type Control } from 'react-hook-form'
import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { cn } from '../../utils'

export function FormDesktopDate({
  control,
  name,
  label,
  isRequired = true,
  className,
  disableFuture = true,
}: {
  control: Control | any
  name: string
  label: string
  isRequired?: boolean
  className?: string
  disableFuture?: boolean
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired }}
      render={({ field }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              value={field.value}
              label={label}
              format="LL"
              onChange={field.onChange}
              className={cn('min-w-80 max-w-80 hidden lg:block', className)}
              disableFuture={disableFuture}
            />
          </LocalizationProvider>
        )
      }}
    />
  )
}

export function FormMobileDate({
  control,
  name,
  label,
  isRequired = true,
  className,
}: {
  control: Control | any
  name: string
  label: string
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
            value={field.value}
            label={label}
            format="LL"
            onChange={field.onChange}
            className={cn('min-w-80 max-w-80 lg:hidden', className)}
          />
        </LocalizationProvider>
      )}
    />
  )
}

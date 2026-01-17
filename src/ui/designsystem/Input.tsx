import { TextField } from '@mui/material'
import { Controller, type Control, type FieldValues } from 'react-hook-form'
import { cn } from '../../utils'

export function FormInput({
  control,
  name,
  label,
  isRequired = true,
  className,
}: {
  control: Control<FieldValues, any, FieldValues>
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
        <TextField
          variant="outlined"
          label={label}
          required={isRequired}
          {...field}
          className={cn('min-w-80 max-w-80', className)}
        />
      )}
    />
  )
}

export function FormTextArea({
  control,
  name,
  label,
  rows = 3,
  isRequired = true,
  className,
}: {
  control: Control<FieldValues, any, FieldValues>
  name: string
  label: string
  rows?: number
  isRequired?: boolean
  className?: string
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired }}
      render={({ field }) => (
        <TextField
          variant="outlined"
          label={label}
          required={isRequired}
          multiline
          rows={rows}
          {...field}
          className={cn('min-w-80 max-w-80', className)}
        />
      )}
    />
  )
}

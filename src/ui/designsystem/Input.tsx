import { TextField } from '@mui/material'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { cn } from '../../utils'

export function FormInput({
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
      render={({ field }) => {
        return (
          <TextField
            variant="outlined"
            label={label}
            onChange={field.onChange}
            required={isRequired}
            className={cn('min-w-80 max-w-80', className)}
          />
        )
      }}
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
  control: Control | any
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
      render={({ field, fieldState }) => (
        <TextField
          helperText={fieldState.error?.message}
          variant="outlined"
          label={label}
          required={isRequired}
          multiline
          rows={rows}
          onChange={field.onChange}
          className={cn('min-w-80 max-w-80', className)}
        />
      )}
    />
  )
}

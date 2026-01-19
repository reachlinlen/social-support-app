import { TextField } from '@mui/material'
import { Controller, type Control, type FieldError } from 'react-hook-form'
import { cn } from '../../utils'
import type { ComponentPropsWithoutRef } from 'react'
import { FormError } from '../../components/FormError'

interface InputGroupProps extends ComponentPropsWithoutRef<'input'> {
  label: string
  control: Control | any
  name: string
  isRequired?: boolean
  rows?: number
  className?: string
  rules?: {
    [key: string]: string | number | { value: RegExp; message: string }
  }
  type?: string
  error?: FieldError | undefined
}

export function FormInput({
  control,
  name,
  label,
  isRequired = true,
  className,
  rules = {},
  type = 'text',
  error,
}: InputGroupProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired, ...rules }}
      render={({ field }) => {
        return (
          <div className="">
            <TextField
              variant="outlined"
              label={label}
              type={type}
              value={field.value}
              onChange={field.onChange}
              required={isRequired}
              className={cn('min-w-80 max-w-80', className)}
              error={!!error?.type}
            />
            {error && <FormError label={label} error={error} />}
          </div>
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
  ...rest
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
          value={field.value}
          onChange={field.onChange}
          className={cn('min-w-80 max-w-80', className)}
          {...rest}
        />
      )}
    />
  )
}

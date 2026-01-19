import { TextField } from '@mui/material'
import { Controller, type Control, type FieldError } from 'react-hook-form'
import { cn } from '../../utils'
import type { ComponentPropsWithoutRef } from 'react'
import { FormError } from '../../components/FormError'

interface InputGroupProps extends ComponentPropsWithoutRef<'input'> {
  label: string
  control: Control | any
  name: string
  rows?: number
  className?: string
  rules?: {
    [key: string]: string | number | { value: RegExp; message: string }
  }
  type?: string
  error?: FieldError | undefined
}

export function FormInput({ control, name, label, className, rules = {}, type = 'text', error }: InputGroupProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        return (
          <div>
            <TextField
              variant="outlined"
              label={label}
              type={type}
              value={field.value}
              onChange={field.onChange}
              required={!!rules.required}
              className={cn('min-w-80 max-w-80', className)}
              error={!!error?.type}
            />
            <FormError label={label} error={error} />
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
  className,
  rules = {},
  type = 'text',
  error,
}: {
  control: Control | any
  name: string
  label: string
  rows?: number
  className?: string
  rules?: {
    [key: string]: string | number | { value: RegExp; message: string }
  }
  type?: string
  error?: FieldError | undefined
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={cn('w-full', className)}>
          <TextField
            helperText={fieldState.error?.message}
            variant="outlined"
            label={label}
            required={!!rules.required}
            multiline
            type={type}
            rows={rows}
            value={field.value}
            onChange={field.onChange}
            fullWidth
          />
          <FormError label={label} error={error} />
        </div>
      )}
    />
  )
}

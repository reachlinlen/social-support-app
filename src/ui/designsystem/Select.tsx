import { Controller, type Control, type FieldError } from 'react-hook-form'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import { InputLabel, MenuItem } from '@mui/material'

import { cn } from '../../utils'
import { FormError } from '../../components/FormError'

export function FormSelect({
  control,
  name,
  id,
  label,
  items,
  className,
  rules = {},
  error,
}: {
  control: Control | any
  name: string
  id: string
  label: string
  items: {
    [key: string]: string
  }
  className?: string
  rules?: {
    [key: string]: string | number
  }
  error?: FieldError | undefined
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div>
          <FormControl className={cn('min-w-80 max-w-80', className)}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select label={label} value={field.value} onChange={field.onChange} required={!!rules.required}>
              {Object.keys(items).map((k) => (
                <MenuItem key={k} value={k}>
                  {items[k]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormError label={label} error={error} />
        </div>
      )}
    />
  )
}

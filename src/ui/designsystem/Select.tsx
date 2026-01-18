import { Controller, type Control } from 'react-hook-form'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import { InputLabel, MenuItem } from '@mui/material'

import { cn } from '../../utils'

export function FormSelect({
  control,
  name,
  id,
  label,
  items,
  // handleChange,
  isRequired = true,
  className,
}: {
  control: Control | any
  name: string
  id: string
  label: string
  items: {
    [key: string]: string
  }
  // handleChange: (event: SelectChangeEvent) => void
  isRequired?: boolean
  className?: string
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired }}
      render={({ field }) => (
        <FormControl className={cn('min-w-80 max-w-80', className)}>
          <InputLabel id={id}>{label}</InputLabel>
          <Select label={label} value={field.value} onChange={field.onChange} required={isRequired}>
            {Object.keys(items).map((k) => (
              <MenuItem key={k} value={k}>
                {items[k]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  )
}

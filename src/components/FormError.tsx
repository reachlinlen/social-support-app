import type { FieldError } from 'react-hook-form'

export function FormError({ error, label }: { label: string; error: FieldError | undefined }) {
  switch (error?.type) {
    case 'required':
      return <p role="alert">{error.message}</p>
    case 'minLength':
      return <p role="alert">Minimum length is required</p>
    case 'maxLength':
      return <p role="alert">{label} exceeds Maximum length</p>
    case 'pattern':
      return <p role="alert">{error.message}</p>
    case 'min':
      return <p role="alert">Value should be greater than minimum</p>
    case 'max':
      return <p role="alert">Value should be less than maximum</p>
    // case 'validate':
    default:
      return null
    // return (
    //   <p role="alert">
    //     {label} issue in {error.type} condition
    //   </p>
    // )
  }
}

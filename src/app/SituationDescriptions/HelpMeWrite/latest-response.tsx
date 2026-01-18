import { Button } from '@mui/material'
import { useState } from 'react'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import { FormTextArea } from '../../../ui/designsystem/Input'

export function LatestResponse({
  response,
  handleAccept,
  handleClose,
}: {
  response: string
  handleAccept: (a: string) => void
  handleClose: () => void
}) {
  console.log({ response })
  const { control, handleSubmit } = useForm<{ response: string }>({
    defaultValues: {
      response,
    },
    mode: 'onChange',
  })
  const [isEdit, setIsEdit] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleAccept(data.response)
  }

  return (
    <div className="grid space-y-6 mt-4 md:mt-8">
      <form onSubmit={handleSubmit(onSubmit)} className="grid space-y-6 mt-4 md:mt-8">
        <FormTextArea
          control={control}
          name="response"
          rows={5}
          className={'min-w-5/6 mt-4'}
          label="Latest AI Response"
          disabled={!isEdit}
        />
        <div className="flex flex-col gap-4 md:flex-row">
          <Button type="submit" variant="contained" className="w-20">
            ACCEPT
          </Button>
          <Button variant="outlined" onClick={() => setIsEdit(true)} className="w-20">
            EDIT
          </Button>
          <Button variant="outlined" onClick={handleClose} className="w-20">
            DISCARD
          </Button>
        </div>
      </form>
    </div>
  )
}

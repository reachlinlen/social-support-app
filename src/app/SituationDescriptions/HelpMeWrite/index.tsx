import { Button, Dialog, DialogTitle, Paper, DialogContent } from '@mui/material'
import { useState } from 'react'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import { FormTextArea } from '../../../ui/designsystem/Input'

import { callAPI } from '../situation-description.service'

export function HelpMeWrite() {
  const [open, setOpen] = useState(false)
  const [interaction, setInteraction] = useState<
    {
      prompt: string
      response: string
    }[]
  >([
    // {
    //   prompt: 'How',
    //   response: 'Surely I can help you',
    // },
    // {
    //   prompt: 'How',
    //   response: 'Surely I can help you',
    // },
  ])
  const { control, handleSubmit } = useForm<{ prompt: string }>({
    defaultValues: {
      prompt: '',
    },
    mode: 'onChange',
  })
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    // onClose(selectedValue);
    setOpen(false)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log({ data })
    const response = await callAPI(data.prompt)
    if (response) {
      interaction.push({
        prompt: data.prompt,
        response,
      })
      setInteraction([...interaction])
    }
  }

  return (
    <div className="col-span-1">
      <Button variant="outlined" onClick={handleClickOpen} className="h-9 self-end">
        Help Me Write
      </Button>
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={'md'} scroll="paper">
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Hey AI, Help me to fill this form...
        </DialogTitle>
        <DialogContent>
          <div className="desktopView">
            {/* Old Prompts & their responses */}
            <div className="grid gap-8">
              {interaction.map((interaction) => {
                return (
                  <div key={interaction.prompt} className="max-w-5/6">
                    <Paper elevation={1}>
                      <p>Prompt: {interaction.prompt}</p>
                      <p>Response: {interaction.response}</p>
                    </Paper>
                  </div>
                )
              })}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid space-y-6 mt-4 md:mt-8">
              <div className="flex gap-x-4">
                <FormTextArea
                  control={control}
                  name="prompt"
                  label="Enter a Prompt to request AI to give suggestions..."
                  rows={3}
                  className={'min-w-5/6'}
                />
                <Button type="submit" variant="outlined" className="min-w-20 max-w-20 h-9 self-end">
                  Ask AI
                </Button>
              </div>
            </form>
          </div>
          <Button variant="outlined" onClick={handleClose} className="min-w-20 max-w-20 mt-2">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

import { Button, Dialog, DialogTitle, Paper, DialogContent } from '@mui/material'
import { useState } from 'react'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'

import { FormTextArea } from '../../../ui/designsystem/Input'
import { callOpenAI } from '../situation-description.service'
import { LatestResponse } from './latest-response'
import type { AIInteractionType } from '../situation-descriptions.types'
import { SITUATIONS } from '../../../utils/constant'

export function HelpMeWrite({
  type,
  handleAccept,
}: {
  type: string
  handleAccept: (acceptedResponse: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [latestResponse, setLatestResponse] = useState<string | undefined>(undefined)
  const [AIInteractionHistory, setAIInteractionHistory] = useState<AIInteractionType>({
    [SITUATIONS.CURRENT_FINANCIAL]: [],
    [SITUATIONS.EMPLOYMENT]: [],
    [SITUATIONS.REASON]: [],
  })
  const { control, handleSubmit, setValue, formState } = useForm<{ prompt: string }>({
    defaultValues: {
      prompt: '',
    },
    mode: 'onChange',
  })

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setValue('prompt', '', {
      shouldValidate: true,
      shouldDirty: true,
    })
    setOpen(false)
  }

  const handleAcceptClick = (acceptedResponse: string) => {
    setOpen(false)
    setLatestResponse(undefined)
    setValue('prompt', '', {
      shouldValidate: true,
      shouldDirty: true,
    })
    handleAccept(acceptedResponse)
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await callOpenAI(data.prompt)
    if (response) {
      AIInteractionHistory[type].push({
        prompt: data.prompt,
        response,
      })
      setAIInteractionHistory({ ...AIInteractionHistory })
      setLatestResponse(response)
    }
  }

  const ShowInteraction = () => {
    return (
      <>
        <div className="desktopView">
          {/* Old Prompts & their responses */}
          <div className="grid gap-8">
            {AIInteractionHistory[type].map((interaction) => {
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
            <div className="flex flex-col sm:flex-row gap-4">
              <FormTextArea
                control={control}
                name="prompt"
                label={type}
                placeholder={`Enter a Prompt to request AI to give suggestions for ${type}`}
                rows={3}
                className={'min-w-5/6'}
              />
              <Button
                type="submit"
                variant="outlined"
                className="min-w-20 max-w-20 h-9 self-end"
                disabled={formState.isSubmitting} // To remove double submit issues
              >
                Ask AI
              </Button>
            </div>
          </form>
        </div>
        <Button variant="outlined" onClick={handleClose} className="min-w-20 max-w-20 mt-2">
          Close
        </Button>
      </>
    )
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
          {latestResponse ?
            <LatestResponse
              response={latestResponse}
              handleAccept={handleAcceptClick}
              handleClose={() => setLatestResponse(undefined)}
            />
          : <ShowInteraction />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

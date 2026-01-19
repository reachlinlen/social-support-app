import { Button, TextField } from '@mui/material'
import { useState } from 'react'

export function LatestResponse({
  response,
  handleAccept,
  handleClose,
}: {
  response: string
  handleAccept: (a: string) => void
  handleClose: () => void
}) {
  const [newResponse, setNewResponse] = useState(response)
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className="grid space-y-6 mt-4 md:mt-8">
      {isEdit ?
        <TextField
          variant="outlined"
          label="Latest AI Response"
          multiline
          rows={6}
          value={newResponse}
          onChange={(e) => setNewResponse(e.target.value)}
          fullWidth
        />
      : <p>{response}</p>}
      <div className="flex gap-4 flex-row flex-wrap">
        <Button
          variant="contained"
          className="w-20"
          onClick={(e) => {
            e.preventDefault()
            handleAccept(response)
          }}
        >
          ACCEPT
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => {
            e.preventDefault()
            setIsEdit(true)
          }}
          className="w-20"
        >
          EDIT
        </Button>
        <Button
          variant="outlined"
          onClick={(e) => {
            e.preventDefault()
            handleClose()
          }}
          className="w-20"
        >
          DISCARD
        </Button>
      </div>
    </div>
  )
}

import { Button, Dialog } from '@mui/material'
import { useState } from 'react'

export function HelpMeWrite({ callAPI }: { callAPI: () => void }) {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
    callAPI()
  }
  const handleClose = () => {
    // onClose(selectedValue);
  }
  return (
    <div className="col-span-1">
      <Button variant="outlined" onClick={handleClickOpen} className="h-9 self-end">
        Help Me Write
      </Button>
      <Dialog onClose={handleClose} open={open}></Dialog>
    </div>
  )
}

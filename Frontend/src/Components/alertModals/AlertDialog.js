import React from 'react'
import DialogActions from '@material-ui/core/DialogActions'; 
import DialogContent from '@material-ui/core/DialogContent'; 
import DialogTitle from '@material-ui/core/DialogTitle'; 
import DialogContentText from '@material-ui/core/DialogContentText'; 
import Dialog from '@material-ui/core/Dialog'; 
import Button from '@material-ui/core/Button'; 

function AlertDialog({open,handleClose,text,handleEvent}) {
  return (
    <Dialog open={open} onClose={handleClose}>
       <DialogTitle>
         Please confirm
       </DialogTitle>
       <DialogContent> 
          <DialogContentText> 
          {text}
          </DialogContentText> 
      </DialogContent> 
      <DialogActions> 
          <Button onClick={handleClose} color="primary"> 
           Close 
          </Button> 
          <Button onClick={handleEvent} style={{background:'red',color:'white',border:'none'}} autoFocus> 
           Yes 
          </Button> 
      </DialogActions> 
    </Dialog>

  )
}

export default AlertDialog

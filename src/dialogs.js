import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


//export default function FormDialog() {
export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
    const {id,title,author}=data;
 
  /*
   const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };*/

  return (
    <div>
        {/**
         *      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
         */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {id?"Mise à jour d'un post":"Création nouveau post"}
        </DialogTitle>
        <DialogContent>
            <form>
                <TextField id="title" value={title} onChange={(e)=>onChange(e)} placeholder="saisir le titre" label="title" fullWidth margin="dense"/>
                <br/>
                <TextField id="author" value={author} onChange={(e)=>onChange(e)} placeholder="saisir l'auteur" label="author" fullWidth margin="dense"/>

            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">Cancel</Button>
          <Button color="primary" variant="contained" onClick={()=>handleFormSubmit(data)} autoFocus>
            {id?"Update":"Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

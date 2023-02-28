import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';


const ConfirmDialog = ({
  isOpen,
  onConfirm,
  onClose,
  maxHeight = 435,
  title,
  description
}) => {

  const handleOk = () => {
    onConfirm();
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '90%', maxHeight } }}
      maxWidth='xs'
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {description}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;

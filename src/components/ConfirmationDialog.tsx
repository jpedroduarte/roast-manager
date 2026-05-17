import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmationDialog = ({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 2,
          padding: 1,
          minWidth: { xs: '90%', sm: 400 }
        }
      }}
    >
      <DialogTitle id="confirmation-dialog-title" sx={{ fontWeight: 700 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          <Typography variant="body1" color="text.secondary">
            {message}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 2, gap: 1 }}>
        <Button 
          onClick={onCancel} 
          variant="text" 
          color="inherit"
          sx={{ fontWeight: 600 }}
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={isDestructive ? 'error' : 'primary'}
          autoFocus
          sx={{ 
            fontWeight: 700,
            px: 3,
            boxShadow: isDestructive ? '0 4px 12px rgba(211, 47, 47, 0.2)' : 'none'
          }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

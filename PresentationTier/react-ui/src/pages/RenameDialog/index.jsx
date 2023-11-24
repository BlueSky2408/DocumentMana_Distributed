import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";

const RenameDialog = ({ open, onClose, documentName, onRenameConfirm, onNameChange }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New Name"
                    type="text"
                    fullWidth
                    defaultValue={documentName}
                    onChange={(e) => onNameChange(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onRenameConfirm}>Rename</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RenameDialog;
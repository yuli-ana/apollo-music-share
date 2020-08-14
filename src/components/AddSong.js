import React, { useState } from 'react';
import { TextField, InputAdornment, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Link, AddBoxOutlined } from '@material-ui/icons';

function AddSong() {
    const [dialog, setDialog] = useState(false);


    // Open dialog
    function handleDialog(e) {
        e.preventDefault();
        setDialog(true);
    }

    // Close dialog
    function handleCloseDialog() {
        setDialog(false);
    }

    return (
        <div>
            <Dialog
                open={dialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img
                        src="https://picsum.photos/200"
                        alt="Song thumbnail" />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                </DialogActions>
                <TextField
                    margin="dense"
                    name="title"
                    label="Title"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="artist"
                    label="Artist"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    name="thumbnail"
                    label="Thumbnail"
                    fullWidth
                />
            </Dialog>
            <TextField
                placeholder="Add Youtube or Soundcloud url"
                fullWidth
                margin="normal"
                type="url"
                inputProps={{
                    startAdornment: (
                        <InputAdornment>
                            <Link />
                        </InputAdornment>
                    )
                }}
            />
            <Button
                onClick={handleDialog}
                variant="contained"
                color="primary"
                endIcon={<AddBoxOutlined />}
            >
                Add
            </Button>
        </div>
    )
}

export default AddSong;
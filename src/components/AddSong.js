import React, { useState, useEffect } from 'react';
import {
    TextField,
    InputAdornment,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    makeStyles
} from '@material-ui/core';
import { Link, AddBoxOutlined } from '@material-ui/icons';
import SoundcloudPlayer from 'react-player/lib/players/SoundCloud';
import YoutubePlayer from 'react-player/lib/players/YouTube';

// Custom styles 
const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        alignItems: 'center'
    },
    urLInput: {
        margin: theme.spacing(1),
    },
    addSongButton: {
        margin: theme.spacing(1),
    },
    dialog: {
        textAlign: 'center'
    },
    thumbnail: {
        width: '90%'
    }

}))

function AddSong() {
    const [url, setUrl] = useState('');
    const [playable, setPlayable] = useState(false);
    const classes = useStyles();
    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        const isPlayable = SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);

        setPlayable(isPlayable);
    }, [url])


    // Open dialog
    function handleDialog(e) {
        e.preventDefault();
        setDialog(true);
    }

    function handleUrlChange(e) {
        setUrl(e.target.value);
    }

    // Close dialog
    function handleCloseDialog() {
        setDialog(false);
    }

    return (
        <div className={classes.container}>
            <Dialog
                className={classes.dialog}
                open={dialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>Edit Song</DialogTitle>
                <DialogContent>
                    <img
                        src="https://picsum.photos/200"
                        alt="Song thumbnail"
                        className={classes.thumbnail}
                    />
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
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                    >
                        Add Song
                    </Button>
                </DialogActions>
            </Dialog>
            <TextField
                className={classes.urLInput}
                onChange={handleUrlChange}
                value={url}
                placeholder="Add Youtube or Soundcloud url"
                fullWidth
                margin="normal"
                type="url"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Link />
                        </InputAdornment>
                    )
                }}
            />
            <Button
                disabled={!playable}
                className={classes.addSongButton}
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
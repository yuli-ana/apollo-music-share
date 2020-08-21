import React, { useState, useEffect } from 'react';
import QueuedSongList from './QueuedSongList';
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
import ReactPlayer from 'react-player';

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
    const [song, setSong] = useState({
        duration: 0,
        title: "",
        artist: "",
        thumbnail: ""
    })

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

    async function handleEditSong({ player }) {
        const nestedPlayer = player.player.player;
        let songData;

        if (nestedPlayer.getVideoData) {
            songData = getYouTubeInfo(nestedPlayer);
        } else if (nestedPlayer.getCurrentSound) {
            songData = await getSoundCloudInfo(nestedPlayer);
        }

        setSong({ ...songData, url });

    }

    function getYouTubeInfo(player) {
        const duration = player.getDuration();
        const { title, video_id, author } = player.getVideoData();
        const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;

        return {
            duration,
            title,
            artist: author,
            thumbnail
        }
    }

    function getSoundCloudInfo(player) {
        return new Promise(resolve => {
            player.getCurrentSound(songData => {
                if (songData) {
                    resolve({
                        duration: Number(songData.duration / 1000),
                        title: songData.title,
                        artist: songData.user.username,
                        thumbnail: songData.artwork_url.replace('-large', '-t500x500')
                    })
                }
            });
        })
    }

    function handleAddSong() {
        return (
            <QueuedSongList song={song} />
        )
    }

    function handleChangeSong(e) {
        const { name, value } = e.target;
        setSong(prevSong => ({
            ...prevSong,
            [name]: value
        }))
    }

    const { title, artist, thumbnail } = song;

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
                        src={thumbnail}
                        alt="Song thumbnail"
                        className={classes.thumbnail}
                    />
                    <TextField
                        onChange={handleChangeSong}
                        margin="dense"
                        name="title"
                        label="Title"
                        value={title}
                        fullWidth
                    />
                    <TextField
                        onChange={handleChangeSong}
                        margin="dense"
                        name="artist"
                        label="Artist"
                        value={artist}
                        fullWidth
                    />
                    <TextField
                        onChange={handleChangeSong}
                        margin="dense"
                        name="thumbnail"
                        label="Thumbnail"
                        value={thumbnail}
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
                        onClick={handleAddSong}
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
                // If the song isn't playable disable button
                disabled={!playable}
                className={classes.addSongButton}
                onClick={handleDialog}
                variant="contained"
                color="primary"
                endIcon={<AddBoxOutlined />}
            >
                Add
            </Button>
            <ReactPlayer url={url} hidden onReady={handleEditSong} />
        </div>
    )
}

export default AddSong;
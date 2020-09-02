import React, { useContext, useState } from 'react';
import QueuedSongList from './QueuedSongList';
import { Card, CardContent, Typography, IconButton, Slider, CardMedia, makeStyles } from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext, Pause } from '@material-ui/icons';
import { SongContext } from '../App';
import { useQuery } from '@apollo/client';
import { GET_QUEUED_SONGS } from '../graphQL/queries';
import ReactPlayer from 'react-player';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 15px',
    },
    content: {
        flex: '1 0 auto',
    },
    thumbnail: {
        width: 150,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    playIcon: {
        height: 38,
        width: 38 
    }
}))


function SongPlayer() {
    const { data } = useQuery(GET_QUEUED_SONGS);
    const { state, dispatch } = useContext(SongContext);
    const classes = useStyles();
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);


    function handleTogglePlay() {
        // Toggle state
        dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" })
    }

    function handleSeekMouseDown(){
        setSeeking(true);
    }

    function handleSeekMouseUp(){
        setSeeking(false);
    }

    function handleProgressChange(e, newValue){
        setPlayed(newValue);
    }

    return (
        <>
            <Card variant="outlined" className={classes.container}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component="h3">
                            {state.song.title}
                        </Typography>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            {state.song.title}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={handleTogglePlay}>
                            {/* Toggle icons */}
                            {state.isPlaying ? <Pause className={classes.playIcon} /> : <PlayArrow className={classes.playIcon} />}
                        </IconButton>
                        <IconButton>
                            <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            00:01:30
                        </Typography>
                    </div>
                    {/* Now slider is controlled by a state , I can't move it*/}
                    <Slider
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={handleSeekMouseUp}
                        onChange={handleProgressChange}
                        value={played}
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
                <ReactPlayer 
                    onProgress = {({ played, playedSeconds }) => {
                        setPlayed(played);
                    }}
                    url={state.song.url} 
                    playing={state.isPlaying} 
                    hidden />
                <CardMedia
                    className={classes.thumbnail}
                    image={state.song.thumbnail}
                />
            </Card>
            <QueuedSongList queue={data.queue} />
        </>
    )
}

export default SongPlayer;

// React player ((onProgress callback))
// { played, playedSeconds }  - played show users the song progress
import React, { useContext, useState, useRef, useEffect } from 'react';
import QueuedSongList from './QueuedSongList';
import { Card, CardContent, Typography, IconButton, Slider, CardMedia, makeStyles } from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext, Pause } from '@material-ui/icons';
import { SongContext } from '../App';
import { useQuery } from '@apollo/client';
import { GET_QUEUED_SONGS } from '../graphQL/queries';
import ReactPlayer from 'react-player';
import songReducer from '../reducer';

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
    const reactPlayerRef = useRef();
    const { state, dispatch } = useContext(SongContext);
    const classes = useStyles();
    const [played, setPlayed] = useState(0);
    const [playedSeconds, setPlayedSeconds] = useState(0);

    // Keeps track when the user seeking through the song changing the position of the slider
    const [seeking, setSeeking] = useState(false);
    const [positionInQueue, setPositionInQueue] = useState(0);


    useEffect(() => {
       const songIndex = data.queue.findIndex(song => song.id === state.song.id)

       setPositionInQueue(songIndex);
    }, [data.queue, state.song.id])


    console.log(data.queue);

    useEffect(() => {
        const nextSong = data.queue[positionInQueue + 1];

        if( played === 1 && nextSong ){
            setPlayed(0);
            dispatch({ type: "SET_SONG", payload: { song: nextSong }})
        }

     }, [data.queue, played, dispatch, positionInQueue]);

    function handleTogglePlay() {
        // Toggle state
        dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" })
    }

    function handleSeekMouseDown(){
        setSeeking(true);
    }
    
    function handleSeekMouseUp(){
        setSeeking(false);
        reactPlayerRef.current.seekTo(played);
    }

    function handleProgressChange(e, newValue){
        setPlayed(newValue);
    }

    function formatDuration(seconds){
        return new Date(seconds * 1000).toISOString().substr(11, 8);
    }

    function handlePlayNextSong(){
        const nextSong = data.queue[positionInQueue + 1];

        if(nextSong){
            dispatch({ type: "SET_SONG", payload: { song: nextSong } })
        }
    }

    function handlePlayPrevSong(){
        const prevSong = data.queue[positionInQueue - 1];

        // Check if it exists
        if(prevSong){
            dispatch({ type: "SET_SONG", payload: { song: prevSong } })
        }
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
                        <IconButton onClick={handlePlayPrevSong}>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={handleTogglePlay}>
                            {/* Toggle icons */}
                            {state.isPlaying ? <Pause className={classes.playIcon} /> : <PlayArrow className={classes.playIcon} />}
                        </IconButton>
                        <IconButton onClick={handlePlayNextSong}>
                            <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            {formatDuration(playedSeconds)}
                        </Typography>
                    </div>
                    {/* Now slider is controlled by a state , I can't move it*/}
                    <Slider
                    // Starts seeking
                        onMouseDown={handleSeekMouseDown}
                    // Done seeking
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
                    ref={reactPlayerRef}
                    onProgress = {({ played, playedSeconds }) => {
                        if( !seeking ) {
                        setPlayed(played);
                        setPlayedSeconds(playedSeconds);
                        }
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
import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress, Card, CardMedia, CardContent, Typography, CardActions, IconButton, makeStyles } from '@material-ui/core';
import { PlayArrow, Save, Pause } from '@material-ui/icons';
import { useSubscription } from '@apollo/client';
import { GET_SONGS } from '../graphQL/subscriptions';
import { SongContext } from '../App';

function SongList() {
    // Remove loading variable instead use hook useQuery
    // let loading = false;

    const { data, loading, error } = useSubscription(GET_SONGS);


    // If true show loading spinner
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 50
            }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) return <div>Error fetching songs</div>

    return <div>{data.songs.map(song => (
        <Song key={song.id} song={song} />
    ))}</div>;
}

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing()
    },
    songInfoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    songInfo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    thumbnail: {
        objectFit: 'cover',
        width: 140,
        height: 140
    }
}))

function Song({ song }) {
    const { title, artist, thumbnail, id } = song;
    const [currentSongPlaying, setCurrentSongPlaying] = useState(false);
    // Pass state to song component to use the same action for playButton 
    const { state } = useContext(SongContext);


    // function handlePlaySong() {
    //     dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" })
    // }

    useEffect(() => {
        const isSongPlaying = state.isPlaying && id === state.song.id;
        setCurrentSongPlaying(isSongPlaying);
        // I want to identify song with it's id that's why sync it with state.song.id
    }, [id, state.isPlaying, state.song.id])

    const classes = useStyles();

    return (
        <Card className={classes.container}>
            <div className={classes.songInfoContainer}>
                <CardMedia className={classes.thumbnail} image={thumbnail} />
                <div className={classes.songInfo}>
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body1" component="p" color="textSecondary">
                            {artist}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton size="small" color="primary">
                            {currentSongPlaying ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <IconButton size="small" color="secondary">
                            <Save color="secondary" />
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    )
}

export default SongList;
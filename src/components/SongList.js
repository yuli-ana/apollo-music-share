import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress, Card, CardMedia, CardContent, Typography, CardActions, IconButton, makeStyles } from '@material-ui/core';
import { PlayArrow, Save, Pause } from '@material-ui/icons';
import { useSubscription, useMutation } from '@apollo/client';
import { GET_SONGS } from '../graphQL/subscriptions';
import { SongContext } from '../App';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphQL/mutations';

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
    const { state, dispatch } = useContext(SongContext);
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE);

    useEffect(() => {
        const isSongPlaying = state.isPlaying && id === state.song.id;
        setCurrentSongPlaying(isSongPlaying);
    }, [id, state.isPlaying, state.song.id])

    const classes = useStyles();

    function handleTogglePlay() {
        dispatch({ type: "SET_SONG", payload: { song } })

        dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" })
    }

    function handleAddOrRemoveFromQueue() {
        // __typename field which provides the name of the type we're working with
        addOrRemoveFromQueue({
            variables: { input: { ...song, __typename: "Song" } },
        })
    }

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
                        <IconButton onClick={handleTogglePlay} size="small" color="primary">
                            {currentSongPlaying ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <IconButton onClick={handleAddOrRemoveFromQueue} size="small" color="secondary">
                            <Save color="secondary" />
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    )
}

export default SongList;
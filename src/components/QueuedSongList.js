import React from 'react';
import { Typography, Avatar, IconButton, makeStyles, useMediaQuery } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { useMutation } from '@apollo/client';
import { GET_QUEUED_SONGS } from '../graphQL/queries';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphQL/mutations';

function QueuedSongList({ queue }) {

    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

    return greaterThanMd && (
        <div style={{ margin: '10px 0' }}>
            <Typography color="textSecondary" variant="button">
                QUEUE ({queue.length})
            </Typography>
            {queue.map(song => (
                <QueuedSong key={song.id} song={song} />
            ))}
        </div>
    )
}

const useStyles = makeStyles({
    avatar: {
        width: 44,
        height: 44,
    },
    text: {
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gridGap: 12,
        alignItems: 'center',
        marginTop: 10
    },
    songInfoContainer: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
})


function QueuedSong({ song }) {
    const { title, artist, thumbnail } = song;
    const classes = useStyles();
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        onCompleted: data => {
            localStorage.setItem("queue", JSON.stringify(data.addOrRemoveFromQueue))
        }
    });


    function handleAddOrRemoveFromQueue() {
        // __typename field which provides the name of the type we're working with
        addOrRemoveFromQueue({
            variables: { input: { ...song, __typename: "Song" } },
        })
    }

    return (
        <div className={classes.container}>
            <Avatar src={thumbnail} className={classes.avatar} />
            <div className={classes.songInfoContainer}>
                <Typography className={classes.text} variant="subtitle2">
                    {title}
                </Typography>
                <Typography className={classes.text} color="textSecondary" variant="body2">
                    {artist}
                </Typography>
            </div>
            <IconButton onClick={handleAddOrRemoveFromQueue} >
                <Delete color="error" />
            </IconButton>
        </div>
    );

}

export default QueuedSongList;

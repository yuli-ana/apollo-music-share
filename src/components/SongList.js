import React from 'react';
import { CircularProgress, Card, CardMedia, CardContent, Typography, CardActions, IconButton } from '@material-ui/core';
import { PlayArrow, Save } from '@material-ui/icons';

function SongList() {
    let loading = false;

    const song = {
        title: "LUNE",
        artist: "MOON",
        thumbnail: "https://picsum.photos/id/237/100/100"
    }

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
        )
    }

    return <div>{Array.from({ length: 10 }, () => song).map((song, i) => (
        <Song key={i} song={song} />
    ))}</div>;
}

function Song({ song }) {
    const { title, artist, thumbnail } = song;

    return (
        <Card>
            <div>
                <CardMedia image={thumbnail} />
                <div>
                    <CardContent>
                        <Typography gatterBottom variant="h2" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body1" component="p" color="textSecondary">
                            {artist}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton size="small" color="primary">
                            <PlayArrow />
                        </IconButton>
                        <IconButton size="small" color="secondary">
                            <Save />
                        </IconButton>
                    </CardActions>
                </div>
            </div>
        </Card>
    )
}
export default SongList;
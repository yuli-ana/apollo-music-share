import React from 'react';
import QueuedSongList from './QueuedSongList';
import { Card, CardContent, Typography, IconButton, Slider, CardMedia } from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext } from '@material-ui/icons';

function SongPlayer() {
    return (
        <>
            <Card variant="outlined">
                <div>
                    <CardContent>
                        <Typography variant="h5" component="h3">
                            Title
                        </Typography>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            Artist
                        </Typography>
                    </CardContent>
                    <div>
                        <IconButton>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton>
                            <PlayArrow />
                        </IconButton>
                        <IconButton>
                            <SkipNext />
                        </IconButton>
                        <Typography variant="subtitle1" component="p" color="textSecondary">
                            00:01:30
                        </Typography>
                    </div>
                    <Slider
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </div>
                <CardMedia
                    image="https://picsum.photos/id/237/100/100"
                />
            </Card>
            <QueuedSongList />
        </>
    )
}

export default SongPlayer;
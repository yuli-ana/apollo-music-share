import React from 'react';
import { CircularProgress } from '@material-ui/core';

function SongList() {
    let loading = false;

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

    return (<div>Song List</div>)
}

export default SongList;
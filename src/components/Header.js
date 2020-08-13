import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import HeadsetTwoToneIcon from '@material-ui/icons/HeadsetTwoTone';

// Material UI allows to make a custom hook for each of our components, it will make it easy to pass own custom styles throughout the app

//makestyles function - holds all of the individual styles that I have for each part of the component


// Accepts an object
const useStyles = makeStyles(theme => ({
    title: {
        // marginLeft: '8px',
        marginLeft: theme.spacing(2),
    }
}));

function Header() {
    const classes = useStyles();

    return (
        // Header now has a primary color of teal comes from theme file
        <AppBar color="primary" position='fixed'>
            <Toolbar>
                <HeadsetTwoToneIcon />
                <Typography className={classes.title} variant="h6" component="h1">
                    Apollo Music Share
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
import React from 'react';
import Header from './components/Header';
import SongPlayer from './components/SongPlayer';
import SongList from './components/SongList';
import AddSong from './components/AddSong';
import { Grid, useMediaQuery, Hidden } from '@material-ui/core';

// Hide elements without conditions, using Hidden component
// Wrap component in a Hidden comp and specify on it at what breakpoint I want to be hidden on




function App() {
  // Media query breakpoint, hook comes from material-ui library
  // If min-width === 600px ? true : false 
  // const matches = useMediaQuery('(min-width: 600px)');

  // I can use the theme data as well as its built-in values to set specific breakpoints (down, up)
  const greaterThanSM = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

  /* {greaterThanSM && <Header />} */
  return (
    <>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid style={
          {
            paddingTop: greaterThanSM ? 80 : 10
          }
        } item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            greaterThanMd
              ?
              {
                position: 'fixed',
                width: '100%',
                top: 70,
                right: 0
              }
              : {
                position: 'fixed',
                width: '100%',
                left: 0,
                bottom: 0
              }
          }
          item
          xs={12}
          md={5}>
          <SongPlayer />
        </Grid>
      </Grid>
    </>
  )
}


export default App;
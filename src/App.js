import React from 'react';
import Header from './components/Header';
import SongPlayer from './components/SongPlayer';
import SongList from './components/SongList';
import AddSong from './components/AddSong';
import { Grid, useMediaQuery } from '@material-ui/core';





function App() {
  // Media query breakpoint, hook comes from material-ui library
  // If min-width === 600px ? true : false 
  // const matches = useMediaQuery('(min-width: 600px)');

  // I can use the theme data as well as its built-in values to set specific breakpoints (down, up)
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid style={{ paddingTop: 100 }} item xs={12} md={7}>
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
                bottom: 0,
                left: 0
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
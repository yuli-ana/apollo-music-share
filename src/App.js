import React from 'react';
import Header from './components/Header';
import SongPlayer from './components/SongPlayer';
import SongList from './components/SongList';
import AddSong from './components/AddSong';
import { Grid } from '@material-ui/core';





function App() {
  return (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid style={{ paddingTop: 100 }} item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid style={{
          position: 'fixed',
          width: '100%',
          top: 70,
          right: 0
        }}
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

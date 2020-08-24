import React from 'react';
import Header from './components/Header';
import SongPlayer from './components/SongPlayer';
import SongList from './components/SongList';
import AddSong from './components/AddSong';
import { Grid, useMediaQuery, Hidden } from '@material-ui/core';
import songReducer from './reducer';

// Hide elements without conditions, using Hidden component
// Wrap component in a Hidden comp and specify on it at what breakpoint I want to be hidden on


export const SongContext = React.createContext({
  song: {
    id: "3561c605-d486-44cb-9bba-d1beeb641778",
    title: "LUNE",
    artist: "MOON",
    thumbnail: "https://picsum.photos/id/237/100/100",
    duration: 250,
    url: "https://music.youtube.com/watch?v=--ZtUFsIgMk&feature=share"
  },
  isPlaying: false
})


function App() {

  const initialSongState = React.useContext(SongContext);

  const [state, dispatch] = React.useReducer(songReducer, initialSongState);

  // Media query breakpoint, hook comes from material-ui library
  // If min-width === 600px ? true : false 
  // const matches = useMediaQuery('(min-width: 600px)');

  // I can use the theme data as well as its built-in values to set specific breakpoints (down, up)
  const greaterThanSM = useMediaQuery(theme => theme.breakpoints.up('sm'));

  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

  /* {greaterThanSM && <Header />} */
  return (
    <SongContext.Provider value={{ state, dispatch }} >
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
    </SongContext.Provider>
  )
}


export default App;

// Create a new GraphQL app [apollo music share] => deploy
// 
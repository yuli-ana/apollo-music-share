import React from 'react';
import Header from './components/Header';
import SongPlayer from './components/SongPlayer';
import SongList from './components/SongList';
import AddSong from './components/AddSong';





function App() {
  return (
    <>
      <Header />
      <AddSong />
      <SongList />
      <SongPlayer />
    </>
  )
}

export default App;

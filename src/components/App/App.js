import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [
        {name: 'Purple Haze', artist: 'Jimi Hendrix', album: 'Are You Experienced', id: '1234'},
        {name: 'Purple Haze', artist: 'Jimi Hendrix', album: 'Are You Experienced', id: '1234'}
      ],

      playlistName: 'New Playlist',

      playlistTracks: [
        {name: 'Purple Haze', artist: 'Jimi Hendrix', album: 'Are You Experienced', id: '1234'},
        {name: 'Purple Haze', artist: 'Jimi Hendrix', album: 'Are You Experienced', id: '1234'}
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
  }

  removeTrack(track) {

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div class="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={addTrack()} />

            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

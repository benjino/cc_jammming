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
        {name: 'Purple Haze', artist: 'Jimi Hendrix', album: 'The Jimi Hendrix Experience – Are You Experienced', id: '1234'},
        {name: 'Purple Haze', artist: 'Jimi Hendrix', album: 'The Jimi Hendrix Experience – Are You Experienced', id: '1234'},
        {name: 'Purple Haze', artist: 'Jimi Hendrix', album: 'The Jimi Hendrix Experience – Are You Experienced', id: '1234'},
        {name: 'Purple Haze', artist: 'Jimi Hendrix', album: 'The Jimi Hendrix Experience – Are You Experienced', id: '1234'}
      ]
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div class="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

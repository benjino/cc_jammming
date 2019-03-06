const clientId = '71da2f5410be4d38a3c16b2c0f6195d3';
const redirectUri = 'http://localhost:3000/';

let accessToken;
let expirationTime;

const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expirationTimeMatch){
      accessToken = accessTokenMatch[1];
      expirationTime = Number(expirationTimeMatch[1]);
      window.setTimeout(() => accessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      let accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    let accessToken = this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json()
      ).then(jsonResponse => {
        if (jsonResponse.tracks.items) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
      });
  },

  savePlaylist(name, trackURIs){
  if(!name || !trackURIs.length) {
    return Promise.resolve();
  }
    const accessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`};
    let userId;
    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
  ).then(jsonResponse => {
    userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
    ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackURIs})
        });
      });
  });
}
};

export default Spotify;

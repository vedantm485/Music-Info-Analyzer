const clientId = '86b91dc2da804ba1a33f623ba86f5642';
const redirectUri = 'https://your-redirect-uri.com/callback'; // Update with your actual redirect URI
const scopes = 'user-read-playback-state';

let accessToken;

async function getAccessToken() {
  const hash = window.location.hash;
  if (hash) {
    accessToken = hash.split('&')[0].split('=')[1];
    window.history.pushState('Access Token', null, window.location.pathname);
  } else {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authUrl;
  }
}

async function fetchCurrentlyPlayingTrack() {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  const infoDiv = document.getElementById('info');

  if (data && data.is_playing) {
    const track = data.item;
    infoDiv.innerHTML = `
      <div>Title: ${track.name}</div>
      <div>Artist: ${track.artists.map(artist => artist.name).join(', ')}</div>
      <div>BPM: ${track.tempo || "N/A"}</div>
      <div>Key: ${track.key || "N/A"}</div>
      <div>Genre: ${track.genres ? track.genres.join(', ') : "N/A"}</div>
    `;
  } else {
    infoDiv.innerHTML = "<div>No track is currently playing.</div>";
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  await getAccessToken();
  await fetchCurrentlyPlayingTrack();
});



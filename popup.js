document.addEventListener('DOMContentLoaded', function() {
  const infoDiv = document.getElementById('info');

  const fakeData = {
    title: "Song Title",
    artist: "Artist Name",
    bpm: 120,
    key: "C Major",
    genre: "Pop"
  };

  infoDiv.innerHTML = `
    <div>Title: ${fakeData.title}</div>
    <div>Artist: ${fakeData.artist}</div>
    <div>BPM: ${fakeData.bpm}</div>
    <div>Key: ${fakeData.key}</div>
    <div>Genre: ${fakeData.genre}</div>
  `;
});


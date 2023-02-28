interface Album {
  name: string;
  title: string;
  description: string;
  tracks: Track[];
}

interface Track {
  name: string;
  src: string;
}

const audio = document.getElementById('audio') as HTMLAudioElement;
const albumData = JSON.parse(document.getElementById('albumData').textContent);
let selectedAlbumIndex = 0;

function init() {
  const albumImages = document.querySelectorAll('.album img');
  
  // Add click event listeners to album images
  albumImages.forEach((img) => {
    img.addEventListener('click', () => {
      const albumIndex = parseInt(img.getAttribute('data-album-index'));
      selectAlbum(albumIndex);
    });
  });
  
  // Select first album
  selectAlbum(0);
}

function selectAlbum(albumIndex: number) {
  selectedAlbumIndex = albumIndex;
  
  // Load first track of selected album
  const trackSrc = albumData.albums[selectedAlbumIndex].tracks[0].src;
  audio.src = trackSrc;
  audio.load();
  
  // Play audio
  audio.play();
  
  // Set album description
  const albumDescription = document.getElementById('album-description');
  albumDescription.innerHTML = albumData.albums[selectedAlbumIndex].description;
  
  // Set track list
  const trackList = document.getElementById('track-list');
  const tracks = albumData.albums[selectedAlbumIndex].tracks;
  trackList.innerHTML = '';
  tracks.forEach((track, index) => {
    const trackSpan = document.createElement('span');
    trackSpan.textContent = track.name;
    trackSpan.addEventListener('click', () => {
      selectTrack(index);
    });
    trackList.appendChild(trackSpan);
  });
}

function selectTrack(trackIndex: number) {
  // Set track source and play
  const trackSrc = albumData.albums[selectedAlbumIndex].tracks[trackIndex].src;
  audio.src = trackSrc;
  audio.load();
  audio.play();
}

init();


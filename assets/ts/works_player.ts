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
  const albumImages = document.querySelectorAll('.wop-Album img');
  
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
  // audio.play();
  
  // Set album description
  const albumDescription = document.getElementById('album-description');
  albumDescription.innerHTML = albumData.albums[selectedAlbumIndex].description;
  
  const albumCovers = albumData.albums[selectedAlbumIndex]?.images.map(image => {
    const srcset = image.srcset.join('');
    const pic = document.createElement('figure');
    const _source = document.createElement('source');
    const img = document.createElement('img');

    _source.setAttribute('srcset', srcset);
    pic.appendChild(_source);
    img.setAttribute('src', image.src);
    img.classList.add('wop-CurrentCovers_Image');
    pic.appendChild(img);
    return pic;
  });

  const activeAlbum = document.querySelector('.wop-AlbumList .active');
  activeAlbum?.classList.remove('active');
  const albums = document.querySelectorAll('.wop-Album');
  albums[albumIndex].classList.add('active');
  const currentCovers = document.querySelector('.wop-CurrentCovers');
  currentCovers.innerHTML = '';
  albumCovers.forEach(cover => currentCovers.appendChild(cover));

  document.querySelector< HTMLSpanElement >('.wop-AlbumTitle strong').innerText = albumData.albums[selectedAlbumIndex].name;
  document.querySelector< HTMLSpanElement >('.wop-ReleaseDate').innerText = albumData.albums[selectedAlbumIndex].release_year;

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
    index === 0 && trackSpan.classList.add("active");
    trackList.appendChild(trackSpan);
  });
}

function selectTrack(trackIndex: number) {
  // Set track source and play
  if (albumData.albums[selectedAlbumIndex].tracks[trackIndex].src === "#") return; 
  const activeTrack = document.querySelector('#track-list .active')
  activeTrack?.classList.remove('active');
  const trackSrc = albumData.albums[selectedAlbumIndex].tracks[trackIndex].src;
  audio.src = trackSrc;
  audio.load();
  audio.play();
  document.querySelectorAll('#track-list span')[trackIndex].classList.add('active');
}

init();


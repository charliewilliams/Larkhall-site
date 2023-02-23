import debounce from 'lodash/debounce'; 

// Navigation Menu
const navTrigger = document.querySelector('.hd-NavTrigger');

const toggleNav = (el) => {
  if (el === null) return;
  const isActive = el.getAttribute('aria-active') === "true" ? true : false;
  return el.setAttribute('aria-active', !isActive);
}

navTrigger?.addEventListener('click', function () {
  toggleNav(this);
});

window.addEventListener('resize', debounce(
    () => window.innerWidth > 1024 && navTrigger?.setAttribute('aria-active', 'false'),
    150
  )
)



// Self hosted video player controls
if (!!document.querySelectorAll('.hm-Hosted')) {
  const players = document.querySelectorAll('.hm-Hosted');
  players.forEach((r) => {
    const videoAsset: HTMLVideoElement | null = r.querySelector('.hm-HostedVideo');
    if (videoAsset === null) return;

    const repeatButton = r.querySelector('.hm-HostedControls_Repeat');
    const muteButton = r.querySelector('.hm-HostedControls_Mute');
    const playButton = r.querySelector('.hm-HostedControls_Play');

    playButton?.addEventListener('click', () => 
        videoAsset.paused ? videoAsset.play() : videoAsset.pause());

    muteButton?.addEventListener('click', () =>
        videoAsset.muted = videoAsset.muted ? false : true);

    repeatButton?.addEventListener('click', () => videoAsset.currentTime = 0);
  })
}

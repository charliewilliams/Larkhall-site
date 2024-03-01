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

// Button tracking for playlist pages
const playButton = document.querySelector('pl-Wrapper');
playButton?.addEventListener('track', function () {
  fbq('track', 'PageView');
});

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

    muteButton?.addEventListener('click', () => {
        videoAsset.muted = videoAsset.muted ? false : true;
        muteButton.setAttribute("aria-muted", `${videoAsset.muted}`);
    });

    repeatButton?.addEventListener('click', () => videoAsset.currentTime = 0);
  })
}

const dualSourceVideo: HTMLVideoElement | null = document.querySelector('.hm-HostedVideo_Mobile');

if (dualSourceVideo !== null) {
  const { mobilesource, desktopsource} = dualSourceVideo.dataset;

  const srcRegex = mobilesource ? new RegExp(mobilesource) : '';
  const observer = new ResizeObserver((entries) => {
    entries.forEach(entry => {
      if (entry.contentBoxSize[0].inlineSize >= 1024) {
        if (desktopsource && srcRegex && srcRegex.test(dualSourceVideo.src)) {
          dualSourceVideo.src = `/${desktopsource}.mp4`;
        }
      } else {
        if (mobilesource && srcRegex && !srcRegex.test(dualSourceVideo.src)) {
          dualSourceVideo.src = `/${mobilesource}.mp4`
        }
      }
    })
  });
  observer.observe(dualSourceVideo.closest('section')!);
}


window.getYoutubeIframe = function (event: KeyboardEvent, embedSrc: string) {
  event.preventDefault();
  event.stopPropagation();
  if (event.target && (event.type === "click" || (event.type === 'keydown' && event.keyCode === 13))) {
    const container  = (event.currentTarget as HTMLElement).parentElement!;
    const thumbnail = container.querySelector('img')!;
    const playIcon = container.querySelector('svg')!;
    thumbnail.style.pointerEvents = "none";
    playIcon.style.pointerEvents = "none";
    const containerDimentions = container.getBoundingClientRect();
    container.style.width = `${containerDimentions.width}px`;
    container.style.height = `${containerDimentions.height}px`;
    const el = document.createElement('iframe');
    el.src = embedSrc;
    el.setAttribute('style', 'position: absolute; top: 0; left: 0; z-index: -1; height: 100%; width: 100%; overflow: hidden; border: 0; box-sizing: border-box;');
    el.setAttribute('allow', "autoplay");
    el.setAttribute('autoplay', "true");

    thumbnail.style.position = "absolute";
    el.addEventListener('load', () => {
      thumbnail.style.opacity = "0";
      playIcon.style.opacity = "0";
      setTimeout(() => container.removeChild(thumbnail), 151);
      setTimeout(() => container.removeChild(playIcon), 151);
    });
    container.appendChild(el);
  }
}

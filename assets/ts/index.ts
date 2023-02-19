import debounce from 'lodash/debounce'; 
const navTrigger = document.querySelector('.hd-NavTrigger');
console.log(navTrigger);

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

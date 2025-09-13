/* open new browser window with emusic cover art */
const el = document.querySelector('.album-cover-container img');
if (el) {
  const url = el.getAttribute('src');
  window.open(url);
}

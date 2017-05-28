javascript:(function() {
  /* open new browser window with emusic cover art */
  window.open($('.album__cover .imagePlaceholder .preloadImage').attr('style').replace(/^[^"]+"([^"]+)"[^"]+$/,"$1"))
})()

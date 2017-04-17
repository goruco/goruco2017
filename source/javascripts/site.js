//= require vendor/rellax
//= require vendor/gumshoe
//= require vendor/smooth-scroll
//= require vendor/vanilla-modal
//= require vendor/lazyload

document.addEventListener("DOMContentLoaded", function() {
  var body = document.querySelector('body');

  // Parallax Stuff
  var parallaxOpts = { center: true };
  var heroRubyParallax = new Rellax('.scattered-ruby');

  // Sticky Header Stuff
  var hero = document.querySelector('.hero'),
      nav = document.querySelector('.top-navigation'),
      heroHeight = hero.clientHeight,
      navHeight = nav.clientHeight,
      last_known_scroll_position = 0;
      ticking = false;

  function calculateSmoothScrollOffset() {
    var viewportWidth = window.innerWidth;
    return viewportWidth < 960 ?
      navHeight + 50 : navHeight + 25;
  }

  function stickyScrollSpy() {
    smoothScroll.init({
      offset: calculateSmoothScrollOffset()
    });

    gumshoe.init();
  }

  stickyScrollSpy();

  function handleStickyNav(scroll_pos) {
    var shouldStick = (scroll_pos > heroHeight);
    nav.classList.toggle('is-stuck', shouldStick);
  }

  window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleStickyNav(last_known_scroll_position);
        ticking = false;
      });
    }
    ticking = true;
  });


  // Speaker Detail Modals
  var speakerModal = new VanillaModal.default();


  // Lazy load location photos
  var lazyLoadLocationPhotos = new LazyLoad({
    elements_selector: '.location-photo'
  });

  // Mobile OVerlay Menu
  var overlayMenu = document.querySelector('.overlay-menu'),
      overlayMenuTrigger = document.querySelector('#triggerOverlayMenu'),
      overlayMenuTriggerText = document.querySelector('#triggerOverlayMenu .menu-title'),
      overlayMenuLinks = document.querySelectorAll('.overlay-menu .list a');


  overlayMenuTrigger.addEventListener('click', handleMobileMenu);

  Array.from(overlayMenuLinks).forEach(function(link) {
    link.addEventListener('click', function(event) {
      toggleOverlay();
    });
  });

  function handleMobileMenu(e) {
    e.preventDefault();
    toggleOverlay();
  }

  function toggleOverlay() {
    var overlayOpen = body.classList.contains('overlay-showing');
    body.classList.toggle('overlay-showing', !overlayOpen);
    overlayMenu.classList.toggle('active', !overlayOpen);

    if(!overlayOpen) {
      overlayMenuTriggerText.innerHTML = 'Close Menu';
    } else {
      overlayMenuTriggerText.innerHTML = 'Menu';
    }

  }

});

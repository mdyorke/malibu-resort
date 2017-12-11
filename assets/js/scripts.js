$(document).ready(function($) {
  // Menu Toggle
  $('header .menu-toggle').on("click", function() {
    $('body').toggleClass('main-menu-open');
  });

  $('#main-menu a').on("click", function() {
    $('body').removeClass('main-menu-open');
  });

  // Owl Carousel
  $("#gallery .carousel").owlCarousel({
    items: 2,
    itemsDesktop: [800, 2],
    itemsDesktopSmall: false,
    itemsTabletSmall: [720, 1],
    navigation: true
  });

  // Responsive Tabs
  var mq = window.matchMedia("(max-width: 767px)");

  if (mq.matches) {
    $('#rooms').responsiveTabs({
      startCollapsed: 'accordion',
      animation: 'slide',
      duration: 250,
      scrollToAccordion: true
    });
  } else {
    $('#rooms').responsiveTabs({
      startCollapsed: 'accordion',
    });
  }

  $('.flexslider').flexslider({
    animation: "fade",
    controlNav: false
  });

  // Single Page Nav
  var headerHeight = $('#header').innerHeight() - 22;
  var headerHeightMobile = $('#header').innerHeight() - 14;


  if (mq.matches) {
    $('.front #header, .front .actions').singlePageNav({
      offset: headerHeightMobile,
      filter: '[href^="/#"]'
    });
  } else {
    $('.front #header, .front .actions').singlePageNav({
      offset: headerHeight,
      filter: '[href^="/#"]'
    });
  }

  // Close mobile nav on click

  $('#rm-removed a').click(function() {
    $('.responsive-menus').removeClass('responsive-toggled');
  });

}(jQuery));

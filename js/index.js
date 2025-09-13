// Navbar transparency on hero (slider) section
document.addEventListener('DOMContentLoaded', function(){
  var navbar = document.querySelector('.navbar');
  var carousel = document.getElementById('carouselExampleDark');
  // Force Bootstrap carousel autoplay
  if (window.bootstrap && carousel) {
    try {
      var carouselInstance = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel, {
        interval: 6000,
        ride: 'carousel',
        pause: false,
        touch: true,
        wrap: true
      });
      carouselInstance.cycle();
    } catch(e) {}
  }
  function updateNavbar(){
    if(!navbar || !carousel) return;
    var carouselBottom = carousel.getBoundingClientRect().bottom;
    if(carouselBottom > 0){
      navbar.classList.add('navbar-transparent');
    } else {
      navbar.classList.remove('navbar-transparent');
    }
  }
  updateNavbar();
  window.addEventListener('scroll', updateNavbar, {passive:true});
  window.addEventListener('resize', updateNavbar);
});


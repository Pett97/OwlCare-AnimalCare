document.addEventListener('DOMContentLoaded', function () {

  //navabar
  const elemsNav = document.querySelectorAll('.sidenav');
  const instancesNav = M.Sidenav.init(elemsNav);


  //carrousel
  const elems = document.querySelectorAll('.carousel');
  const instances = M.Carousel.init(elems, {
    fullWidth: true,
    indicators: true
  });
});
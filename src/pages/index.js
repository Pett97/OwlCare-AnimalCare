document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.carousel');
  const instances = M.Carousel.init(elems, {
    fullWidth: true,
    indicators: true
  });
});
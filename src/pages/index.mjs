import { userIsAuthenticated } from "../services/check-user.mjs";
document.addEventListener("DOMContentLoaded", function () {
  if(!userIsAuthenticated() == true){
    window.location.href = "./login/login.html";
  }

  //navabar
  const elemsNav = document.querySelectorAll(".sidenav");
  const instancesNav = M.Sidenav.init(elemsNav);

  //carrousel
  const elems = document.querySelectorAll(".carousel");
  const instances = M.Carousel.init(elems, {
    fullWidth: true,
    indicators: true,
  });
});

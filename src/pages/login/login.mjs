import { USER_LOGIN, USER_PWD } from "../../conts.mjs";

document.addEventListener("DOMContentLoaded", function () {
  function _limparLocalStorage() {
    localStorage.clear();
  }
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("login_user").value.trim();
    const senha = document.getElementById("login_pwd").value;

    if (usuario === USER_LOGIN && senha === USER_PWD) {
      localStorage.setItem("USUARIO_AUTENTICADO", "true");
      alert("Login Realizado com sucesso");

      // redirecionar se quiser:
      window.location.href = "../index.html";
    } else {
      localStorage.setItem("USUARIO_AUTENTICADO", "false");
      alert("Login inválido. Tente novamente");
    }
  });

  _limparLocalStorage();
});

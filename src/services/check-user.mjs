export function userIsAuthenticated() {
  if (
    !localStorage.getItem("USUARIO_AUTENTICADO") ||
    !!localStorage.getItem("USUARIO_AUTENTICADO") == false
  ) {
    return false;
  }
  return true;
}

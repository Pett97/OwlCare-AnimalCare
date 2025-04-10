const URL_CARRINHOS = "http://localhost:3000/carrinho";

document.addEventListener("DOMContentLoaded", async function () {
  async function getPedidos() {
    try {
      const response = await fetch(URL_CARRINHOS);
      if (!response.ok) {
        throw new Error("Erros ao buscar os pedidos");
      }
      const pedidos = await response.json();
      return pedidos;
    } catch (error) {
      alert("Erro ao buscar pedidos");
      console.log(error);
    }
  }

  function listarPedidos(pedidos) {
    console.log(pedidos);
  }

  const data = await getPedidos();
  if (data) {
    listarPedidos(data);
  }
});

const URL_CARRINHOS = "http://localhost:3000/carrinho";

document.addEventListener("DOMContentLoaded", async function () {
  let idPedidoAction;

  function clearLocalStorage() {
    localStorage.clear();
  }

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
    let rowList = document.getElementById("row-list-carts");

    rowList.innerHTML = "";

    pedidos.forEach((pedido) => {
      const showPedido = document.createElement("div");
      showPedido.classList.add("col", "s12", "m6", "l3");

      showPedido.innerHTML = `
                    <div class="card deep-purple lighten-1">
               <div class="card-content white-text">
                  <span class="card-title">${pedido.id} - ${pedido.client.clientName}</span>
                  <p>${pedido.client.email}</p>
                  <p>${pedido.client.phone}</p>
                  <p>R$: ${pedido.valorDesconto}</p>
                  <p>R$: ${pedido.valorCashback}</p>
               </div>
               <div class="card-action">
                  <a data-id="${pedido.id}" onclick="editarPedido(event)">Editar</a>
                  <a data-id="${pedido.id}>Deletar</a>
               </div>
            </div>
        `;
      rowList.appendChild(showPedido);
    });
  }

  const data = await getPedidos();
  if (data) {
    listarPedidos(data);
  }

  window.editarPedido = function (event) {
    let idPedidoAction = event.target.getAttribute("data-id");
    if(idPedidoAction){
      localStorage.setItem("idPedidoAction", idPedidoAction);

      window.location.href = "../detail-cart/datail-cart.html";
    }else{
      alert("Nao Foi Possivel Abrir Pedido")
    }
  };
});

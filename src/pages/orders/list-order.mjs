import { ServiceOrder } from "../../services/order-service.mjs";

document.addEventListener("DOMContentLoaded",function () {
  let service = new ServiceOrder();
  let idPedidoAction;

  function clearLocalStorage() {
    localStorage.clear();
  }

  async function listOrders() {

    let orders = await service.getAll();
    console.log(orders);

    let rowList = document.getElementById("row-list-carts");

    rowList.innerHTML = "";

    orders.forEach((order) => {
      const showPedido = document.createElement("div");
      showPedido.classList.add("col", "s12", "m6", "l3");

      showPedido.innerHTML = `
                    <div class="card deep-purple lighten-1">
               <div class="card-content white-text">
                  <span class="card-title">${order.id} - ${order.client.clientName}</span>
                  <p>${order.client.email}</p>
                  <p>${order.client.phone}</p>
                  <p>${order.status}</p>
                  <p>Serviço: ${order.service}</p>
               </div>
               <div class="card-action">
                  <a data-id="${order.id}" onclick="editarPedido(event)">Editar</a>
                  <a data-id="${order.id}>Deletar</a>
               </div>
            </div>
        `;
      rowList.appendChild(showPedido);
    });
  }

  clearLocalStorage();
  listOrders();

  window.editarPedido = function (event) {
    let idOrderAction = event.target.getAttribute("data-id");
    if (idOrderAction) {
      localStorage.setItem("idOrderAction", idOrderAction);

      window.location.href = "./order/order.html";
    } else {
      alert("Nao Foi Possivel Abrir Pedido");
    }
  };
});

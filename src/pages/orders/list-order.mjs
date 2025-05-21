import { ServiceOrder } from "../../services/order-service.mjs";
import { userIsAuthenticated } from "../../services/check-user.mjs";

document.addEventListener("DOMContentLoaded", function () {
  if (!userIsAuthenticated() == true) {
    window.location.href = "../login/login.html";
  }
  const elemsNav = document.querySelectorAll(".sidenav");

  const instancesNav = M.Sidenav.init(elemsNav);

  let service = new ServiceOrder();
  let idPedidoAction;

  function clearLocalStorage() {
    localStorage.removeItem("idOrderAction");
  }

  async function listOrders() {
    const orders = await service.getAll();

    const rowList = document.getElementById("row-list-carts");

    rowList.innerHTML = "";

    let s = "";

    orders.forEach((order) => {
      s += `
      <div class="col s12 m6 l3">
                    <div class="card deep-purple lighten-1">
               <div class="card-content white-text">
                  <span class="card-title">${order.client.clientName}</span>
                  <p><span class="white-text">${order.client.email}</span></p>
                  <p class="white-text">${order.client.phone}</p>
                  <p class="white-text">Status; ${order.status}</p>
                  <p class="white-text">Serviço: ${order.service}</p>
               </div>
               <div class="card-action">
               <a data-id="${order.id}" onclick="editarPedido(event)" class="btn-small icon-right waves-effect waves-light yellow darken-1 ">
                    <i class="material-icons">edit</i>Editar
                </a>
                <a data-id="${order.id}" onclick="deletarOrderm(event)" class="btn-small icon-right waves-effect waves-light red ">
                    <i class="material-icons">delete</i>Deletar
                </a> 
               </div>
            </div>
            </div>
        `;
    });
    rowList.innerHTML = s;
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

  window.deletarOrderm = async (event) => {
    let idOrderAction = event.target.getAttribute("data-id");
    await service.deleteOrder(idOrderAction);

    let response = await service.deleteOrder(idOrderAction);
    if (!response) {
      M.toast({
        html: "Erro ao remover cliente",
        classes: "red darken-2",
      });
    } else {
      M.toast({
        html: "Cliente Removido com Sucesso",
        classes: "green darken-2",
      });
    }
    window.location.reload();
  };
});

import { ServiceOrder } from "../../../services/order-service.mjs";
import { ServiceClient } from "../../../services/client-service.mjs";
import { userIsAuthenticated } from "../../../services/check-user.mjs";

document.addEventListener("DOMContentLoaded", function () {
  
  if (!userIsAuthenticated()) {
    window.location.href = "../../login/login.html";
    return;
  }

  const orderService = new ServiceOrder();
  const clientService = new ServiceClient();

  const selectClient = document.getElementById("select-client");
  const selectService = document.getElementById("select-service");
  const selectInitialStatus = document.getElementById("select-initialStatus");
  const btnCreateOrder = document.getElementById("createOrder");
  const formOrder = document.getElementById("order-form");

  // Popular selects com dados
  const init = async () => {
    const clients = await clientService.getAllClients();
    clients.forEach((client) => {
      const option = document.createElement("option");
      option.value = client.id;
      option.text = client.clientName;
      selectClient.appendChild(option);
    });
    M.FormSelect.init(selectClient);

    TYPE_OF_SERVICE.forEach((service) => {
      const option = document.createElement("option");
      option.value = service;
      option.textContent = service;
      selectService.appendChild(option);
    });
    M.FormSelect.init(selectService);

    STATUS_OF_ODERS.forEach((status) => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      selectInitialStatus.appendChild(option);
    });
    M.FormSelect.init(selectInitialStatus);
  };

  let idOrder = Date.now() + ""; // ID único baseado no timestamp

  async function getClienteById(id) {
    return await clientService.getClient(id);
  }

  async function createOrder() {
    if (!formOrder.checkValidity()) {
      M.toast({ html: 'Por favor, preencha todos os campos corretamente!', classes: 'red darken-2' });
      return;
    }

    let client = await getClienteById(selectClient.value);
    let data = {
      id: idOrder,
      client: client,
      status: selectInitialStatus.value,
      service: selectService.value,
    };

    await orderService.newOrder(data);
    M.toast({ html: 'Pedido criado com sucesso!', classes: 'green darken-2' });
    setTimeout(() => {
      window.location.href = "../list-order.html";
    }, 1500);
  }

  btnCreateOrder.addEventListener("click", function (event) {
    event.preventDefault();
    createOrder();
  });

  init();
});

import { ServiceOrder } from "../../../services/order-service.mjs";
import { ServiceClient } from "../../../services/client-service.mjs";
import { userIsAuthenticated } from "../../../services/check-user.mjs";
import { TYPE_OF_SERVICE,STATUS_OF_ODERS } from "../../../conts.mjs";

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

    const TYPES = await TYPE_OF_SERVICE();
    TYPES.forEach((service) => {
      console.log("123123123");
      let option = document.createElement("option");
      option.value = service.name;
      option.textContent = service.name;
      selectService.appendChild(option);
    });
    M.FormSelect.init(selectService);

    const STATUS = await STATUS_OF_ODERS();
    STATUS.forEach((status) => {
      let option = document.createElement("option");
      option.value = status.status;
      option.textContent = status.status;
      selectInitialStatus.appendChild(option);
    });
    M.FormSelect.init(selectInitialStatus);
  };

  let idOrder = Date.now() + ""; // ID único baseado no timestamp xaxho

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

    await orderService.storeNewOrder(data);
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

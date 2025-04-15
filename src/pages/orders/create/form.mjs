import { ServiceOrder } from "../../../services/order-service.mjs";
import { ServiceClient } from "../../../services/client-service.mjs";
import { TYPE_OF_SERVICE } from "../../../conts.mjs";
import { STATUS_OF_ODERS } from "../../../conts.mjs";

document.addEventListener("DOMContentLoaded", function () {
  const orderService = new ServiceOrder();
  const clientService = new ServiceClient();

  const selectClient = document.getElementById("select-client");
  const selectService = document.getElementById("select-service");
  const selectInitialStatus = document.getElementById("select-initialStatus");
  const btnCreateOrder = document.getElementById("createOrder");

  //popular selects
  const init = async () => {
    const dados = await clientService.getAllClients();
    dados.forEach((client) => {
      const option = document.createElement("option");
      option.value = client.id;
      option.text = client.clientName;
      selectClient.appendChild(option);
    });
    M.FormSelect.init(selectClient);

    TYPE_OF_SERVICE.forEach((tipo) => {
      const option = document.createElement("option");
      option.value = tipo;
      option.textContent = tipo;
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

  let idOrder = Date.now() + "";

  async function getClienteById(id) {
      return await clientService.getClient(id);
  }

  async function createOrder() {
    let client = await getClienteById(selectClient.value);

    let data = {
      id:idOrder,
      client: client,
      status: selectInitialStatus.value,
      service: selectService.value,
    };
     await orderService.newOrder(data);
     window.location.href("../list-order.html");
  }

  btnCreateOrder.addEventListener("click", function (event) {
    event.preventDefault();
    createOrder();
  });
  init();
});

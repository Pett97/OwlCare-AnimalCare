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

  //popular selects
  const init = async () => {
    const dados = await clientService.getAllClients();
    dados.forEach((client) => {
      const option = document.createElement("option");
      option.value = client;
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

  init();
});

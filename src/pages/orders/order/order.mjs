import { ServiceOrder } from "../../../services/order-service.mjs";
import { TYPE_OF_SERVICE } from "../../../conts.mjs";
import { STATUS_OF_ODERS } from "../../../conts.mjs";
import { userIsAuthenticated } from "../../../services/check-user.mjs";

document.addEventListener("DOMContentLoaded", function () {
  if (!userIsAuthenticated()) {
    window.location.href = "../../login/login.html";
    return;
  }

  const inputNameClient = document.getElementById("client_name");
  const inputEmailClient = document.getElementById("email_client");
  const inputPhoneClient = document.getElementById("phone_client");
  const selectTipoServico = document.getElementById("tipo_servico");
  const selectStatusPagamento = document.getElementById("status_pagamento");
  const btnUpdateOrder = document.getElementById("update-order");
  const updateForm = document.getElementById("update-form");

  let service = new ServiceOrder();
  let idOrder = localStorage.getItem("idOrderAction");

  TYPE_OF_SERVICE.forEach((tipo) => {
    const option = document.createElement("option");
    option.value = tipo;
    option.textContent = tipo;
    selectTipoServico.appendChild(option);
  });

  STATUS_OF_ODERS.forEach((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    selectStatusPagamento.appendChild(option);
  });

  M.FormSelect.init(selectTipoServico);
  M.FormSelect.init(selectStatusPagamento);

  async function getOrder(idOrder) {
    if (!idOrder) {
      alert("Id da Ordem de serviço não informado");
      return;
    }

    let order = await service.getOrder(idOrder);
    inputNameClient.value = order.client.clientName;
    inputEmailClient.value = order.client.email;
    inputPhoneClient.value = order.client.phone;
    selectTipoServico.value = order.service;
    selectStatusPagamento.value = order.status;


    M.FormSelect.init(selectTipoServico);
    M.FormSelect.init(selectStatusPagamento);

   
    if (inputNameClient.value) inputNameClient.focus();
    if (inputEmailClient.value) inputEmailClient.focus();
    if (inputPhoneClient.value) inputPhoneClient.focus();
  }

  async function updateOrder() {
 
    if (!inputNameClient.value || !inputEmailClient.value || !inputPhoneClient.value || !selectTipoServico.value || !selectStatusPagamento.value) {
      M.toast({ html: 'Por favor, preencha todos os campos corretamente.', classes: 'red darken-2' });
      return;
    }

    let dataOrderForUpdate = {
      id: idOrder,
      client: {
        clientName: inputNameClient.value,
        email: inputEmailClient.value,
        phone: inputPhoneClient.value,
      },
      status: selectStatusPagamento.value,
      service: selectTipoServico.value,
    };

    await service.updateOrder(dataOrderForUpdate);

    
    M.toast({ html: 'Ordem de serviço atualizada com sucesso!', classes: 'green darken-2' });

  
    setTimeout(() => {
      window.location.href = "../list-order.html";
    }, 1500);
  }

  getOrder(idOrder);

  // Evento para o botão de atualizar
  btnUpdateOrder.addEventListener("click", updateOrder);
});

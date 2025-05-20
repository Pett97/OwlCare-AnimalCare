import { ServiceClient } from "../../../services/client-service.mjs";

import { userIsAuthenticated } from "../../../services/check-user.mjs";

document.addEventListener("DOMContentLoaded", function () {
  if (!userIsAuthenticated()) {
    window.location.href = "../login/login.html";
    return;
  }

  const service = new ServiceClient();
  const formClient = document.getElementById("form-client");
  const inputNameClient = document.getElementById("client_name");
  const inputEmailClient = document.getElementById("email_client");
  const inputPhoneClient = document.getElementById("phone_client");
  const selectPhoneWhatsapp = document.getElementById("phone-whatsapp");
  const obsClient = document.getElementById("obs_client");

  async function getCliente(idClient) {
    if (!idClient) {
      alert("Erro ao buscar cliente");
      return;
    }
    try {
      const client = await service.getClient(idClient);

      inputNameClient.value = client.clientName || "";
      inputEmailClient.value = client.email || "";
      inputPhoneClient.value = client.phone || "";
      $('#phone_client').mask('(00) 0000-0000');
      selectPhoneWhatsapp.value = client.whatsapp ? "1" : "0";
      obsClient.value = client.obs || "";

      M.updateTextFields();
      M.FormSelect.init(selectPhoneWhatsapp);

      // Foco nos campos para o css ficar ok 
      if (inputNameClient.value) inputNameClient.focus();
      if (inputEmailClient.value) inputEmailClient.focus();
      if (inputPhoneClient.value) inputPhoneClient.focus();
      if (obsClient.value) obsClient.focus();

    } catch (error) {
      alert("Erro ao carregar dados do cliente");
    }
  }

  let idFromStorage = localStorage.getItem("idClientForEdit");
  
  if (idFromStorage) {
    getCliente(idFromStorage);
  } else {
    alert("ID do cliente não encontrado no localStorage.");
  }

  async function updateClient(event) {
    event.preventDefault();
  
    if (!formClient) {
      console.error("Formulário não encontrado.");
      return;
    }
  
    // Atualiza a UI dos campos manualmente
    formClient.querySelectorAll('input, textarea').forEach(input => {
      input.dispatchEvent(new Event('input'));
    });
  
    if (!formClient.checkValidity()) {
      formClient.reportValidity(); // mostra os erros visuais pro usuário
      M.toast({
        html: "Preencha todos os campos corretamente",
        classes: "red darken-2",
      });
      return;
    }
  
    const data = {
      id: localStorage.getItem("idClientForEdit"),
      clientName: inputNameClient.value.trim(),
      email: inputEmailClient.value.trim(),
      phone: inputPhoneClient.value.replace(/\D/g, ''),
      whatsapp: selectPhoneWhatsapp.value,
      obs: obsClient.value.trim(),
    };
  
    try {
      await service.updateClient(data);
      M.toast({
        html: "Cliente atualizado com sucesso!",
        classes: "green darken-2",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      M.toast({
        html: "Erro ao atualizar cliente",
        classes: "red darken-2",
      });
    }
  }

  const btnUpdate = document.getElementById("update-client");
  btnUpdate.addEventListener("click", updateClient);
});

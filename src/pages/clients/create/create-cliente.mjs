import { ServiceClient } from "../../../services/client-service.mjs";
import { userIsAuthenticated } from "../../../services/check-user.mjs";

document.addEventListener("DOMContentLoaded", () => {
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

  M.FormSelect.init(selectPhoneWhatsapp);

  formClient.addEventListener("submit", async (e) => {
    e.preventDefault();

    //email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailInput = inputEmailClient.value.trim();
    if (!emailRegex.test(emailInput)) {
      M.toast({
        html: "Por favor, insira um e-mail válido.",
        classes: "red darken-2",
      });
      return;
    }

    //celular

    $(document).ready(function () {
      $("#phone_client").mask(function (val) {
        return val.replace(/\D/g, "").length === 11
          ? "(00)000000000"
          : "(00)00000000";
      });
    });

    if (!formClient.checkValidity()) {
      M.toast({
        html: "Preencha todos os campos corretamente",
        classes: "red darken-2",
      });
      return;
    }

    let id = Date.now() + "";

    const data = {
      id: id,
      clientName: inputNameClient.value.trim(),
      email: emailInput,
      phone: inputPhoneClient.value.trim(),
      whatsapp: selectPhoneWhatsapp.value,
      obs: obsClient.value.trim(),
    };

    try {
      await service.storeClient(data);
      M.toast({
        html: "Cliente cadastrado com sucesso!",
        classes: "green darken-2",
      });
      formClient.reset();
      M.updateTextFields();
      M.FormSelect.init(selectPhoneWhatsapp);
    } catch (error) {
      console.log(error);
      M.toast({
        html: "Erro ao cadastrar cliente",
        classes: "red darken-2",
      });
    }
  });
});

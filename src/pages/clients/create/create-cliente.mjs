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

  // Inicializa o select para WhatsApp
  M.FormSelect.init(selectPhoneWhatsapp);

  // Aplica a máscara de celular (00) 00000-0000 para números de 11 dígitos
  $("#phone_client").mask("(00) 00000-0000", {
    clearIfNotMatch: false, // Se o número não tiver 11 dígitos, o campo será limpo
  });

  // Aplica a máscara inicialmente quando a página carregar (garante que o campo já tenha a máscara inicial)
  $("#phone_client").trigger("input");

  formClient.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validação do email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailInput = inputEmailClient.value.trim();
    if (!emailRegex.test(emailInput)) {
      M.toast({
        html: "Por favor, insira um e-mail válido.",
        classes: "red darken-2",
      });
      return;
    }

    // Verifica se o formulário está válido
    if (!formClient.checkValidity()) {
      M.toast({
        html: "Preencha todos os campos corretamente",
        classes: "red darken-2",
      });
      return;
    }

    // Coleta os dados do cliente
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
      // Envia os dados para o serviço
      await service.storeClient(data);
      M.toast({
        html: "Cliente cadastrado com sucesso!",
        classes: "green darken-2",
      });
      formClient.reset();
      M.updateTextFields();
      M.FormSelect.init(selectPhoneWhatsapp);
      window.location.href = "../clients.html";
    } catch (error) {
      console.log(error);
      M.toast({
        html: "Erro ao cadastrar cliente",
        classes: "red darken-2",
      });
    }
  });
});

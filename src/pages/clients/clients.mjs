import { ServiceClient } from "../../services/client-service.mjs";
import { userIsAuthenticated } from "../../services/check-user.mjs";

document.addEventListener("DOMContentLoaded", function () {
  if (!userIsAuthenticated()) {
    window.location.href = "../login/login.html";
  }

  // Navbar
  const elemsNav = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elemsNav);

  const service = new ServiceClient();

  function clearLocalStorage() {
    localStorage.removeItem("idClientForEdit");
  }

  async function listClients() {
    const clientes = await service.getAllClients();
    const cardContainer = document.getElementById("list-client");
    cardContainer.innerHTML = "";

    clientes.forEach((cliente) => {
      const cardClient = document.createElement("div");
      cardClient.classList.add("card");

      cardClient.innerHTML = `
        <div class="card-content">
          <span class="card-title">
            <i class="material-icons left blue-text">person</i>
            ${cliente.clientName}
          </span>
          <p><strong>Telefone:</strong> ${cliente.phone}</p>
          <p><strong>Whatsapp:</strong> ${haveWhatsApp(cliente.whatsapp)}</p>
          <p><strong>Email:</strong> ${cliente.email}</p>
        </div>
        <div class="card-action">
          <a class="waves-effect waves-light btn-small amber darken-3" data-id="${cliente.id}" onclick="editClient(event)">
            <i class="material-icons left">edit</i>Editar
          </a>
          <button class="waves-effect waves-light btn-small red darken-1" data-id="${cliente.id}" onclick="deletClient(event)">
            <i class="material-icons left">delete</i>Excluir
          </button>
        </div>
      `;

      cardContainer.appendChild(cardClient);
    });

    function haveWhatsApp(whatsapp) {
      return whatsapp === "1" ? "Sim" : "Não";
    }

    window.editClient = function (event) {
      const idCliente = event.target.getAttribute("data-id");
      localStorage.setItem("idClientForEdit", idCliente);
      window.location.href = "./client/client.html";
    };

    window.deletClient = async function (event) {
      const idCliente = event.target.getAttribute("data-id");
      await service.deleteClient(idCliente);
      M.toast({
        html: "Cliente deletado com sucesso!",
        classes: "green darken-2",
      });
      setTimeout(() => window.location.reload(), 1000);
    };
  }

  listClients();
  clearLocalStorage();
});

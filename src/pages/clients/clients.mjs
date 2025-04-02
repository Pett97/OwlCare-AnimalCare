import { Client } from "../../services/client.mjs";

document.addEventListener('DOMContentLoaded', function () {
   const client = new Client(1, '', '', '');

   async function listClients() {
      const clientes = await client.getAllClients();
      const cardContainer = document.getElementById('list-client');
      cardContainer.innerHTML = '';

      clientes.forEach(cliente => {
         const cardClient = document.createElement('div');
         cardClient.classList.add('card', 'horizontal');

         cardClient.innerHTML = `
                <div class="card-stacked">
                    <div class="card-content">
                        <div class="row">
                            <div class="col s6 m6 l6">${cliente.clientName}</div>
                            <div class="row">
                                <div class="col s6 m6 l6">
                                    <table class="responsive-table">
                                        <tbody id="clientTable">
                                            <tr>
                                                <td>Email: ${cliente.email}</td>
                                                <td>Cel: ${cliente.phone}</td>
                                                <td>Whatsapp: ${haveWhatsApp(cliente.whatsapp)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

         cardContainer.appendChild(cardClient);
      });

      function haveWhatsApp(whatsapp) {
         console.log(whatsapp);
         if (whatsapp !== 1) {
            return "Não";
         }
         return "Sim";
      }
   }

   listClients();
});

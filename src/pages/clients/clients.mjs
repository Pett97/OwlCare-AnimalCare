import { ServiceClient } from "../../services/client-service.mjs"

document.addEventListener('DOMContentLoaded', function () {
    const service = new ServiceClient;

    function clearLocalStorage() {
        localStorage.clear();
    }

    async function listClients() {
        const clientes = await service.getAllClients();
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
                        <div class="row">
                            <div class="col s12 m6 l6">
                               <a class="waves-effect waves-light btn-small amber darken-3" data-id="${cliente.id}" onclick="editClient(event)">Editar</a> 
                            </div>
                            <div class="col s12 m6 l6">
                               <button class="waves-effect waves-light btn-small red darken-1" data-id="${cliente.id}" onclick="deletClient(event)">Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            cardContainer.appendChild(cardClient);
        });

        function haveWhatsApp(whatsapp) {
            if (whatsapp !== "1") {
                return "Não";
            }
            return "Sim";
        }

        window.editClient = function (event) {
            let idCliente = event.target.getAttribute('data-id');
            console.log('Editar cliente com id:', idCliente);
            localStorage.setItem('idClientForEdit', idCliente);
            window.location.href = './client/client.html';
        };

        window.deletClient = async function (event) {
            console.log('xxxx');
            let idCliente = event.target.getAttribute('data-id');
            await service.deleteClient(idCliente);
            // Aqui você pode chamar uma função para excluir o cliente com o id, como:
            // service.deleteClient(idCliente);
        };
    }

    listClients();
    clearLocalStorage();
});

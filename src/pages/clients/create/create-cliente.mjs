import { ServiceClient } from "../../../services/client-service.mjs";

document.addEventListener('DOMContentLoaded', function () {
    let service = new ServiceClient;
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    let btnCadastrar = document.getElementById('store-client');

    btnCadastrar.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o envio do formulário
        storeClient();
    });

    let idAleatorio = () => {
        return Date.now()+"";
    };

    async function storeClient() {
        let nameClient = document.getElementById('client_name');
        let emailClient = document.getElementById('email_client');
        let phoneClient = document.getElementById('phone_client');
        let whatsapp = document.getElementById('phone-whatsapp')
        let obsClient = document.getElementById('obs_client');

        let data = {
            id : idAleatorio(),
            clientName : nameClient.value,
            email : emailClient.value,
            phone : phoneClient.value,
            whatsapp : whatsapp.value,
            obs : obsClient.value
        }
        await service.storeClient(data);
    }
});



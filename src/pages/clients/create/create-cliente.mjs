import { Client } from "../../../services/client.mjs";

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    let btnCadastrar = document.getElementById('store-client');

    btnCadastrar.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o envio do formulário
        storeClient();
    });

    let idAleatorio = () => {
        return Date.now();
    };

    async function storeClient() {
        let id = 0;

        let nameClient = document.getElementById('client_name');
        let emailClient = document.getElementById('email_client');
        let phoneClient = document.getElementById('phone_client');
        let whatsapp = document.getElementById('phone-whatsapp')
        let obsClient = document.getElementById('obs_client');

        let newClient = new Client(
            id = idAleatorio(),    
            nameClient.value,      
            emailClient.value,     
            phoneClient.value,    
            whatsapp = whatsapp.value,   
            obsClient.value        
        );

        console.log(newClient);

        await newClient.storeClient();
    }
});



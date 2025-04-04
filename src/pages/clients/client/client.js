import { ServiceClient } from "../../../services/client-service.mjs";

document.addEventListener('DOMContentLoaded', function () {
   const service = new ServiceClient;
   let client;

   let inputNameClient = document.getElementById('client_name');
   let inputEmailClient = document.getElementById('email_client');
   let inputPhoneClient = document.getElementById('phone_client');
   let selectPhoneWhatsapp = document.getElementById('phone-whatsapp');
   let obsClient = document.getElementById('obs_client');

   async function getCliente(idClient) {
      if (!idClient) {
         alert('Erro ao buscar cliente');
         return;
      }
      client = await service.getClient(1743559358452);
   };
   getCliente(1743559358455).then(() => {
      console.log(client);
      inputNameClient.value = client.clientName;
      inputEmailClient.value = client.email;
      inputPhoneClient.value = client.phone;
      selectPhoneWhatsapp.value = client.whatsapp ? '1' : '0';
      if (client.obs) {
         obsClient.value = client.obs;
      }
      M.FormSelect.init(selectPhoneWhatsapp);
      if (inputNameClient.value) inputNameClient.focus();
      if (inputEmailClient.value) inputEmailClient.focus();
      if (inputPhoneClient.value) inputPhoneClient.focus();
      if (obsClient.value) obsClient.focus();
   });
});
import { ServiceClient } from "../../../services/client-service.mjs";
import { Client } from "../../../services/client.mjs";
const service = new ServiceClient();
document.addEventListener('DOMContentLoaded', function () {
   let client;

   const inputNameClient = document.getElementById('client_name');
   const inputEmailClient = document.getElementById('email_client');
   const inputPhoneClient = document.getElementById('phone_client');
   const selectPhoneWhatsapp = document.getElementById('phone-whatsapp');
   const obsClient = document.getElementById('obs_client');

   async function getCliente(idClient) {
      if (!idClient) {
         alert('Erro ao buscar cliente');
         return;
      }
      client = await service.getClient(idClient);

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
   }

   let idFromStorage = localStorage.getItem('idClientForEdit');
   if (idFromStorage) {
      getCliente(idFromStorage);
   } else {
      alert('ID do cliente não encontrado no localStorage.');
   }

   async function updateClient() {
      let data = {
         id: localStorage.getItem('idClientForEdit'),
         clientName: inputNameClient.value,
         email: inputEmailClient.value,
         phone: inputPhoneClient.value,
         whatsapp: selectPhoneWhatsapp.value,
         obs: obsClient.value
      };

      await service.updateClient(data).then(()=>{
         window.location.reload();
      })
      
   }
   let btnUpdate = document.getElementById('update-client');
   btnUpdate.addEventListener('click', updateClient);

});



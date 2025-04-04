const URL_CLIENTS = "http://localhost:3000/clientes";

import { Client } from "./client.mjs";

export class ServiceClient {

   _buildClient(data) {
      let c = new Client(data.id, data.clientName, data.email, data.phone, data.whatsapp, data.obs);
      if (!c || !c.validationForm()) {
         return false;
      }
      return c;
   }

   async getClient(idClient) {
      if (!idClient) {
         return;
      }
      try {
         const response = await fetch(`${URL_CLIENTS}/${idClient}`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            }
         });

         if (!response.ok) {
            throw new Error(`Erro ao Buscar Cliente com id${idClient}`);
         }

         const clientData = await response.json();
         let client = this._buildClient(clientData);
         if (client) {
            return client;
         } else {
            return false;
         }
      } catch (error) {
         console.log(error);
      }
   }

   async storeClient(data) {

      let c = this._buildClient(data);
      if (c == false) {
         alert("erro ao salvar cliente");
      } else {
         try {
            const response = await fetch(URL_CLIENTS, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  id: this.id,
                  clientName: this.clientName,
                  email: this.email,
                  phone: this.phone,
                  whatsapp: this.whatsapp,
                  obs: this.obs,
               }),
            });

            if (!response.ok) {
               throw new Error("Erro ao salvar cliente");
            }

            const data = await response.json();
            alert("Cliente Salvo Com Sucesso ");
            return;
         } catch (error) {
            alert("Erro ao salvar cliente");
            console.error(error);
            return;
         }
      }

   }

   async getAllClients() {
      try {
         const response = await fetch(URL_CLIENTS, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         });

         if (!response.ok) {
            throw new Error("Erro ao buscar clientes");
         }

         const data = await response.json();
         return data;
      } catch (error) {
         alert("Erro ao buscar clientes");
         console.error(error);
         return [];
      }
   }


}

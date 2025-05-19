const URL_CLIENTS = "https://my-json-seNãorver.typicode.com/pett97/OwlCare-AnimalCare/clientes";

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
         //alert("erro ao salvar cliente");
      } else {
         try {
            const response = await fetch(URL_CLIENTS, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  id: c.id,
                  clientName: c.clientName,
                  email: c.email,
                  phone: c.phone,
                  whatsapp: c.whatsapp,
                  obs: c.obs,
               }),
            });

            if (!response.ok) {
               throw new Error("Erro ao salvar cliente");
            }

            const data = await response.json();
            //alert("Cliente Salvo Com Sucesso ");
            return;
         } catch (error) {
            //alert("Erro ao salvar cliente");
            console.error(error);
            return;
         }
      }

   }

   async updateClient(data) {
      let c = this._buildClient(data);
      if (c == false) {
         //alert("erro ao atualizar cliente");
      } else {
         try {
            const response = await fetch(`${URL_CLIENTS}/${c.id}`, {
               method: "PUT",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  id: this.id,
                  clientName: c.clientName,
                  email: c.email,
                  phone: c.phone,
                  whatsapp: c.whatsapp,
                  obs: c.obs,
               }),
            });

            if (!response.ok) {
               throw new Error("Erro ao Atualizar cliente");
            }

            const data = await response.json();
            console.log(data);
            //alert("Cliente Atualizado Com Sucesso ");
            return;
         } catch (error) {
            //alert("Erro ao Atualizar cliente");
            console.error(error);
            return;
         }
      }
   }

   async deleteClient(idClient) {
      try {
         const response = await fetch(`${URL_CLIENTS}/${idClient}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               id: this.id
            }),
         });

         if (!response.ok) {
            throw new Error("Erro ao deletar Cliente");
         }

         const data = await response.json();
         console.log(data);
         alert("Cliente Deletado Com Sucesso ");
         return;
      } catch (error) {
         alert("Erro ao Deletar cliente");
         console.error(error);
         return;
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

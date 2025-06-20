import { Client } from "./client.mjs";

export class ServiceClient {

   constructor() {
      if (!localStorage.getItem("CLIENTES")) {
         localStorage.setItem("CLIENTES", JSON.stringify([
            {
               clientName: "ana banana",
               email: "anabanana@gmail.com",
               phone: "4291241506",
               whatsapp: "1",
               obs: "12312321",
               id: "1743903256616"
            }
         ]));
      }
   }

   _buildClient(data) {
      let c = new Client(data.id, data.clientName, data.email, data.phone, data.whatsapp, data.obs);
      return c && c.validationForm() ? c : false;
   }

   _getClientsFromStorage() {
      return JSON.parse(localStorage.getItem("CLIENTES") || "[]");
   }

   _saveClientsToStorage(clients) {
      localStorage.setItem("CLIENTES", JSON.stringify(clients));
   }

   getClient(idClient) {
      if (!idClient) return;

      const clients = this._getClientsFromStorage();
      const found = clients.find(c => c.id === idClient);

      if (found) {
         return this._buildClient(found);
      }

      return false;
   }

   storeClient(data) {
      const c = this._buildClient(data);
      if (!c) return false;

      const clients = this._getClientsFromStorage();
      clients.push({
         id: c.id,
         clientName: c.clientName,
         email: c.email,
         phone: c.phone,
         whatsapp: c.whatsapp,
         obs: c.obs
      });

      this._saveClientsToStorage(clients);
      return true;
   }

   updateClient(data) {
      const c = this._buildClient(data);
      if (!c) return false;

      let clients = this._getClientsFromStorage();
      const index = clients.findIndex(client => client.id === c.id);
      if (index === -1) return false;

      clients[index] = {
         id: c.id,
         clientName: c.clientName,
         email: c.email,
         phone: c.phone,
         whatsapp: c.whatsapp,
         obs: c.obs
      };

      this._saveClientsToStorage(clients);
      return true;
   }

   deleteClient(idClient) {
      console.log(idClient);  
      let clients = this._getClientsFromStorage();
      const updated = clients.filter(client => client.id !== idClient);
      if (updated.length === clients.length) return false; // nada foi removido

      this._saveClientsToStorage(updated);
      return true;
   }

   getAllClients() {
      return this._getClientsFromStorage();
   }
}

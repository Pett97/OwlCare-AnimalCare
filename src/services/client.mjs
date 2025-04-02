export class Client {
  constructor(id, clientName, email, phone, whatsapp = 0, obs) {
    this.id = id;
    this.clientName = clientName.trim().toUpperCase();
    this.email = email.trim().toLowerCase();
    this.phone = phone;
    this.whatsapp = whatsapp;
    this.obs = obs ? obs.toLowerCase() : "";
  }

  validationForm() {
    if (!this.id || !this.clientName || !this.email || !this.phone) {
      return false;
    }
    return true;
  }

  async storeClient() {
    if (!this.validationForm()) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/clientes", {
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
    } catch (error) {
      alert("Erro ao salvar cliente");
      console.error(error);
    }
  }

  async getAllClients() {
    try {
      const response = await fetch("http://localhost:3000/clientes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
      }
  
      const data = await response.json();
      return data; // Retorna os dados (clientes) obtidos da API
    } catch (error) {
      alert("Erro ao buscar clientes");
      console.error(error);
      return []; // Retorna um array vazio em caso de erro
    }
  }
}

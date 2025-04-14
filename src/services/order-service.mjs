const URL_ORDER_SERVICO = "http://localhost:3000/ordemServico";

import { Client } from "./client.mjs";
import { Service } from "./service.mjs";

export class ServiceOrder {
  async getOrder(idOrder) {
    if (!idOrder) {
      return;
    }
    try {
      const response = await fetch(`${URL_ORDER_SERVICO}/${idOrder}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao Buscar Ordem de Servico  com id${idOrder}`);
      }

      const data = await response.json();
      if (data) {
        return data;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const response = await fetch(URL_ORDER_SERVICO, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar Ordens");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      alert("Erro ao buscar Ordens");
      console.error(error);
      return [];
    }
  }
}

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

  async updateOrder(data) {
    if (!data) {
      alert("Erro ao atualizar ordem: dados ausentes");
      return;
    }

    try {
      const response = await fetch(`${URL_ORDER_SERVICO}/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // já está tudo montado corretamente
      });

      if (!response.ok) {
        throw new Error("Erro ao Atualizar Ordem de Serviço");
      }

      const responseData = await response.json();
      alert("Ordem Atualizada com Sucesso!");
      console.log("Resposta do servidor:", responseData);
      return responseData;
    } catch (error) {
      alert("Erro ao atualizar ordem");
      console.error(error);
      return;
    }
  }

  async deleteOrder(idOrderAction) {
    try {
      const response = await fetch(`${URL_ORDER_SERVICO}/${idOrderAction}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar Order de Serviço");
      }

      const data = await response.json();
      console.log(data);
      alert("Ordem Deletado Com Sucesso ");
      return;
    } catch (error) {
      alert("Erro ao Deletar Orderm");
      console.error(error);
      return;
    }
  }
}

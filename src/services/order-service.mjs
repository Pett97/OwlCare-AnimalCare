export class ServiceOrder {
  constructor() {
    if (!localStorage.getItem("ORDERS")) {
      localStorage.setItem(
        "ORDERS",
        JSON.stringify([
          {
            id: "1744690503049",
            client: {
              clientName: "barbara",
              email: "teste@gmail.com",
              phone: "91241506",
            },
            status: "PAGO",
            service: "BANHO",
          },
        ])
      );
    }
  }

  _getAllOrdersFromLocalStorage(){
    return JSON.parse(localStorage.getItem("ORDERS") || "[]");
  }

  _saveOrder(data) {
    try {
      localStorage.setItem("ORDERS", JSON.stringify(data));
      alert("Serviço Criado Com Sucesso");
    } catch (error) {
      alert("Erro ao Criar Serviço");
      console.error;
    }
  }

  getAll(){
    return this._getAllOrdersFromLocalStorage();
  }

}

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

  _getAllOrdersFromLocalStorage() {
    return JSON.parse(localStorage.getItem("ORDERS") || "[]");
  }

  _saveOrder(orders) {
    localStorage.setItem("ORDERS", JSON.stringify(orders));
  }

  getAll() {
    return this._getAllOrdersFromLocalStorage();
  }

  storeNewOrder(data) {
    const orders = this._getAllOrdersFromLocalStorage();

    orders.push({
      id: data.id,
      client: data.client,
      status: data.status,
      service: data.service,
    });

    const success = this._saveOrder(orders);
    return success ? orders : null; // retorna o array atualizado
  }

  updateOrder(data){
    let orders = this._getAllOrdersFromLocalStorage();
    let index = orders.findIndex(order=>order.id === data.id);
   if(index === -1) return false;

   orders[index] = {
      id: data.id,
      client: data.client,
      status: data.status,
      service: data.service,
    };

    this._saveOrder(orders);
    return true;
   }

  }
}

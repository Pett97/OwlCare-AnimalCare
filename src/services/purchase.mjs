class Purchase {
  constructor(id, client, products) {
    this.id = id;
    this.client = client;
    this.products = products;
  }

  validationPurchase() {
    if (!this.cliente || !this.products) {
      return false;
    }
    return true;
  }

  getTotal() {
    return this.products;
  }
}

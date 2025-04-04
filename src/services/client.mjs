export class Client {
  constructor(id, clientName, email, phone, whatsapp = 0, obs) {
    this.id = id;
    this.clientName = clientName;
    this.email = email;
    this.phone = phone;
    this.whatsapp = whatsapp;
    this.obs = obs;
  }

  validationForm() {
    if (!this.id || !this.clientName || !this.email || !this.phone) {
      return false;
    }
    return true;
  }

}

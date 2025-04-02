class Service {
  constructor(client, typeService) {
    this.client = client;
    this.typeService = typeService;
  }

  validationService() {
    if (!this.client || !this.typeService) {
      return false;
    }
    return true;
  }
}

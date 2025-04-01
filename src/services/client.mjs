class Client {
   constructor(animalName, clientName, email, phone, whatsapp = 0, obs) {
      this.animalName = animalName.trim().toUpperCase();
      this.clientName = clientName.trim().toUpperCase();
      this.email = email.trim().toLowerCase();
      this.phone = phone.trim();
      this.whatsapp = whatsapp;
      this.obs = obs ? obs.trim().toLowerCase() : '';
   }

   validationForm() {
      if (!this.animalName || !this.clientName || !this.email || !this.phone) {
         return false;
      }
      return true;
   }
}
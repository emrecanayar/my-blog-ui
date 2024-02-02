import { action, observable } from "mobx";
import { CreateContactCommand } from "../../services/contact/dtos/CreateContactCommand";
import { CreatedContactResponse } from "../../services/contact/dtos/CreatedContactResponse";
import contactService from "../../services/contact/contactService";
import { CustomError } from "../../services/base/exceptionModels/CustomError";

class ContactStore {
  @observable public addedContacts: CreatedContactResponse =
    {} as CreatedContactResponse;
  @observable formErrors: CustomError = {
    generalMessage: "",
    validationErrors: null,
    status: 0,
  };

  @action
  createContact = async (contact: CreateContactCommand) => {
    try {
      this.clearFormErrors();
      var response = await contactService.createContact(contact);
      this.addedContacts = response.data;
      return response.data;
    } catch (error: any) {
      console.log("Errors Store => ", error);
      if (error.status && error.generalMessage && error.validationErrors) {
        // API'den gelen hata mesajlarını formErrors'a atayın
        this.setFormErrors(error);
        console.log("Errors", this.formErrors);
      } else {
        // Genel bir hata mesajı
        this.setFormErrors({
          generalMessage: "An unexpected error occurred.",
          validationErrors: null,
          status: error.status,
        });
      }
      throw error; // Hataları component'e de iletebiliriz
    }
  };

  @action
  setFormErrors = (errors: CustomError) => {
    this.formErrors = errors;
  };

  @action
  clearFormErrors = () => {
    this.formErrors = { generalMessage: "", validationErrors: null, status: 0 };
  };
}
const contactStore = new ContactStore();
export default contactStore;

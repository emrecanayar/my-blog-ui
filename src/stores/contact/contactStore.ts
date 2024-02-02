import { action, observable } from "mobx";
import { CreateContactCommand } from "../../services/contact/dtos/CreateContactCommand";
import { CreatedContactResponse } from "../../services/contact/dtos/CreatedContactResponse";
import contactService from "../../services/contact/contactService";

class ContactStore {
  @observable public addedContacts: CreatedContactResponse =
    {} as CreatedContactResponse;

  @action
  createContact = async (contact: CreateContactCommand) => {
    try {
      var response = await contactService.createContact(contact);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}
const contactStore = new ContactStore();
export default contactStore;

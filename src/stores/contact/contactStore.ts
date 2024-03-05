import { action, observable } from "mobx";
import { CreateContactCommand } from "../../services/contact/dtos/CreateContactCommand";
import { CreatedContactResponse } from "../../services/contact/dtos/CreatedContactResponse";
import contactService from "../../services/contact/contactService";
import { BaseStore } from "../base/baseStore";

export class ContactStore extends BaseStore {
  @observable public addedContacts: CreatedContactResponse =
    {} as CreatedContactResponse;

  @action
  createContact = async (contact: CreateContactCommand) => {
    try {
      this.clearFormErrors();
      var response = await contactService.createContact(contact);
      this.addedContacts = response.data;
      return response.data;
    } catch (error: any) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const contactStore = new ContactStore();
export default contactStore;

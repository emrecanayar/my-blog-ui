import contactUsInformationService from "../../services/contactUsInformation/contactUsInformationService";
import { BaseStore } from "../base/baseStore";
import { GetListContactUsInformationListItemDto } from "./../../services/contactUsInformation/dtos/GetListContactUsInformationListItemDto";
import { action, observable } from "mobx";

export class ContactUsInformationStore extends BaseStore {
  @observable contactUsInformations: GetListContactUsInformationListItemDto[] =
    [];

  @action
  getContactUsInformations = async () => {
    try {
      let result = await contactUsInformationService.getContactUsInformations();
      this.contactUsInformations = result.data.items;
      return result;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
   
  };
}

const contactUsInformationStore = new ContactUsInformationStore();
export default contactUsInformationStore;

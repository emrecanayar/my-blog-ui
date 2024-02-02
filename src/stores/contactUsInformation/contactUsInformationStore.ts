import contactUsInformationService from "../../services/contactUsInformation/contactUsInformationService";
import { GetListContactUsInformationListItemDto } from "./../../services/contactUsInformation/dtos/GetListContactUsInformationListItemDto";
import { action, observable } from "mobx";

export class ContactUsInformationStore {
  @observable contactUsInformations: GetListContactUsInformationListItemDto[] =
    [];

  @action
  getContactUsInformations = async () => {
    let result = await contactUsInformationService.getContactUsInformations();
    this.contactUsInformations = result.data.items;
    return result;
  };
}

const contactUsInformationStore = new ContactUsInformationStore();
export default contactUsInformationStore;

import { action, observable } from "mobx";
import aboutService from "../../services/about/aboutService";
import { GetListAboutListItemDto } from "../../services/about/dtos/GetListAboutListItemDto";
import { BaseStore } from "../base/baseStore";

export class AboutStore extends BaseStore {
  @observable abouts: GetListAboutListItemDto[] = [];

  @action
  getAbouts = async () => {
    try {
      let result = await aboutService.getAbouts();
      this.abouts = result.data.items;
      return result;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}

const aboutStore = new AboutStore();
export default aboutStore;

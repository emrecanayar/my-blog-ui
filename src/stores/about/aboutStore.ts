import { action, observable } from "mobx";
import aboutService from "../../services/about/aboutService";
import { GetListAboutListItemDto } from "../../services/about/dtos/GetListAboutListItemDto";

export class AboutStore {
  @observable abouts: GetListAboutListItemDto[] = [];

  @action
  getAbouts = async () => {
    let result = await aboutService.getAbouts();
    this.abouts = result.data.items;
    return result;
  };
}

const aboutStore = new AboutStore();
export default aboutStore;

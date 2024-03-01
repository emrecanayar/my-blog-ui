import { action, observable } from "mobx";
import { BaseStore } from "../base/baseStore";
import featureService from "../../services/feature/featureService";
import { GetListFeatureListItemDto } from "../../services/feature/dtos/getListFeatureListItemDto";

export class FeatureStore extends BaseStore {
  @observable getListData: GetListFeatureListItemDto[] = [];

  @action
  getlist = async () => {
    try {
      let response = await featureService.getList();
      this.getListData = response.data.items;
      return response.data.items;
    } catch (error) {
      console.log("Features yüklenirken bir hata oluştu", error);
      this.handleApiError(error);
      throw error;
    }
  };
}
const featureStore = new FeatureStore();
export default featureStore;

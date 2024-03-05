import { GetListResponse } from "../../services/base/models/GetListResponse";
import { GetListHeadArticleFeatureListItemDto } from "../../services/headArticleFeature/dtos/getListHeadArticleFeatureListItemDto";
import headArticleFeatureService from "../../services/headArticleFeature/headArticleFeatureService";
import { BaseStore } from "../base/baseStore";
import { PageRequest } from "./../../services/base/models/PageRequest";
import { action, observable } from "mobx";

export class HeadArticleFeatureStore extends BaseStore {
  @observable
  headArticleFeatureList: GetListResponse<GetListHeadArticleFeatureListItemDto> =
    {} as GetListResponse<GetListHeadArticleFeatureListItemDto>;

  @action
  getList = async (PageRequest: PageRequest) => {
    try {
      let response = await headArticleFeatureService.getList(PageRequest);
      this.headArticleFeatureList = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const headArticleFeatureStore = new HeadArticleFeatureStore();
export default headArticleFeatureStore;

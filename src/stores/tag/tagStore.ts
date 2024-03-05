import { action, observable } from "mobx";
import { PageRequest } from "../../services/base/models/PageRequest";
import { BaseStore } from "../base/baseStore";
import tagService from "../../services/tag/tagService";
import { GetListResponse } from "../../services/base/models/GetListResponse";
import { GetListTagListItemDto } from "../../services/tag/dtos/getListTagListItemDto";

export class TagStore extends BaseStore {
  @observable tags: GetListResponse<GetListTagListItemDto> =
    {} as GetListResponse<GetListTagListItemDto>;

  @action
  getList = async (pageRequest: PageRequest) => {
    try {
      let response = await tagService.getList(pageRequest);
      this.tags = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const tagStore = new TagStore();
export default tagStore;

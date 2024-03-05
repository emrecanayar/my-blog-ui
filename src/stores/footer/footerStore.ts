import { action, observable } from "mobx";
import { PageRequest } from "../../services/base/models/PageRequest";
import footerService from "../../services/footer/footerService";
import { BaseStore } from "../base/baseStore";
import { GetListResponse } from "../../services/base/models/GetListResponse";
import { GetListFooterListItemDto } from "../../services/footer/dtos/getListFooterListItemDto";

export class FooterStore extends BaseStore {
  @observable footers: GetListResponse<GetListFooterListItemDto> =
    {} as GetListResponse<GetListFooterListItemDto>;

  @action
  getList = async (pageRequest: PageRequest) => {
    try {
      let result = await footerService.getList(pageRequest);
      this.footers = result.data;
      return result.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const footerStore = new FooterStore();
export default footerStore;

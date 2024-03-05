import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { GetListResponse } from "../base/models/GetListResponse";
import { PageRequest } from "../base/models/PageRequest";

import { GetListFooterListItemDto } from "./dtos/getListFooterListItemDto";

export class FooterService {
  getList = async (
    pageRequest: PageRequest
  ): Promise<CustomResponseDto<GetListResponse<GetListFooterListItemDto>>> => {
    try {
      let response = await apiService.get(
        `/Footers?PageIndex=${pageRequest.pageIndex}&PageSize=${pageRequest.pageSize}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const footerService = new FooterService();
export default footerService;

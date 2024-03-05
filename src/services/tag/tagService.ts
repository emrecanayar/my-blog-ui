import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { GetListResponse } from "../base/models/GetListResponse";
import { PageRequest } from "../base/models/PageRequest";
import { GetListTagListItemDto } from "./dtos/getListTagListItemDto";

export class TagService {
  getList = async (
    pageRequest: PageRequest
  ): Promise<CustomResponseDto<GetListResponse<GetListTagListItemDto>>> => {
    try {
      let response = await apiService.get(
        `/Tags?PageIndex=${pageRequest.pageIndex}&PageSize=${pageRequest.pageSize}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const tagService = new TagService();
export default tagService;

import { CustomResponseDto } from "./../base/models/CustomResponseDto";
import { PageRequest } from "../base/models/PageRequest";
import { GetListResponse } from "../base/models/GetListResponse";
import { GetListHeadArticleFeatureListItemDto } from "./dtos/getListHeadArticleFeatureListItemDto";
import apiService from "../base/apiService";

export class HeadArticleFeatureService {
  getList = async (
    pageRequest: PageRequest
  ): Promise<CustomResponseDto<GetListResponse<GetListHeadArticleFeatureListItemDto>>> => {
    try {
      let response = await apiService.get(
        `/HeadArticleFeatures?PageIndex=${pageRequest.pageIndex}&PageSize=${pageRequest.pageSize}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const headArticleFeatureService = new HeadArticleFeatureService();
export default headArticleFeatureService;

import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { GetListResponse } from "../base/models/GetListResponse";
import { GetListFeatureListItemDto } from "./dtos/getListFeatureListItemDto";

export class FeatureService {
  getList = async (): Promise<
    CustomResponseDto<GetListResponse<GetListFeatureListItemDto>>
  > => {
    try {
      let response = await apiService.get("/Features");
      return response;
    } catch (error) {
      console.log("Features yüklenirken bir hata oluştu", error);
      throw error;
    }
  };
}
const featureService = new FeatureService();
export default featureService;

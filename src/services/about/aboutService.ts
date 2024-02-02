import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { GetListResponse } from "../base/models/GetListResponse";
import { GetListAboutListItemDto } from "./dtos/GetListAboutListItemDto";

class AboutService {
    getAbouts = async (): Promise<
      CustomResponseDto<GetListResponse<GetListAboutListItemDto>>
    > => {
      try {
        const response = await apiService.get("/Abouts");
        return response;
      } catch (error) {
        console.error("Abouts yüklenirken bir hata oluştu", error);
        throw error;
      }
    };
  }
  const aboutService = new AboutService();
  export default aboutService;
  
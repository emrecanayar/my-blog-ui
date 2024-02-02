import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { GetListResponse } from "../base/models/GetListResponse";
import { GetListContactUsInformationListItemDto } from "./dtos/GetListContactUsInformationListItemDto";

class ContactUsInformationService {
  getContactUsInformations = async (): Promise<
    CustomResponseDto<GetListResponse<GetListContactUsInformationListItemDto>>
  > => {
    try {
      const response = await apiService.get("/ContactUsInformations");
      return response;
    } catch (error) {
      console.log("ContactUsInformations yüklenirken bir hata oluştu", error);
      throw error;
    }
  };
}
const contactUsInformationService = new ContactUsInformationService();
export default contactUsInformationService;

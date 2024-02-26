import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { GetUploadedFileByTokenQuery } from "./dtos/getUploadedFileByTokenQuery";
import { UploadedFileCreatedDto } from "./dtos/uploadedFileCreatedDto";
import UploadedFileDto from "./dtos/uploadedFileDto";

class UploadedFileService {
  uploadFile = async (
    formData: FormData
  ): Promise<CustomResponseDto<UploadedFileCreatedDto>> => {
    try {
      const response = await apiService.postFormData(
        "/UploadedFiles",
        formData
      );
      return response;
    } catch (error) {
      console.log("Dosya yüklenirken bir hata oluştu", error);
      throw error;
    }
  };

  getFile = async (
    token: GetUploadedFileByTokenQuery
  ): Promise<UploadedFileDto> => {
    try {
      const response = await apiService.post("/UploadedFiles/GetFile", token);
      return response;
    } catch (error) {
      console.log("Dosya yüklenirken bir hata oluştu", error);
      throw error;
    }
  };
}
const uploadedFileService = new UploadedFileService();
export default uploadedFileService;

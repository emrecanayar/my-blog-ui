import { action, observable } from "mobx";
import { BaseStore } from "../base/baseStore";
import uploadedFileService from "../../services/uploadedFileService/uploadedFileService";
import { UploadedFileCreatedDto } from "../../services/uploadedFileService/dtos/uploadedFileCreatedDto";

export class UploadedFileStore extends BaseStore {
  @observable uploadedFile: UploadedFileCreatedDto =
    {} as UploadedFileCreatedDto;

  @action
  uploadFile = async (formData: FormData) => {
    try {
      let result = await uploadedFileService.uploadFile(formData);
      this.uploadedFile = result.data;
      return result;
    } catch (error: any) {
      if (error.status && error.generalMessage && error.validationErrors) {
        this.setFormErrors(error);
      } else {
        this.setFormErrors({
          generalMessage: "An unexpected error occurred.",
          validationErrors: null,
          status: error.status,
        });
      }
      throw error;
    }
  };

  @action
  clearUploadedFile = () => {
    this.uploadedFile = {} as UploadedFileCreatedDto;
  };
}
const uploadedFileStore = new UploadedFileStore();
export default uploadedFileStore;

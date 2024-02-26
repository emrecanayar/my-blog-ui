import { action, makeObservable, observable } from "mobx";
import { BaseStore } from "../base/baseStore";
import uploadedFileService from "../../services/uploadedFileService/uploadedFileService";
import { UploadedFileCreatedDto } from "../../services/uploadedFileService/dtos/uploadedFileCreatedDto";
import { GetUploadedFileByTokenQuery } from "../../services/uploadedFileService/dtos/getUploadedFileByTokenQuery";
import UploadedFileDto from "../../services/uploadedFileService/dtos/uploadedFileDto";

export class UploadedFileStore extends BaseStore {
  @observable uploadedFile: UploadedFileCreatedDto =
    {} as UploadedFileCreatedDto;

  @observable getUploadedFile: UploadedFileDto = {} as UploadedFileDto;
  @observable uploadedFilePath: string = "";

  constructor() {
    super();
    makeObservable(this);
  }

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
  getFile = async (token: GetUploadedFileByTokenQuery) => {
    try {
      let result = await uploadedFileService.getFile(token);
      this.getUploadedFile = result; // Veya this.uploadedFile = result; bağlamınıza göre
      return result;
    } catch (error) {
      this.handleApiError(error);
    }
  };

  @action
  setUploadedFilePath = (path: string) => {
    this.uploadedFilePath = path;
  };

  @action
  clearUploadedFilePath = () => {
    this.uploadedFilePath = "";
  };

  @action
  clearUploadedFile = () => {
    this.uploadedFile = {} as UploadedFileCreatedDto;
  };
}
const uploadedFileStore = new UploadedFileStore();
export default uploadedFileStore;

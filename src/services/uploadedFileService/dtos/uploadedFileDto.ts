import { FileType } from "../../../complexTypes/enums";

export default interface UploadedFileDto {
  id: string;
  token: string;
  fileName: string;
  directory: string;
  path: string;
  extension: string;
  fileType: FileType;
}

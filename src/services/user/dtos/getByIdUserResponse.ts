import { CultureType, RecordStatu } from "../../../complexTypes/enums";
import { GetListUserUploadedFileListItemDto } from "../../userUploadedFiles/dtos/getListUserUploadedFileListItemDto";

export interface GetByIdUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: RecordStatu;
  culture: CultureType;
  userUploadedFiles:GetListUserUploadedFileListItemDto[];
}

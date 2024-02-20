import { GetListCategoryUploadedFileListItemDto } from "../../categoryUploaded/dtos/getListCategoryUploadedFileListItemDto";

export interface GetListCategoryListItemDto {
  id: string;
  name: string;
  description: string;
  isPopular: boolean;
  categoryUploadedFiles: GetListCategoryUploadedFileListItemDto[];
}

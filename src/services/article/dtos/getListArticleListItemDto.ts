import { GetByIdArticleUploadedFileResponse } from "../../articleUploadedFile/dtos/getListArticleUploadedFileListItemDto";
import { GetByIdCategoryResponse } from "../../category/dtos/getByIdCategoryResponse";
import { GetListTagListItemDto } from "../../tag/dtos/getListTagListItemDto";
import { GetByIdUserResponse } from "../../user/dtos/getByIdUserResponse";

export interface GetListArticleListItemDto {
  id: string;
  title: string;
  content: string;
  date: Date;
  viewCount: number;
  commentCount: number;
  seoAuthor: string;
  seoDescription: string;
  category: GetByIdCategoryResponse;
  user: GetByIdUserResponse;
  articleUploadedFiles: GetByIdArticleUploadedFileResponse[];
  tags: GetListTagListItemDto[];
}

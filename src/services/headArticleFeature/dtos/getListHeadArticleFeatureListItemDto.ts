import { GetByIdHeadArticleFeatureUploadedFileResponse } from "../../headArticleFeatureUploadedFiles/dtos/getByIdHeadArticleFeatureUploadedFileResponse";

export interface GetListHeadArticleFeatureListItemDto {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  headArticleFeatureUploadedFiles: GetByIdHeadArticleFeatureUploadedFileResponse[];
}

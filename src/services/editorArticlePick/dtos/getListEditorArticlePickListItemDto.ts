import { GetByIdArticleResponse } from "../../article/dtos/getByIdArticleResponse";
import { GetByIdUserResponse } from "../../user/dtos/getByIdUserResponse";

export interface GetListEditorArticlePickListItemDto {
  id: string;
  userId: string;
  user: GetByIdUserResponse;
  articleId: string;
  article: GetByIdArticleResponse;
}

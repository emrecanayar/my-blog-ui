import { GetByIdArticleResponse } from "../../article/dtos/getByIdArticleResponse";
import { GetByIdUserResponse } from "../../user/dtos/getByIdUserResponse";

export interface GetListFavoriteArticleListItemDto {
  id: string;
  userId: string;
  user: GetByIdUserResponse;
  articleId: string;
  article: GetByIdArticleResponse;
}

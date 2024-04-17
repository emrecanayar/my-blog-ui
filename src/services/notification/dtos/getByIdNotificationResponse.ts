import { GetByIdArticleResponse } from "../../article/dtos/getByIdArticleResponse";
import { GetByIdCommentResponse } from "../../comment/dtos/getByIdCommentResponse";
import { GetByIdUserResponse } from "../../user/dtos/getByIdUserResponse";

export interface GetByIdNotificationResponse {
  id: string;
  userId: string;
  articleId: string;
  commentId: string;
  type: string;
  content: string;
  isRead: boolean;
  user: GetByIdUserResponse;
  article: GetByIdArticleResponse;
  comment: GetByIdCommentResponse;
}

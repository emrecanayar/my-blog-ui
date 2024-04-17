import { GetByIdCommentResponse } from "../../comment/dtos/getByIdCommentResponse";

export interface GetListNotificationListItemDto {
  id: string;
  userId: string;
  type: string;
  content: string;
  isRead: boolean;
  articleId: string;
  comment: GetByIdCommentResponse;
}

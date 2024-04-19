export interface CreateLikeCommand {
  commentId: string;
  isLiked: boolean;
  userFullName: string;
  articleId: string;
}

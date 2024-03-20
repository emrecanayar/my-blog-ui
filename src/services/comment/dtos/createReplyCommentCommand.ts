export interface CreateReplyCommentCommand {
  content: string;
  userId: string;
  articleId: string;
  parentCommentId: string;
  authorName: string;
  authorEmail: string;
  auhorWebSite: string;
}

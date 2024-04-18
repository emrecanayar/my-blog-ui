export interface UpdateCommentCommand {
  id: string;
  authorName: string;
  authorEmail: string;
  auhorWebsite: string;
  content: string;
  datePosted: Date;
  sendNewPosts: boolean;
  sendNewComments: boolean;
  rememberMe: boolean;
  articleId: string;
  userId: string;
}

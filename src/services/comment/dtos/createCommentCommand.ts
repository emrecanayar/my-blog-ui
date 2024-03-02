export interface CreateCommentCommand {
  authorName: string;
  authorEmail: string;
  authorWebsite: string;
  content: string;
  sendNewPosts: boolean;
  sendNewComments: boolean;
  rememberMe: boolean;
  articleId: string;
  userId: string;
}

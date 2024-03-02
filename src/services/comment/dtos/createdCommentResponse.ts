export interface CreatedCommentResponse {
  id: string;
  authorName: string;
  authorEmail: string;
  authorWebsite: string;
  content: string;
  datePosted: Date;
  sendNewPosts: boolean;
  sendNewComments: boolean;
  rememberMe: boolean;
  articleId: string;
  userId: string;
}

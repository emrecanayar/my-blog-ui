export interface CreateArticleCommand {
  title: string;
  content: string;
  categoryId: string;
  tag: string[];
  tokens: string[];
}

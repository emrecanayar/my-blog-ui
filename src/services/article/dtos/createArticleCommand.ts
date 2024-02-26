export interface CreateArticleCommand {
  title: string;
  content: string;
  categoryId: string;
  tags: string[];
  tokens: string[];
}

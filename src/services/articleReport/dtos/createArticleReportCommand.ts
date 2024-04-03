import { ArticleReportType } from "../../../complexTypes/enums";

export interface CreateArticleReportCommand {
  description?: string;
  articleId: string;
  reportType: ArticleReportType;
}

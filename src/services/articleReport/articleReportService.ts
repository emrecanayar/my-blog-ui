import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { CreateArticleReportCommand } from "./dtos/createArticleReportCommand";
import { CreatedArticleReportResponse } from "./dtos/createdArticleReportResponse";

export class ArticleReportService {
  add = async (
    createArticleReportCommand: CreateArticleReportCommand
  ): Promise<CustomResponseDto<CreatedArticleReportResponse>> => {
    try {
      let response = await apiService.post(
        "ArticleReports",
        createArticleReportCommand
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const articleReportService = new ArticleReportService();
export default articleReportService;

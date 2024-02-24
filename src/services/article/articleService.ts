import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { CreateArticleCommand } from "./dtos/createArticleCommand";
import { CreatedArticleResponse } from "./dtos/createdArticleResponse";

export class ArticleService {
  addArticle = async (
    article: CreateArticleCommand
  ): Promise<CustomResponseDto<CreatedArticleResponse>> => {
    try {
      let response = await apiService.post("/Articles", article);
      return response;
    } catch (error) {
      console.log("ArticleService -> addArticle -> error", error);
      throw error;
    }
  };
}
var articleService = new ArticleService();
export default articleService;

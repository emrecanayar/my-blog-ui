import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { DynamicQuery } from "../base/models/DynamicQuery";
import { GetListResponse } from "../base/models/GetListResponse";
import { PageRequest } from "../base/models/PageRequest";
import { ArticleListModel } from "./dtos/articleListModel";
import { CreateArticleCommand } from "./dtos/createArticleCommand";
import { CreatedArticleResponse } from "./dtos/createdArticleResponse";
import { GetByIdArticleResponse } from "./dtos/getByIdArticleResponse";
import { GetListByRatingItemDto } from "./dtos/getListByRatingItemDto";

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

  getArticleListByDynamic = async (
    pageRequest: PageRequest,
    dynamicQuery: DynamicQuery
  ): Promise<CustomResponseDto<ArticleListModel>> => {
    try {
      const response = await apiService.postWithQuery(
        "/Articles/GetListByDynamic",
        pageRequest,
        dynamicQuery
      );
      return response;
    } catch (error) {
      console.log("ArticleService -> getArticleListByDynamic -> error", error);
      throw error;
    }
  };

  getArticleById = async (
    id: string
  ): Promise<CustomResponseDto<GetByIdArticleResponse>> => {
    try {
      const response = await apiService.get(`/Articles/${id}`);
      return response;
    } catch (error) {
      console.log("ArticleService -> getArticleById -> error", error);
      throw error;
    }
  };

  getListForRating = async (
    pageRequest: PageRequest
  ): Promise<CustomResponseDto<GetListResponse<GetListByRatingItemDto>>> => {
    try {
      const response = await apiService.get(
        `/Articles/GetListForRating?PageIndex=${pageRequest.pageIndex}&PageSize=${pageRequest.pageSize}`
      );
      return response;
    } catch (error) {
      console.log("ArticleService -> getListForRating -> error", error);
      throw error;
    }
  };
}
var articleService = new ArticleService();
export default articleService;

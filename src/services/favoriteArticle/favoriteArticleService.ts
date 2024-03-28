import { PageRequest } from "./../base/models/PageRequest";
import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { CreateFavoriteArticleCommand } from "./dtos/createFavoriteArticleCommand";
import { CreatedFavoriteArticleResponse } from "./dtos/createdFavoriteArticleResponse";
import { DeletedFavoriteArticleResponse } from "./dtos/deletedFavoriteArticleResponse";
import { GetListFavoriteArticleListItemDto } from "./dtos/getListFavoriteArticleListItemDto";
import { GetListResponse } from "../base/models/GetListResponse";
import { GetByArticleIdFavoriteArticleResponse } from "./dtos/getByArticleIdFavoriteArticleResponse";
import { DeleteFavoriteArticleByArticleIdResponse } from "./dtos/deleteFavoriteArticleByArticleIdResponse";

export class FavoriteArticleService {
  addFavoriteArticle = async (
    data: CreateFavoriteArticleCommand
  ): Promise<CustomResponseDto<CreatedFavoriteArticleResponse>> => {
    try {
      let response = await apiService.post("/FavoriteArticles", data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  deleteFavoriteArticle = async (
    id: string
  ): Promise<CustomResponseDto<DeletedFavoriteArticleResponse>> => {
    try {
      let response = await apiService.delete(`/FavoriteArticles/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getListFavoriteArticle = async (
    pageRequest: PageRequest
  ): Promise<
    CustomResponseDto<GetListResponse<GetListFavoriteArticleListItemDto>>
  > => {
    try {
      let response = await apiService.get(
        `/FavoriteArticles?PageIndex=${pageRequest.pageIndex}&PageSize=${pageRequest.pageSize}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  getByArticleId = async (
    articleId: string
  ): Promise<CustomResponseDto<GetByArticleIdFavoriteArticleResponse>> => {
    try {
      let response = await apiService.get(
        `/FavoriteArticles/GetByArticleId?articleId=${articleId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  deleteFavoriteArticleByArticleId = async (
    articleId: string
  ): Promise<CustomResponseDto<DeleteFavoriteArticleByArticleIdResponse>> => {
    try {
      let response = await apiService.delete(`/FavoriteArticles/DeleteByArticleId/${articleId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

}
const favoriteArticleService = new FavoriteArticleService();
export default favoriteArticleService;

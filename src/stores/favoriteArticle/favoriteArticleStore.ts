import { PageRequest } from "./../../services/base/models/PageRequest";
import { action, observable } from "mobx";
import { CreateFavoriteArticleCommand } from "../../services/favoriteArticle/dtos/createFavoriteArticleCommand";
import favoriteArticleService from "../../services/favoriteArticle/favoriteArticleService";
import { BaseStore } from "../base/baseStore";
import { CreatedFavoriteArticleResponse } from "../../services/favoriteArticle/dtos/createdFavoriteArticleResponse";
import { DeletedFavoriteArticleResponse } from "../../services/favoriteArticle/dtos/deletedFavoriteArticleResponse";
import { GetListFavoriteArticleListItemDto } from "../../services/favoriteArticle/dtos/getListFavoriteArticleListItemDto";
import { GetListResponse } from "../../services/base/models/GetListResponse";
import { GetByArticleIdFavoriteArticleResponse } from "../../services/favoriteArticle/dtos/getByArticleIdFavoriteArticleResponse";

export class FavoriteArticleStore extends BaseStore {
  @observable addedFavoriteArticle: CreatedFavoriteArticleResponse =
    {} as CreatedFavoriteArticleResponse;

  @observable deletedFavoriteArticle: DeletedFavoriteArticleResponse =
    {} as DeletedFavoriteArticleResponse;

  @observable
  listFavoriteArticle: GetListResponse<GetListFavoriteArticleListItemDto> =
    {} as GetListResponse<GetListFavoriteArticleListItemDto>;

  @observable
  getByArticleIdFavoriteArticleResponse: GetByArticleIdFavoriteArticleResponse =
    {} as GetByArticleIdFavoriteArticleResponse;

  @action
  addFavoriteArticle = async (data: CreateFavoriteArticleCommand) => {
    try {
      let response = await favoriteArticleService.addFavoriteArticle(data);
      this.addedFavoriteArticle = response.data;
      return response;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  deleteFavoriteArticle = async (id: string) => {
    try {
      let response = await favoriteArticleService.deleteFavoriteArticle(id);
      this.deletedFavoriteArticle = response.data;
      return response;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  getListFavoriteArticle = async (pageRequest: PageRequest) => {
    try {
      let response = await favoriteArticleService.getListFavoriteArticle(
        pageRequest
      );
      this.listFavoriteArticle = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  getByArticleId = async (articleId: string) => {
    try {
      let response = await favoriteArticleService.getByArticleId(articleId);
      this.getByArticleIdFavoriteArticleResponse = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const favoriteArticleStore = new FavoriteArticleStore();
export default favoriteArticleStore;

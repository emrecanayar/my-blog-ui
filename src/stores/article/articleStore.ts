import { ArticleListModel } from "./../../services/article/dtos/articleListModel";
import { PageRequest } from "./../../services/base/models/PageRequest";
import { action, observable } from "mobx";
import { BaseStore } from "../base/baseStore";
import articleService from "../../services/article/articleService";
import { CreateArticleCommand } from "../../services/article/dtos/createArticleCommand";
import { CreatedArticleResponse } from "../../services/article/dtos/createdArticleResponse";
import { DynamicQuery } from "../../services/base/models/DynamicQuery";
import { GetByIdArticleResponse } from "../../services/article/dtos/getByIdArticleResponse";

export class ArticleStore extends BaseStore {
  @observable addedArticle: CreatedArticleResponse =
    {} as CreatedArticleResponse;

  @observable articleList: ArticleListModel = {} as ArticleListModel;
  @observable article: GetByIdArticleResponse = {} as GetByIdArticleResponse;

  @action
  createArticle = async (data: CreateArticleCommand) => {
    try {
      let result = await articleService.addArticle(data);
      this.addedArticle = result.data;
      return result;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  getArticlesListByDynamic = async (
    pageRequest: PageRequest,
    dynamicQuery: DynamicQuery
  ) => {
    try {
      let result = await articleService.getArticleListByDynamic(
        pageRequest,
        dynamicQuery
      );
      this.articleList = result.data;
      return result.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  getArticleById = async (id: string) => {
    try {
      let result = await articleService.getArticleById(id);
      this.article = result.data;
      return result.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
var articleStore = new ArticleStore();
export default articleStore;

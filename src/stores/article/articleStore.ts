import { action, observable } from "mobx";
import { BaseStore } from "../base/baseStore";
import articleService from "../../services/article/articleService";
import { CreateArticleCommand } from "../../services/article/dtos/createArticleCommand";
import { CreatedArticleResponse } from "../../services/article/dtos/createdArticleResponse";

export class ArticleStore extends BaseStore {
  @observable addedArticle: CreatedArticleResponse =
    {} as CreatedArticleResponse;

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
}
var articleStore = new ArticleStore();
export default articleStore;

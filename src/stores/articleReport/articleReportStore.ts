import { CreatedArticleReportResponse } from "./../../services/articleReport/dtos/createdArticleReportResponse";
import { action, observable } from "mobx";
import { CreateArticleReportCommand } from "../../services/articleReport/dtos/createArticleReportCommand";
import articleReportService from "../../services/articleReport/articleReportService";
import { BaseStore } from "../base/baseStore";

export class ArticleReportStore extends BaseStore {
  @observable addedArticleReport: CreatedArticleReportResponse =
    {} as CreatedArticleReportResponse;
  @action
  add = async (createArticleReportCommand: CreateArticleReportCommand) => {
    try {
      let response = await articleReportService.add(createArticleReportCommand);
      this.addedArticleReport = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const articleReportStore = new ArticleReportStore();
export default articleReportStore;

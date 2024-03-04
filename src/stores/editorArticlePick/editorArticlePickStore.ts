import { action, observable } from "mobx";
import { PageRequest } from "../../services/base/models/PageRequest";
import { DynamicQuery } from "../../services/base/models/DynamicQuery";
import { BaseStore } from "../base/baseStore";
import editorArticlePickService from "../../services/editorArticlePick/editorArticlePickService";
import { EditorArticlePickListModel } from "../../services/editorArticlePick/dtos/editorArticlePickListModel";

export class EditorArticlePickStore extends BaseStore {
  @observable editorArticlePicks: EditorArticlePickListModel =
    {} as EditorArticlePickListModel;

  @action
  getListByDynamic = async (
    pageRequest: PageRequest,
    dynamicQuery: DynamicQuery
  ) => {
    try {
      let result = await editorArticlePickService.getListByDynamic(
        pageRequest,
        dynamicQuery
      );
      this.editorArticlePicks = result.data;
      return result.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const editorArticlePickStore = new EditorArticlePickStore();
export default editorArticlePickStore;

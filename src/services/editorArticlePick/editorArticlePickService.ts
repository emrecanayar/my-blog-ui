import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { DynamicQuery } from "../base/models/DynamicQuery";
import { PageRequest } from "../base/models/PageRequest";
import { EditorArticlePickListModel } from "./dtos/editorArticlePickListModel";

export class EditorArticlePickService {
  getListByDynamic = async (
    pageRequest: PageRequest,
    dynamicQuery: DynamicQuery
  ): Promise<CustomResponseDto<EditorArticlePickListModel>> => {
    try {
      let response = await apiService.postWithQuery(
        "/EditorArticlePicks/GetListByDynamic",
        pageRequest,
        dynamicQuery
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const editorArticlePickService = new EditorArticlePickService();
export default editorArticlePickService;

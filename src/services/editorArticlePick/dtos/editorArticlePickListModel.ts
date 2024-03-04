import { BasePageableModel } from "../../base/models/BasePageableModel";
import { GetListEditorArticlePickListItemDto } from "./getListEditorArticlePickListItemDto";

export interface EditorArticlePickListModel extends BasePageableModel {
  items: GetListEditorArticlePickListItemDto[];
}

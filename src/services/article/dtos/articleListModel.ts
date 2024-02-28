import { BasePageableModel } from "../../base/models/BasePageableModel";
import { GetListArticleListItemDto } from "./getListArticleListItemDto";

export interface ArticleListModel extends BasePageableModel {
  items: GetListArticleListItemDto[];
}

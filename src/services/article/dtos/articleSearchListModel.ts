import { BasePageableModel } from "../../base/models/BasePageableModel";
import { GetListArticleForSearchListItemDto } from "./getListArticleForSearchListItemDto";

export interface ArticleSearchListModel extends BasePageableModel {
    items: GetListArticleForSearchListItemDto[];
}

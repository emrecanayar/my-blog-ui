import { BasePageableModel } from "../../base/models/BasePageableModel";
import { GetListCommentListItemDto } from "./getListCommentListItemDto";

export interface CommentListModel extends BasePageableModel {
  items: GetListCommentListItemDto[];
}

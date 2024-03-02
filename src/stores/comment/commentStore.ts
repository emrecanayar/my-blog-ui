import { action, observable } from "mobx";
import { CreateCommentCommand } from "../../services/comment/dtos/createCommentCommand";
import { BaseStore } from "../base/baseStore";
import commentService from "../../services/comment/commentService";
import { CreatedCommentResponse } from "../../services/comment/dtos/createdCommentResponse";
import { PageRequest } from "../../services/base/models/PageRequest";
import { DynamicQuery } from "../../services/base/models/DynamicQuery";
import { CommentListModel } from "../../services/comment/dtos/commentListModel";

export class CommentStore extends BaseStore {
  @observable createdComment: CreatedCommentResponse =
    {} as CreatedCommentResponse;

  @observable commentList: CommentListModel = {} as CommentListModel;

  @action
  createComment = async (createCommentCommand: CreateCommentCommand) => {
    try {
      let response = await commentService.createComment(createCommentCommand);
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  getListByDynamic = async (
    pageRequest: PageRequest,
    dynamicQuery: DynamicQuery
  ) => {
    try {
      let response = await commentService.getListByDynamic(
        pageRequest,
        dynamicQuery
      );
      this.commentList = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const commentStore = new CommentStore();
export default commentStore;

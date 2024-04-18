import { action, observable } from "mobx";
import { CreateCommentCommand } from "../../services/comment/dtos/createCommentCommand";
import { BaseStore } from "../base/baseStore";
import commentService from "../../services/comment/commentService";
import { CreatedCommentResponse } from "../../services/comment/dtos/createdCommentResponse";
import { PageRequest } from "../../services/base/models/PageRequest";
import { DynamicQuery } from "../../services/base/models/DynamicQuery";
import { CommentListModel } from "../../services/comment/dtos/commentListModel";
import { CreateReplyCommentCommand } from "../../services/comment/dtos/createReplyCommentCommand";
import { UpdateCommentCommand } from "../../services/comment/dtos/updateCommentCommand";
import { UpdatedCommentResponse } from "../../services/comment/dtos/updatedCommentResponse";
import { EditCommentCommand } from "../../services/comment/dtos/editCommentCommand";
import { EditCommentResponse } from "../../services/comment/dtos/editCommentResponse";

export class CommentStore extends BaseStore {
  @observable createdComment: CreatedCommentResponse =
    {} as CreatedCommentResponse;

  @observable commentList: CommentListModel = {} as CommentListModel;

  @observable updatedComment: UpdatedCommentResponse =
    {} as UpdatedCommentResponse;

  @observable editedComment: EditCommentResponse = {} as EditCommentResponse;

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
  createReplyComment = async (
    createReplyCommentCommand: CreateReplyCommentCommand
  ) => {
    try {
      let response = await commentService.createReplyComment(
        createReplyCommentCommand
      );
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

  @action
  updateComment = async (updateCommentCommand: UpdateCommentCommand) => {
    try {
      let response = await commentService.updateComment(updateCommentCommand);
      this.updatedComment = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  editComment = async (editCommentCommand: EditCommentCommand) => {
    try {
      let response = await commentService.editComment(editCommentCommand);
      this.editedComment = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const commentStore = new CommentStore();
export default commentStore;

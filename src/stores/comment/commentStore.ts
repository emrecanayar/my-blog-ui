import { action, observable } from "mobx";
import { CreateCommentCommand } from "../../services/comment/dtos/createCommentCommand";
import { BaseStore } from "../base/baseStore";
import commentService from "../../services/comment/commentService";
import { CreatedCommentResponse } from "../../services/comment/dtos/createdCommentResponse";

export class CommentStore extends BaseStore {
  @observable createdComment: CreatedCommentResponse =
    {} as CreatedCommentResponse;

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
}
const commentStore = new CommentStore();
export default commentStore;

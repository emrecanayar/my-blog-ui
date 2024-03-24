import { action, observable } from "mobx";
import { CreateLikeCommand } from "../../services/like/dtos/createLikeCommand";
import { BaseStore } from "../base/baseStore";
import likeService from "../../services/like/likeService";
import { CreatedLikeResponse } from "../../services/like/dtos/createdLikeResponse";
import { GetByCommentIdLikeResponse } from "../../services/like/dtos/getByCommentIdLikeResponse";
import { GetByCommentIdDislikeResponse } from "../../services/like/dtos/getByCommentIdDislikeResponse";

export class LikeStore extends BaseStore {
  @observable createdLike: CreatedLikeResponse = {} as CreatedLikeResponse;
  @observable likeCount: GetByCommentIdLikeResponse =
    {} as GetByCommentIdLikeResponse;
  @observable dislikeCount: GetByCommentIdDislikeResponse =
    {} as GetByCommentIdDislikeResponse;

  @action
  createLike = async (createLikeCommand: CreateLikeCommand) => {
    try {
      let response = await likeService.createLike(createLikeCommand);
      this.createdLike = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  getByCommentIdLike = async (commentId: string) => {
    try {
      let response = await likeService.getByCommentIdLike(commentId);
      this.likeCount = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  getByCommentIdDislike = async (commentId: string) => {
    try {
      let response = await likeService.getByCommentIdDislike(commentId);
      this.dislikeCount = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const likeStore = new LikeStore();
export default likeStore;

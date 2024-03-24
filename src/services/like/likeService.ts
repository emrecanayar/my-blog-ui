import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { CreateLikeCommand } from "./dtos/createLikeCommand";
import { CreatedLikeResponse } from "./dtos/createdLikeResponse";
import { GetByCommentIdDislikeResponse } from "./dtos/getByCommentIdDislikeResponse";
import { GetByCommentIdLikeResponse } from "./dtos/getByCommentIdLikeResponse";

export class LikeService {
  createLike = async (
    createLikeCommand: CreateLikeCommand
  ): Promise<CustomResponseDto<CreatedLikeResponse>> => {
    try {
      let response = await apiService.post("likes", createLikeCommand);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getByCommentIdLike = async (
    commentId: string
  ): Promise<CustomResponseDto<GetByCommentIdLikeResponse>> => {
    try {
      let response = await apiService.get(
        `Likes/GetByCommentIdLike?commentId=${commentId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  getByCommentIdDislike = async (
    commentId: string
  ): Promise<CustomResponseDto<GetByCommentIdDislikeResponse>> => {
    try {
      let response = await apiService.get(
        `Likes/GetByCommentDislike?commentId=${commentId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const likeService = new LikeService();
export default likeService;

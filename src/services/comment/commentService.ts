import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { DynamicQuery } from "../base/models/DynamicQuery";
import { PageRequest } from "../base/models/PageRequest";
import { CreateReplyCommentCommand } from "./dtos/createReplyCommentCommand";
import { CommentListModel } from "./dtos/commentListModel";
import { CreateCommentCommand } from "./dtos/createCommentCommand";
import { CreatedCommentResponse } from "./dtos/createdCommentResponse";
import { CreatedReplyCommentResponse } from "./dtos/createdReplyCommentResponse";

export class CommentService {
  createComment = async (
    createCommentCommand: CreateCommentCommand
  ): Promise<CustomResponseDto<CreatedCommentResponse>> => {
    try {
      let response = await apiService.post("comments", createCommentCommand);
      return response;
    } catch (error) {
      throw error;
    }
  };

  createReplyComment = async (
    createReplyCommentCommand: CreateReplyCommentCommand
  ): Promise<CustomResponseDto<CreatedReplyCommentResponse>> => {
    try {
      let response = await apiService.post(
        "Comments/AddReplyComment",
        createReplyCommentCommand
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  getListByDynamic = async (
    pageRequest: PageRequest,
    dynamicQuery: DynamicQuery
  ): Promise<CustomResponseDto<CommentListModel>> => {
    try {
      let response = await apiService.postWithQuery(
        "/Comments/GetListByDynamic",
        pageRequest,
        dynamicQuery
      );

      return response;
    } catch (error) {
      throw error;
    }
  };
}
const commentService = new CommentService();
export default commentService;

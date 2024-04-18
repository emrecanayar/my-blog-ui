import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { DynamicQuery } from "../base/models/DynamicQuery";
import { PageRequest } from "../base/models/PageRequest";
import { CreateReplyCommentCommand } from "./dtos/createReplyCommentCommand";
import { CommentListModel } from "./dtos/commentListModel";
import { CreateCommentCommand } from "./dtos/createCommentCommand";
import { CreatedCommentResponse } from "./dtos/createdCommentResponse";
import { CreatedReplyCommentResponse } from "./dtos/createdReplyCommentResponse";
import { UpdateCommentCommand } from "./dtos/updateCommentCommand";
import { UpdatedCommentResponse } from "./dtos/updatedCommentResponse";
import { EditCommentCommand } from "./dtos/editCommentCommand";
import { EditCommentResponse } from "./dtos/editCommentResponse";

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

  updateComment = async (
    updateCommentCommand: UpdateCommentCommand
  ): Promise<CustomResponseDto<UpdatedCommentResponse>> => {
    try {
      let response = await apiService.put("/Comments", updateCommentCommand);
      return response;
    } catch (error) {
      throw error;
    }
  };

  editComment = async (
    editCommentCommand: EditCommentCommand
  ): Promise<CustomResponseDto<EditCommentResponse>> => {
    try {
      let response = await apiService.put(
        "/Comments/EditComment",
        editCommentCommand
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const commentService = new CommentService();
export default commentService;

import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { CreateCommentCommand } from "./dtos/createCommentCommand";
import { CreatedCommentResponse } from "./dtos/createdCommentResponse";

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
}
const commentService = new CommentService();
export default commentService;

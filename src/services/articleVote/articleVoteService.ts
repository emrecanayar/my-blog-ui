import { CreateArticleVoteCommand } from "./dtos/createArticleVoteCommand";
import apiService from "../base/apiService";
import { CreatedArticleVoteResponse } from "./dtos/createdArticleVoteResponse";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { GetByArticleIdArticleVoteUpvoteCountResponse } from "./dtos/getByArticleIdArticleVoteUpvoteCountResponse";

export class ArticleVoteService {
  createArticleVote = async (
    createArticleVoteCommand: CreateArticleVoteCommand
  ): Promise<CustomResponseDto<CreatedArticleVoteResponse>> => {
    try {
      let response = await apiService.post(
        "ArticleVotes",
        createArticleVoteCommand
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  getByArticleIdArticleVoteUpvoteCount = async (
    articleId: string
  ): Promise<
    CustomResponseDto<GetByArticleIdArticleVoteUpvoteCountResponse>
  > => {
    try {
      let response = await apiService.get(
        `ArticleVotes/GetByArticleIdArticleVoteUpvoteCount/${articleId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const articleVoteService = new ArticleVoteService();
export default articleVoteService;

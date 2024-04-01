import articleVoteService from "../../services/articleVote/articleVoteService";
import { CreatedArticleVoteResponse } from "../../services/articleVote/dtos/createdArticleVoteResponse";
import { BaseStore } from "../base/baseStore";
import { CreateArticleVoteCommand } from "./../../services/articleVote/dtos/createArticleVoteCommand";
import { action, observable } from "mobx";
import { VoteType } from "../../complexTypes/enums";
import { GetByArticleIdArticleVoteUpvoteCountResponse } from "../../services/articleVote/dtos/getByArticleIdArticleVoteUpvoteCountResponse";

export class ArticleVoteStore extends BaseStore {
  @observable addedArticleVote: CreatedArticleVoteResponse =
    {} as CreatedArticleVoteResponse;

  @observable upvoteCount: GetByArticleIdArticleVoteUpvoteCountResponse =
    {} as GetByArticleIdArticleVoteUpvoteCountResponse;

  @action
  articleUpVote = async (
    createArticleVoteCommand: CreateArticleVoteCommand
  ) => {
    try {
      createArticleVoteCommand.vote = VoteType.Upvote;
      let response = await articleVoteService.createArticleVote(
        createArticleVoteCommand
      );
      this.addedArticleVote = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  articleDownVote = async (
    createArticleVoteCommand: CreateArticleVoteCommand
  ) => {
    try {
      createArticleVoteCommand.vote = VoteType.Downvote;
      let response = await articleVoteService.createArticleVote(
        createArticleVoteCommand
      );
      this.addedArticleVote = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  getByArticleIdArticleVoteUpvoteCount = async (articleId: string) => {
    try {
      let response =
        await articleVoteService.getByArticleIdArticleVoteUpvoteCount(
          articleId
        );
      this.upvoteCount = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const articleVoteStore = new ArticleVoteStore();
export default articleVoteStore;

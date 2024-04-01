import { VoteType } from "../../../complexTypes/enums";

export interface CreateArticleVoteCommand {
  articleId: string;
  vote: VoteType;
}

import { VoteType } from "../../../complexTypes/enums";

export interface CreatedArticleVoteResponse {
  id: string;
  articleId: string;
  userId: string;
  vote: VoteType;
}

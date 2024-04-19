export interface CreateRatingCommand {
  score: number;
  articleId: string;
  userFullName: string;
  articleTitleForRating: string;
}

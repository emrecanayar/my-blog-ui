import { GetListLikeListItemDto } from "../../like/dtos/getListLikeListItemDto";
import { GetByIdUserResponse } from "../../user/dtos/getByIdUserResponse";

export interface GetListCommentListItemDto {
  id: string;
  authorName: string;
  authorEmail: string;
  authorWebsite: string;
  content: string;
  datePosted: Date;
  userId: string;
  user: GetByIdUserResponse;
  likes: GetListLikeListItemDto[];
  likeCount: number;
  dislikeCount: number;
  replies: GetListCommentListItemDto[];
}

import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { CreateRatingCommand } from "./dtos/createRatingCommand";
import { CreatedRatingResponse } from "./dtos/createdRatingResponse";
import { GetRatingInformationResponse } from "./dtos/getRatingInformationResponse";
import { UpdateRatingCommand } from "./dtos/updateRatingCommand";
import { UpdatedRatingResponse } from "./dtos/updatedRatingResponse";

export class RatingService {
  createRating = async (
    data: CreateRatingCommand
  ): Promise<CustomResponseDto<CreatedRatingResponse>> => {
    try {
      let response = await apiService.post("/Ratings", data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getRatingInformation = async (
    articleId: string
  ): Promise<CustomResponseDto<GetRatingInformationResponse>> => {
    try {
      let response = await apiService.get(`/Ratings?articleId=${articleId}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  updateRating = async (
    data: UpdateRatingCommand
  ): Promise<CustomResponseDto<UpdatedRatingResponse>> => {
    try {
      let response = await apiService.put("/Ratings", data);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const ratingService = new RatingService();
export default ratingService;

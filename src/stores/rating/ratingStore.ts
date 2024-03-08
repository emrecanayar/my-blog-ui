import { action, observable } from "mobx";
import { CreateRatingCommand } from "../../services/rating/dtos/createRatingCommand";
import { BaseStore } from "../base/baseStore";
import ratingService from "../../services/rating/ratingService";
import { CreatedRatingResponse } from "../../services/rating/dtos/createdRatingResponse";
import { GetRatingInformationResponse } from "../../services/rating/dtos/getRatingInformationResponse";
import { UpdateRatingCommand } from "../../services/rating/dtos/updateRatingCommand";
import { UpdatedRatingResponse } from "../../services/rating/dtos/updatedRatingResponse";

export class RatingStore extends BaseStore {
  @observable createdRating: CreatedRatingResponse =
    {} as CreatedRatingResponse;

  @observable ratingInformation: GetRatingInformationResponse =
    {} as GetRatingInformationResponse;

  @observable upadetedRating: UpdatedRatingResponse =
    {} as UpdatedRatingResponse;

  @action
  createRating = async (data: CreateRatingCommand) => {
    try {
      let response = await ratingService.createRating(data);
      this.createdRating = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  getRatingInformation = async (articleId: string) => {
    try {
      let response = await ratingService.getRatingInformation(articleId);
      this.ratingInformation = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  updateRating = async (data: UpdateRatingCommand) => {
    try {
      let response = await ratingService.updateRating(data);
      this.upadetedRating = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const ratingStore = new RatingStore();
export default ratingStore;

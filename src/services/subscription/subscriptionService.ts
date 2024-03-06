import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { CreateSubscriptionCommand } from "./dtos/createSubscriptionCommand";
import { CreatedSubscriptionResponse } from "./dtos/createdSubscriptionResponse";

export class SubscriptionService {
  createSubscription = async (
    createSubscriptionCommand: CreateSubscriptionCommand
  ): Promise<CustomResponseDto<CreatedSubscriptionResponse>> => {
    try {
      let response = await apiService.post(
        "/Subscriptions",
        createSubscriptionCommand
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const subscriptionService = new SubscriptionService();
export default subscriptionService;

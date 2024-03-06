import { CreatedSubscriptionResponse } from "../../services/subscription/dtos/createdSubscriptionResponse";
import subscriptionService from "../../services/subscription/subscriptionService";
import { BaseStore } from "../base/baseStore";
import { CreateSubscriptionCommand } from "./../../services/subscription/dtos/createSubscriptionCommand";
import { action, observable } from "mobx";

export class SubscriptionStore extends BaseStore {
  @observable addedSubscription: CreatedSubscriptionResponse =
    {} as CreatedSubscriptionResponse;

  @action
  createSubscription = async (
    createSubscriptionCommand: CreateSubscriptionCommand
  ) => {
    try {
      let response = await subscriptionService.createSubscription(
        createSubscriptionCommand
      );
      this.addedSubscription = response.data;
      return response;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const subscriptionStore = new SubscriptionStore();
export default subscriptionStore;

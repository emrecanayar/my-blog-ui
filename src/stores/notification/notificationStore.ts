import { action, observable } from "mobx";
import notificationService from "../../services/notification/notificationService";
import { CreateNotificationCommand } from "../../services/notification/dtos/createNotificationCommand";
import { CreatedNotificationResponse } from "../../services/notification/dtos/createdNotificationResponse";
import { BaseStore } from "../base/baseStore";
import { GetByUserIdNotificationResponse } from "../../services/notification/dtos/getByUserIdNotificationResponse";
import { MarkAsReadNotificationCommand } from "../../services/notification/dtos/markAsReadNotificationCommand";
import { MarkAsReadNotificationResponse } from "../../services/notification/dtos/markAsReadNotificationResponse";

export class NotificationStore extends BaseStore {
  @observable addedNotification: CreatedNotificationResponse =
    {} as CreatedNotificationResponse;

  @observable userNotificationList: GetByUserIdNotificationResponse =
    {} as GetByUserIdNotificationResponse;

  @observable readedNotification: MarkAsReadNotificationResponse =
    {} as MarkAsReadNotificationResponse;

  @action
  createNotification = async (data: CreateNotificationCommand) => {
    try {
      let response = await notificationService.createNotification(data);
      this.addedNotification = response.data;
      return response;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  getNotificationByUser = async () => {
    try {
      let response = await notificationService.getNotificationByUser();
      this.userNotificationList = response.data;
      return response;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  markAsReadNotification = async (data: MarkAsReadNotificationCommand) => {
    try {
      let response = await notificationService.markAsReadNotification(data);
      this.readedNotification = response.data;
      return response;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const notificationStore = new NotificationStore();
export default notificationStore;

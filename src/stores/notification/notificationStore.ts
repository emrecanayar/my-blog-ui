import { NotificationListModel } from "./../../services/notification/dtos/notificationListModel";
import { action, observable } from "mobx";
import notificationService from "../../services/notification/notificationService";
import { CreateNotificationCommand } from "../../services/notification/dtos/createNotificationCommand";
import { CreatedNotificationResponse } from "../../services/notification/dtos/createdNotificationResponse";
import { BaseStore } from "../base/baseStore";
import { GetByUserIdNotificationResponse } from "../../services/notification/dtos/getByUserIdNotificationResponse";
import { MarkAsReadNotificationCommand } from "../../services/notification/dtos/markAsReadNotificationCommand";
import { MarkAsReadNotificationResponse } from "../../services/notification/dtos/markAsReadNotificationResponse";
import { PageRequest } from "../../services/base/models/PageRequest";
import { DynamicQuery } from "../../services/base/models/DynamicQuery";
import { GetByIdNotificationResponse } from "../../services/notification/dtos/getByIdNotificationResponse";

export class NotificationStore extends BaseStore {
  @observable addedNotification: CreatedNotificationResponse =
    {} as CreatedNotificationResponse;

  @observable userNotificationList: GetByUserIdNotificationResponse =
    {} as GetByUserIdNotificationResponse;

  @observable readedNotification: MarkAsReadNotificationResponse =
    {} as MarkAsReadNotificationResponse;

  @observable notificationListModel: NotificationListModel =
    {} as NotificationListModel;

  @observable notificationDetail: GetByIdNotificationResponse =
    {} as GetByIdNotificationResponse;

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

  @action
  getListByDynamic = async (
    pageRequest: PageRequest,
    dynamicQuery: DynamicQuery
  ) => {
    try {
      let response = await notificationService.getListByDynamic(
        pageRequest,
        dynamicQuery
      );
      this.notificationListModel = response.data;
      return response;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  getById = async (id: string) => {
    try {
      let response = await notificationService.getById(id);
      this.notificationDetail = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const notificationStore = new NotificationStore();
export default notificationStore;

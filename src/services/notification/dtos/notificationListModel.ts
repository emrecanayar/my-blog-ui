import { BasePageableModel } from "../../base/models/BasePageableModel";
import { GetListNotificationListItemDto } from "./getListNotificationListItemDto";

export interface NotificationListModel extends BasePageableModel {
  items: GetListNotificationListItemDto[];
}

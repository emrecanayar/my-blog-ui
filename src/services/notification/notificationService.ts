import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { CreateNotificationCommand } from "./dtos/createNotificationCommand";
import { CreatedNotificationResponse } from "./dtos/createdNotificationResponse";
import { GetByUserIdNotificationResponse } from "./dtos/getByUserIdNotificationResponse";
import { MarkAsReadNotificationCommand } from "./dtos/markAsReadNotificationCommand";
import { MarkAsReadNotificationResponse } from "./dtos/markAsReadNotificationResponse";

export class NotificationService {
  createNotification = async (
    data: CreateNotificationCommand
  ): Promise<CustomResponseDto<CreatedNotificationResponse>> => {
    try {
      let response = await apiService.post("/Notifications", data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  getNotificationByUser = async (): Promise<
    CustomResponseDto<GetByUserIdNotificationResponse>
  > => {
    try {
      let response = await apiService.get("/Notifications/GetByUserId");
      return response;
    } catch (error) {
      throw error;
    }
  };

  markAsReadNotification = async (
    data: MarkAsReadNotificationCommand
  ): Promise<CustomResponseDto<MarkAsReadNotificationResponse>> => {
    try {
      let response = await apiService.put("/Notifications/MarkAsRead", data);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const notificationService = new NotificationService();
export default notificationService;

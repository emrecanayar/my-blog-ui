import { NotificationType } from "../../../complexTypes/enums";

export interface CreateNotificationCommand {
  userId: string;
  type: NotificationType;
  content: string;
}

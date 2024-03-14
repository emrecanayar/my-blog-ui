export interface GetByUserIdNotificationResponse {
  id: string;
  userId: string;
  type: string;
  content: string;
  isRead: boolean;
}

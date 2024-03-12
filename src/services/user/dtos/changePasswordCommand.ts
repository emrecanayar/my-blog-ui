export interface ChangePasswordCommand {
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

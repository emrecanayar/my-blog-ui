export interface RefreshToken {
  userId: string;
  token: string;
  expires: Date;
  createdByIp: string;
  revoked: Date;
  revokedByIp: string;
  replacedByToken: string;
  reasonRevoked: string;
}

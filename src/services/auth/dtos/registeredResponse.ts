import { RefreshToken } from "./refreshToken";
import { AccessToken } from "./accessToken";

export interface RegisteredResponse {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}

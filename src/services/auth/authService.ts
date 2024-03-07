import apiService from "../base/apiService";
import { AccessToken } from "./dtos/accessToken";
import { LoggedHttpResponse } from "./dtos/loggedHttpResponse";
import { UserForLoginDto } from "./dtos/userForLoginDto";
import { UserForRegisterDto } from "./dtos/userForRegisterDto";

class AuthService {
  login = async (login: UserForLoginDto): Promise<LoggedHttpResponse> => {
    try {
      let response = await apiService.post("/Auth/Login", login);
      return response;
    } catch (error) {
      throw error;
    }
  };

  register = async (register: UserForRegisterDto): Promise<AccessToken> => {
    try {
      let response = await apiService.post("/Auth/Register", register);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const authService = new AuthService();
export default authService;

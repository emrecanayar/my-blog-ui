import { action, makeObservable, observable } from "mobx";
import { UserForLoginDto } from "../../services/auth/dtos/userForLoginDto";
import authService from "../../services/auth/authService";
import { LoggedHttpResponse } from "../../services/auth/dtos/loggedHttpResponse";
import { BaseStore } from "../base/baseStore";
import { AccessToken } from "../../services/auth/dtos/accessToken";
import { RegisterCommand } from "../../services/auth/dtos/registerCommand";

export class AuthStore extends BaseStore {
  @observable loggedHttpResponse: LoggedHttpResponse = {} as LoggedHttpResponse;
  @observable isAuthenticated: boolean = false;
  @observable accessToken: AccessToken = {} as AccessToken;

  constructor() {
    super();
    makeObservable(this);
  }

  @action
  login = async (login: UserForLoginDto) => {
    try {
      this.clearFormErrors();
      var response = await authService.login(login);
      this.loggedHttpResponse = response;
      return response;
    } catch (error: any) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  register = async (register: RegisterCommand) => {
    try {
      let response = await authService.register(register);
      this.accessToken = response;
      return response;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  initializeAuthState = () => {
    const token = localStorage.getItem("token");
    this.isAuthenticated = !!token;
  };

  @action
  authenticatedUser = () => {
    this.isAuthenticated = true;
  };

  @action
  logOutUser = () => {
    localStorage.removeItem("token");
    this.isAuthenticated = false;
    window.location.href = "/";
  };

  @action
  logOutLoginUserAutomatically = () => {
    localStorage.removeItem("token");
    this.isAuthenticated = false;
  };
}
const authStore = new AuthStore();
export default authStore;

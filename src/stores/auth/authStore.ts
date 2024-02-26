import { action, makeObservable, observable } from "mobx";
import { UserForLoginDto } from "../../services/auth/dtos/userForLoginDto";
import authService from "../../services/auth/authService";
import { LoggedHttpResponse } from "../../services/auth/dtos/loggedHttpResponse";
import { BaseStore } from "../base/baseStore";

export class AuthStore extends BaseStore {
  @observable loggedHttpResponse: LoggedHttpResponse = {} as LoggedHttpResponse;
  @observable isAuthenticated: boolean = false;

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
  };
}
const authStore = new AuthStore();
export default authStore;

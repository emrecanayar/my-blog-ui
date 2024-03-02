import { action, makeObservable, observable } from "mobx";
import { BaseStore } from "../base/baseStore";
import userService from "../../services/user/userService";
import { GetByIdUserResponse } from "../../services/user/dtos/getByIdUserResponse";

export class UserStore extends BaseStore {
  @observable userInformation: GetByIdUserResponse = {} as GetByIdUserResponse;

  constructor() {
    super();
    makeObservable(this);
  }

  @action
  getFromAuth = async () => {
    try {
      let response = await userService.getFromAuth();
      this.userInformation = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const userStore = new UserStore();
export default userStore;

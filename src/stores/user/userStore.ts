import { action, makeObservable, observable } from "mobx";
import { BaseStore } from "../base/baseStore";
import userService from "../../services/user/userService";
import { GetByIdUserResponse } from "../../services/user/dtos/getByIdUserResponse";
import { UpdateUserInformationCommand } from "../../services/user/dtos/updateUserInformationCommand";
import { UpdatedUserResponse } from "../../services/user/dtos/updatedUserResponse";

export class UserStore extends BaseStore {
  @observable userInformation: GetByIdUserResponse = {} as GetByIdUserResponse;
  @observable updateUserInformationResponse: UpdatedUserResponse =
    {} as UpdatedUserResponse;

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

  @action
  updateUserInformation = async (data: UpdateUserInformationCommand) => {
    try {
      let response = await userService.updateUserInformation(data);
      this.updateUserInformationResponse = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const userStore = new UserStore();
export default userStore;

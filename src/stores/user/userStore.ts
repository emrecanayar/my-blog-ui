import { action, makeObservable, observable } from "mobx";
import { BaseStore } from "../base/baseStore";
import userService from "../../services/user/userService";
import { GetByIdUserResponse } from "../../services/user/dtos/getByIdUserResponse";
import { UpdateUserInformationCommand } from "../../services/user/dtos/updateUserInformationCommand";
import { UpdatedUserResponse } from "../../services/user/dtos/updatedUserResponse";
import { ChangePasswordCommand } from "../../services/user/dtos/changePasswordCommand";
import { ChangePasswordUserResponse } from "../../services/user/dtos/changePasswordUserResponse";

export class UserStore extends BaseStore {
  @observable userInformation: GetByIdUserResponse = {} as GetByIdUserResponse;
  @observable updateUserInformationResponse: UpdatedUserResponse =
    {} as UpdatedUserResponse;
  @observable changePasswordUserResponse: ChangePasswordUserResponse =
    {} as ChangePasswordUserResponse;

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

  @action
  changePassword = async (data: ChangePasswordCommand) => {
    try {
      let response = await userService.changePassword(data);
      this.changePasswordUserResponse = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const userStore = new UserStore();
export default userStore;

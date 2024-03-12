import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { ChangePasswordCommand } from "./dtos/changePasswordCommand";
import { ChangePasswordUserResponse } from "./dtos/changePasswordUserResponse";
import { GetByIdUserResponse } from "./dtos/getByIdUserResponse";
import { UpdateUserInformationCommand } from "./dtos/updateUserInformationCommand";
import { UpdatedUserResponse } from "./dtos/updatedUserResponse";

export class UserService {
  getFromAuth = async (): Promise<CustomResponseDto<GetByIdUserResponse>> => {
    try {
      let response = apiService.get("/Users/GetFromAuth");
      return response;
    } catch (error) {
      console.log("Kullanıcı bilgilerini çekerken hata oluştu. Hata: ", error);
      throw error;
    }
  };

  updateUserInformation = async (
    data: UpdateUserInformationCommand
  ): Promise<CustomResponseDto<UpdatedUserResponse>> => {
    try {
      let response = apiService.put("/Users/UpdateUserInformation", data);
      return response;
    } catch (error) {
      console.log(
        "Kullanıcı bilgilerini güncellerken hata oluştu. Hata: ",
        error
      );
      throw error;
    }
  };

  changePassword = async (
    data: ChangePasswordCommand
  ): Promise<CustomResponseDto<ChangePasswordUserResponse>> => {
    try {
      let response = apiService.put("/Users/ChangePassword", data);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const userService = new UserService();
export default userService;

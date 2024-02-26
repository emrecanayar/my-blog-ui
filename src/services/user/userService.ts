import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { GetByIdUserResponse } from "./dtos/getByIdUserResponse";

export class UserService {
  getFromAuth = async ():Promise<CustomResponseDto<GetByIdUserResponse>> => {
    try {
      let response = apiService.get("/Users/GetFromAuth");
      return response;
    } catch (error) {
      console.log("Kullanıcı bilgilerini çekerken hata oluştu. Hata: ", error);
      throw error;
    }
  };
}
const userService = new UserService();
export default userService;

import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { CreateContactCommand } from "./dtos/CreateContactCommand";
import { CreatedContactResponse } from "./dtos/CreatedContactResponse";

class ContactService {
  createContact = async (
    contact: CreateContactCommand
  ): Promise<CustomResponseDto<CreatedContactResponse>> => {
    try {
      let response = await apiService.post("/Contacts", contact);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const classService = new ContactService();
export default classService;

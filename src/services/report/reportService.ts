import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { CreateReportCommand } from "./dtos/createReportCommand";
import { CreatedReportResponse } from "./dtos/createdReportResponse";

export class ReportService {
  createReport = async (
    createReportCommand: CreateReportCommand
  ): Promise<CustomResponseDto<CreatedReportResponse>> => {
    try {
      let response = await apiService.post("reports", createReportCommand);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
const reportService = new ReportService();
export default reportService;

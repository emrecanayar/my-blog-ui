import { CreatedReportResponse } from "../../services/report/dtos/createdReportResponse";
import reportService from "../../services/report/reportService";
import { BaseStore } from "../base/baseStore";
import { CreateReportCommand } from "./../../services/report/dtos/createReportCommand";
import { action, observable } from "mobx";

export class ReportStore extends BaseStore {
  @observable createdReport: CreatedReportResponse =
    {} as CreatedReportResponse;

  @action
  createReport = async (createReportCommand: CreateReportCommand) => {
    try {
      let response = await reportService.createReport(createReportCommand);
      this.createdReport = response.data;
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const reportStore = new ReportStore();
export default reportStore;

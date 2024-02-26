import { RecordStatu } from "../../../complexTypes/enums";

export interface GetByIdUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: RecordStatu;
}

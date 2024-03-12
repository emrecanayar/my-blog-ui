import { RecordStatu } from "../../../complexTypes/enums";

export interface UpdatedUserResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    statu: RecordStatu;
}
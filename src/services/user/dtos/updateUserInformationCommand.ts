import { CultureType } from "../../../complexTypes/enums";

export interface UpdateUserInformationCommand {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cultureType: CultureType;
}

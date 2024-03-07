import { UserForRegisterDto } from "./userForRegisterDto";
export interface RegisterCommand {
  userForRegisterDto: UserForRegisterDto;
  tokens: string[];
}

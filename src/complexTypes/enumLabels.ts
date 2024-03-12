import { CultureType } from "./enums";

export const cultureLabels: { [key in CultureType]: string } = {
  [CultureType.None]: "Belirtilmemiş",
  [CultureType.Türk]: "Türk",
  [CultureType.English]: "English",
};

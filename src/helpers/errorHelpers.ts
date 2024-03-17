import { toast } from "react-toastify";

export const handleApiError = (error: any) => {
  if (error.validationErrors) {
    error.validationErrors.forEach((valError: any) => {
      valError.Errors.forEach((errMsg: string) => {
        toast.warning(errMsg);
      });
    });
  } else if (error.generalMessage && error.validationErrors === null) {
    toast.error(error.generalMessage);
  } else {
    console.log("An unexpected error occurred", error);
    if (error.generalMessage === "") {
      console.log("An unexpected error occurred", error);
    } else {
      toast.error("Beklenmedik bir hata oluştu.");
    }
  }
};

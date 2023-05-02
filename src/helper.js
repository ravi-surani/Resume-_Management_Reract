import { toast } from "react-toastify";

export const showToastMessageSuccess = (mess) => {
    toast.success(mess || "Details Submitted Successfully!", {});
  };
  export const showToastMessageFailure = (mess) => {
    toast.error(mess || "Something went wrong", {});
  };
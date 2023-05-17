import axios from "axios";
import { INTERVIEWER } from "../../../config";

export const addInterviewerService = async (formData) => {
    return axios({
      method: "post",
      url: INTERVIEWER,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
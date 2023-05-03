import axios from "axios";
import { INTERVIEW } from "../../config";

export const addInterviewService = async (formData) => {
    return axios({
      method: "post",
      url: INTERVIEW,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  export const viewInterviewService = async () => {
    return axios.get(`${INTERVIEW}`);
  };
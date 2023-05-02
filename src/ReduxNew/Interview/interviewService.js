import axios from "axios";
import { ADD_INTERVIEW } from "../../config";

export const addInterviewService = async (formData) => {
    return axios({
      method: "post",
      url: ADD_INTERVIEW,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };
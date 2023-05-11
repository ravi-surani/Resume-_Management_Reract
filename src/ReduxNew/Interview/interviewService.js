import axios from "axios";
import { INTERVIEW, INTERVIEW_BY_ID } from "../../config";

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

  export const getInterviewByIdService = async (id) => {
    return axios.get(`${INTERVIEW_BY_ID}/${id}`);
  };

  export const updateInterviewByIdService = async (formData, id) => {
    return axios({
      method: "put",
      url: `${INTERVIEW}/${id}`,
      data: formData,
    });
  };
import axios from "axios";
import { CANDIDATE } from "../../config";

export const addCandidateService = async (formData) => {
    return axios({
      method: "post",
      url: CANDIDATE,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  };


  export const viewCandidateService = async () => {
    return axios.get(`${CANDIDATE}`);
  };
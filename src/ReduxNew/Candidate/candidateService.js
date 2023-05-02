import axios from "axios";
import { ADD_CANDIDATE } from "../../config";

export const addCandidateService = async (formData) => {
    return axios({
      method: "post",
      url: ADD_CANDIDATE,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
     
  };
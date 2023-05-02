import axios from "axios";
import { LOGIN_API } from "../../config";

export const loginService = async (formData) => {
    return axios({
      method: "post",
      url: LOGIN_API,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
     
  };
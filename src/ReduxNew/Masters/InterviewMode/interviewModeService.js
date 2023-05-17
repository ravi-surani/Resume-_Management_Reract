import axios from "axios";
import { ACTIVE_INTERVIEW_MODE } from "../../../config";

export const activeInterviewModesService = async () => {
    return axios.get(`${ACTIVE_INTERVIEW_MODE}`);
  };
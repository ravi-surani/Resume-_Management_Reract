import axios from "axios";
import { ACTIVE_DEGREE } from "../../../config";

export const activeDegree = async () => {
    return axios.get(`${ACTIVE_DEGREE}`);
  };
import axios from "axios";
import { SOURCE } from "../../../config";

export const viewSourceService = async () => {
    return axios.get(`${SOURCE}`);
  };
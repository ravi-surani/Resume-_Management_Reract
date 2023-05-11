import axios from "axios";
import {ACTIVE_SKILL_TYPE} from "../../../src/config"

export const viewActiveSkillTypeService = async () => {
    return axios.get(`${ACTIVE_SKILL_TYPE}`);
  };
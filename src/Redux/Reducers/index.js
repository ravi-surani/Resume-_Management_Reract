import { combineReducers } from "redux"

import { loginUserReducer, getAllUsers, createNewUserReducer, reomveUserReducer } from './LoginReducer.js';

import { getCandidatesReducer, } from './CandidateReducer';
import { getAllSourceReducer, getActiveSourceReducer, addSourceReducer, updateSourceReducer, removedSourceReducer, } from './SourceReducer';
import { getAllSkillTypeReducer, addSkillTypeReducer, updateSkillTypeReducer, removedSkillTypeReducer, } from './SkillTypeReducer';
import { getAllSkillReducer, getActiveSkillReducer, addSkillReducer, updateSkillReducer, removedSkillReducer, } from './SkillsReducer';
import { getAllRecruitmentStatusReducer, getActiveRecruitmentStatusReducer, addRecruitmentStatusReducer, updateRecruitmentStatusReducer, removedRecruitmentStatusReducer, } from './RecruitmentStatusReducer';
import { getAllModeOfWorkReducer, getActiveModeOfWorkReducer, addModeOfWorkReducer, updateModeOfWorkReducer, removedModeOfWorkReducer, } from './ModeOfWorkReducer';
import { getAllInterviewerReducer, getActiveInterviewerReducer, addInterviewerReducer, updateInterviewerReducer, removedInterviewerReducer, } from './InterviewerReducer';
import { getAllInterviewTypeReducer, getActiveInterviewTypeReducer, addInterviewTypeReducer, updateInterviewTypeReducer, removedInterviewTypeReducer, } from './InterviewTypeReducer';
import { getAllDegreeReducer, getActiveDegreeReducer, addDegreeReducer, updateDegreeReducer, removedDegreeReducer, } from './DegreeReducer';
import { getAllInterviewModeReducer, addInterviewModeReducer, updateInterviewModeReducer, removedInterviewModeReducer, } from './InterviewModeReducer';
import { getAllInterviewsReducer, getInterviewsByIdReducer, addInterviewsReducer, updateInterviewsReducer, removedInterviewsReducer, } from './interviewReducer';


export const MainReducer = combineReducers({
    loginUserReducer, getAllUsers, createNewUserReducer, reomveUserReducer,

    getCandidatesReducer,
    getAllSourceReducer, getActiveSourceReducer, addSourceReducer, updateSourceReducer, removedSourceReducer,
    getAllSkillTypeReducer, addSkillTypeReducer, updateSkillTypeReducer, removedSkillTypeReducer,
    getAllSkillReducer, getActiveSkillReducer, addSkillReducer, updateSkillReducer, removedSkillReducer,
    getAllRecruitmentStatusReducer, getActiveRecruitmentStatusReducer, addRecruitmentStatusReducer, updateRecruitmentStatusReducer, removedRecruitmentStatusReducer,
    getAllModeOfWorkReducer, getActiveModeOfWorkReducer, addModeOfWorkReducer, updateModeOfWorkReducer, removedModeOfWorkReducer,
    getAllInterviewerReducer, getActiveInterviewerReducer, addInterviewerReducer, updateInterviewerReducer, removedInterviewerReducer,
    getAllInterviewTypeReducer, getActiveInterviewTypeReducer, addInterviewTypeReducer, updateInterviewTypeReducer, removedInterviewTypeReducer,
    getAllDegreeReducer, getActiveDegreeReducer, addDegreeReducer, updateDegreeReducer, removedDegreeReducer,
    getAllInterviewModeReducer, addInterviewModeReducer, updateInterviewModeReducer, removedInterviewModeReducer,
    getAllInterviewsReducer, getInterviewsByIdReducer, addInterviewsReducer, updateInterviewsReducer, removedInterviewsReducer,
})


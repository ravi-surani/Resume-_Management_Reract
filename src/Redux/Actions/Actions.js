import { Services } from "./Services"
import Constants from "../Constants"

// Login
const userLogin = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.USER_LOG_IN_REQUEST, })
        Services.postService('login', details).then(
            (response) => {

                if (response.success) {
                    localStorage.setItem('login_user', JSON.stringify(response.user))

                    window.location.reload();
                    return Dispatch({ type: Constants.USER_LOG_IN_SUCESS, data: response.user })
                }
                else {
                    localStorage.removeItem('login_user');
                    return Dispatch({ type: Constants.USER_LOG_IN_FAILED, data: response })
                }
            },
            (error) => {
                localStorage.removeItem('login_user');
                return Dispatch({ type: Constants.USER_LOG_IN_FAILED, data: error })
            }
        )
    }
}

const getAllUsers = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_USER_REQUEST, })
        Services.getService('allusers').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_USER_SUCESS, data: response.user }) }
                else { return Dispatch({ type: Constants.GET_ALL_USER_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_USER_FAILED, data: error }) }
        )
    }
}

// Login
const createNewUser = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.CREATE_NEW_USER_REQUEST, })
        Services.postService('register', details).then(
            (response) => {
                if (response.success) {
                    return Dispatch({ type: Constants.CREATE_NEW_USER_SUCESS, data: response.user })
                }
                else {
                    return Dispatch({ type: Constants.CREATE_NEW_USER_FAILED, data: response })
                }
            },
            (error) => {
                return Dispatch({ type: Constants.CREATE_NEW_USER_FAILED, data: error })
            }
        )
    }
}


const removeUser = (details) => {
    return (Dispatch) => {

        Dispatch({ type: Constants.CREATE_NEW_USER_REQUEST, })
        Services.postService('remove/' + details).then(
            (response) => {
                if (response.success) {
                    return Dispatch({ type: Constants.REMOVE_USER_SUCESS, data: response.user })
                }
                else {
                    return Dispatch({ type: Constants.REMOVE_USER_FAILED, data: response })
                }
            },
            (error) => {
                return Dispatch({ type: Constants.REMOVE_USER_FAILED, data: error })
            }
        )
    }
}



const setUserLoginDetails = (details) => {
    return (Dispatch) => { return Dispatch({ type: Constants.USER_LOG_IN_SUCESS, data: details }) }
}

const userLogout = () => {
    localStorage.removeItem('login_user');
    window.location.reload();
    return (Dispatch) => { return Dispatch({ type: Constants.USER_LOG_IN_SUCESS, data: null }) }
}


// Candidates Master
const getAllCandidates = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_CANDIDATES_REQUEST, })
        Services.getService('candidatemaster').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_CANDIDATES_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ALL_CANDIDATES_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_CANDIDATES_FAILED, data: error }) }
        )
    }
}

const getCandidateById = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_CANDIDATES_BY_ID_REQUEST, })
        Services.getService('candidatemaster/' + id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_CANDIDATES_BY_ID_SUCESS, data: response.candidate }) }
                else { return Dispatch({ type: Constants.GET_CANDIDATES_BY_ID_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_CANDIDATES_BY_ID_FAILED, data: error }) }
        )
    }
}

const addNewCandidate = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ADD_CANDIDATES_REQUEST, })
        Services.postService('candidatemaster', details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.ADD_CANDIDATES_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.ADD_CANDIDATES_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ADD_CANDIDATES_SUCESS, data: error }) }
        )
    }
}

const updateCandidateDetails = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.UPDATE_CANDIDATES_REQUEST, })
        Services.patchService('candidatemaster', details.id, details).then(
            (response) => {

                if (response.success) { return Dispatch({ type: Constants.UPDATE_CANDIDATES_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.UPDATE_CANDIDATES_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.UPDATE_CANDIDATES_FAILED, data: error }) }
        )
    }
}

const removeCandidate = (id) => {

    return (Dispatch) => {
        Dispatch({ type: Constants.REMOVE_CANDIDATES_REQUEST, })
        Services.deleteService('candidatemaster', id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.REMOVE_CANDIDATES_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.REMOVE_CANDIDATES_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.REMOVE_CANDIDATES_FAILED, data: error }) }
        )
    }


}

// Source Master
const getAllSource = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_SOURCE_REQUEST, })
        Services.getService('sourcemaster').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_SOURCE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ALL_SOURCE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_SOURCE_FAILED, data: error }) }
        )
    }
}

const getActiveSource = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ACTIVE_SOURCE_REQUEST, })
        Services.getService('getactivesource').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ACTIVE_SOURCE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ACTIVE_SOURCE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ACTIVE_SOURCE_FAILED, data: error }) }
        )
    }
}

const getSourceById = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ADD_SOURCE_BY_ID_REQUEST, })
        Services.getService('sourcemaster/' + id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.ADD_SOURCE_BY_ID_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.ADD_SOURCE_BY_ID_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ADD_SOURCE_BY_ID_FAILED, data: error }) }
        )
    }
}

const addNewSource = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ADD_SOURCE_REQUEST, })
        Services.postService('sourcemaster', details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.ADD_SOURCE_SUCESS, data: response.source }) }
                else { return Dispatch({ type: Constants.ADD_SOURCE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ADD_SOURCE_FAILED, data: error }) }
        )
    }
}

const updateSourceDetails = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.UPDATE_SOURCE_REQUEST, })
        Services.patchService('sourcemaster', details?.id, details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.UPDATE_SOURCE_SUCESS, data: response.source }) }
                else { return Dispatch({ type: Constants.UPDATE_SOURCE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.UPDATE_CANDIDATES_FAILED, data: error }) }
        )
    }
}

const removeSource = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.REMOVE_SOURCE_REQUEST, })
        Services.deleteService('sourcemaster', id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.REMOVE_SOURCE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.REMOVE_SOURCE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.REMOVE_SOURCE_FAILED, data: error }) }
        )
    }
}

// Skill Master
const getAllSkill = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_SKILL_REQUEST, })
        Services.getService('skillmaster').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_SKILL_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ALL_SKILL_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_SKILL_FAILED, data: error }) }
        )
    }
}

const getActiveSkill = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ACTIVE_SKILL_REQUEST, })
        Services.getService('getactiveskill').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ACTIVE_SKILL_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ACTIVE_SKILL_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ACTIVE_SKILL_FAILED, data: error }) }
        )
    }
}


const getSkillById = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_SKILL_BY_ID_REQUEST, })
        Services.getService('skillmaster/' + id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_SKILL_BY_ID_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_SKILL_BY_ID_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_SKILL_BY_ID_FAILED, data: error }) }
        )
    }
}

const addNewSkill = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ADD_SKILL_REQUEST, })
        Services.postService('skillmaster', details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.ADD_SKILL_SUCESS, data: response.skill }) }
                else { return Dispatch({ type: Constants.ADD_SKILL_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ADD_SKILL_FAILED, data: error }) }
        )
    }
}

const updateSkillDetails = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.UPDATE_SKILL_REQUEST, })
        Services.patchService('skillmaster', details?.id, details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.UPDATE_SKILL_SUCESS, data: response.skill }) }
                else { return Dispatch({ type: Constants.UPDATE_SKILL_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.UPDATE_SKILL_FAILED, data: error }) }
        )
    }
}

const removeSkill = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.REMOVE_SKILL_REQUEST, })
        Services.deleteService('skillmaster', id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.REMOVE_SKILL_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.REMOVE_SKILL_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.REMOVE_SKILL_FAILED, data: error }) }
        )
    }
}

// Skill Type Master
const getAllSkillType = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_SKILL_TYPE_REQUEST, })
        Services.getService('skilltypemaster').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_SKILL_TYPE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ALL_SKILL_TYPE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_SKILL_TYPE_FAILED, data: error }) }
        )
    }
}

const getSkillTypeById = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_SKILL_TYPE_BY_ID_REQUEST, })
        Services.getService('skilltypemaster/' + id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_SKILL_TYPE_BY_ID_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_SKILL_TYPE_BY_ID_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_SKILL_TYPE_BY_ID_FAILED, data: error }) }
        )
    }
}

const addNewSkillType = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ADD_SKILL_TYPE_REQUEST, })
        Services.postService('skilltypemaster', details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.ADD_SKILL_TYPE_SUCESS, data: response.skill_type }) }
                else { return Dispatch({ type: Constants.ADD_SKILL_TYPE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ADD_SKILL_TYPE_FAILED, data: error }) }
        )
    }
}

const updateSkillTypeDetails = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.UPDATE_SKILL_TYPE_REQUEST, })
        Services.patchService('skilltypemaster', details?.id, details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.UPDATE_SKILL_TYPE_SUCESS, data: response.skill_type }) }
                else { return Dispatch({ type: Constants.UPDATE_SKILL_TYPE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.UPDATE_SKILL_TYPE_FAILED, data: error }) }
        )
    }
}

const removeSkillType = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.REMOVE_SKILL_TYPE_REQUEST, })
        Services.deleteService('skilltypemaster', id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.REMOVE_SKILL_TYPE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.REMOVE_SKILL_TYPE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.REMOVE_SKILL_TYPE_FAILED, data: error }) }
        )
    }
}

// Recruitment Status Master
const getAllRecruitmentStatus = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_RECRUITMENT_STATUS_REQUEST, })
        Services.getService('recruitmentstatusmaster').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_RECRUITMENT_STATUS_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ALL_RECRUITMENT_STATUS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_RECRUITMENT_STATUS_FAILED, data: error }) }
        )
    }
}

const getActiveRecruitmentStatus = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ACTIVE_RECRUITMENT_STATUS_REQUEST, })
        Services.getService('getactiverecruitmentstatus').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ACTIVE_RECRUITMENT_STATUS_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ACTIVE_RECRUITMENT_STATUS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ACTIVE_RECRUITMENT_STATUS_FAILED, data: error }) }
        )
    }
}

const addNewRecruitmentStatus = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ADD_RECRUITMENT_STATUS_REQUEST, })
        Services.postService('recruitmentstatusmaster', details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.ADD_RECRUITMENT_STATUS_SUCESS, data: response.skill_type }) }
                else { return Dispatch({ type: Constants.ADD_RECRUITMENT_STATUS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ADD_RECRUITMENT_STATUS_FAILED, data: error }) }
        )
    }
}

const updateSRecruitmentStatusTypeDetails = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.UPDATE_RECRUITMENT_STATUS_REQUEST, })
        Services.patchService('recruitmentstatusmaster', details?.id, details).then(
            (response) => {

                if (response.success) { return Dispatch({ type: Constants.UPDATE_RECRUITMENT_STATUS_SUCESS, data: response.skill_type }) }
                else { return Dispatch({ type: Constants.UPDATE_RECRUITMENT_STATUS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.UPDATE_RECRUITMENT_STATUS_FAILED, data: error }) }
        )
    }
}

const removeRecruitmentStatus = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.REMOVE_RECRUITMENT_STATUS_REQUEST, })
        Services.deleteService('recruitmentstatusmaster', id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.REMOVE_RECRUITMENT_STATUS_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.REMOVE_RECRUITMENT_STATUS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.REMOVE_RECRUITMENT_STATUS_FAILED, data: error }) }
        )
    }
}

// Mode of Work Master
const getAllModeOfWorkStatus = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_MODE_OF_WORK_REQUEST, })
        Services.getService('modeofworkmaster').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_MODE_OF_WORK_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ALL_MODE_OF_WORK_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_MODE_OF_WORK_FAILED, data: error }) }
        )
    }
}

const getActiveModeOfWorkStatus = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ACTIVE_MODE_OF_WORK_REQUEST, })
        Services.getService('getactiveremodeofwork').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ACTIVE_MODE_OF_WORK_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ACTIVE_MODE_OF_WORK_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ACTIVE_MODE_OF_WORK_FAILED, data: error }) }
        )
    }
}

const addNewModeOfWorkStatus = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ADD_MODE_OF_WORK_REQUEST, })
        Services.postService('modeofworkmaster', details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.ADD_MODE_OF_WORK_SUCESS, data: response.mode_of_work }) }
                else { return Dispatch({ type: Constants.ADD_MODE_OF_WORK_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ADD_MODE_OF_WORK_FAILED, data: error }) }
        )
    }
}

const updateModeOfWorkDetails = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.UPDATE_MODE_OF_WORK_REQUEST, })
        Services.patchService('modeofworkmaster', details?.id, details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.UPDATE_MODE_OF_WORK_SUCESS, data: response.mode_of_work }) }
                else { return Dispatch({ type: Constants.UPDATE_MODE_OF_WORK_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.UPDATE_MODE_OF_WORK_FAILED, data: error }) }
        )
    }
}

const removeModeOfWorkStatus = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.REMOVE_MODE_OF_WORK_REQUEST, })
        Services.deleteService('modeofworkmaster', id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.REMOVE_MODE_OF_WORK_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.REMOVE_MODE_OF_WORK_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.REMOVE_MODE_OF_WORK_FAILED, data: error }) }
        )
    }
}

// Interview Type master
const getAllInterviewType = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_INTERVIEW_TYPE_REQUEST, })
        Services.getService('interviewtypemaster').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_INTERVIEW_TYPE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ALL_INTERVIEW_TYPE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_INTERVIEW_TYPE_FAILED, data: error }) }
        )
    }
}
const getActiveInterviewType = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ACTIVE_INTERVIEW_TYPE_REQUEST, })
        Services.getService('getactiveinterviewtype').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ACTIVE_INTERVIEW_TYPE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ACTIVE_INTERVIEW_TYPE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ACTIVE_INTERVIEW_TYPE_FAILED, data: error }) }
        )
    }
}

const addNewInterviewTypeStatus = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ADD_INTERVIEW_TYPE_REQUEST, })
        Services.postService('interviewtypemaster', details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.ADD_INTERVIEW_TYPE_SUCESS, data: response.interview_type }) }
                else { return Dispatch({ type: Constants.ADD_INTERVIEW_TYPE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ADD_INTERVIEW_TYPE_FAILED, data: error }) }
        )
    }
}

const updateInterviewTypeDetails = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.UPDATE_INTERVIEW_TYPE_REQUEST, })
        Services.patchService('interviewtypemaster', details?.id, details).then(
            (response) => {
                if (response.success) {
                    return Dispatch({ type: Constants.UPDATE_INTERVIEW_TYPE_SUCESS, data: response.interview_type })
                }
                else { return Dispatch({ type: Constants.UPDATE_INTERVIEW_TYPE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.UPDATE_INTERVIEW_TYPE_FAILED, data: error }) }
        )
    }
}

const removeInterviewTypeStatus = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.REMOVE_INTERVIEW_TYPE_REQUEST, })
        Services.deleteService('interviewtypemaster', id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.REMOVE_INTERVIEW_TYPE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.REMOVE_INTERVIEW_TYPE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.REMOVE_INTERVIEW_TYPE_FAILED, data: error }) }
        )
    }
}

// Interviewer
const getAllInterviewer = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_INTERVIEWER_REQUEST, })
        Services.getService('interviewermaster').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_INTERVIEWER_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ALL_INTERVIEWER_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_INTERVIEWER_FAILED, data: error }) }
        )
    }
}
const getActiveInterviewer = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ACTIVE_INTERVIEWER_REQUEST, })
        Services.getService('getactiveinterviewer').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ACTIVE_INTERVIEWER_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ACTIVE_INTERVIEWER_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ACTIVE_INTERVIEWER_FAILED, data: error }) }
        )
    }
}

const addNewInterviewer = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ADD_INTERVIEWER_REQUEST, })
        Services.postService('interviewermaster', details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.ADD_INTERVIEWER_SUCESS, data: response.Interviewer }) }
                else { return Dispatch({ type: Constants.ADD_INTERVIEWER_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ADD_INTERVIEWER_FAILED, data: error }) }
        )
    }
}

const updateInterviewerDetails = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.UPDATE_INTERVIEWER_REQUEST, })
        Services.patchService('interviewermaster', details?.id, details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.UPDATE_INTERVIEWER_SUCESS, data: response.Interviewer }) }
                else { return Dispatch({ type: Constants.UPDATE_INTERVIEWER_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.UPDATE_INTERVIEWER_FAILED, data: error }) }
        )
    }
}

const removeInterviewerStatus = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.REMOVE_INTERVIEWER_REQUEST, })
        Services.deleteService('interviewermaster', id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.REMOVE_INTERVIEWER_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.REMOVE_INTERVIEWER_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.REMOVE_INTERVIEWER_FAILED, data: error }) }
        )
    }
}

// Interview Mode
const getAllInterviewMode = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_INTERVIEW_MODE_REQUEST, })
        Services.getService('interviewmodemaster').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_INTERVIEW_MODE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ALL_INTERVIEW_MODE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_INTERVIEW_MODE_FAILED, data: error }) }
        )
    }
}
const getActiveInterviewMode = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_INTERVIEW_MODE_REQUEST, })
        Services.getService('getactiveinterviewmode').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_INTERVIEW_MODE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ALL_INTERVIEW_MODE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_INTERVIEW_MODE_FAILED, data: error }) }
        )
    }
}

const addNewInterviewMode = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ADD_INTERVIEW_MODE_REQUEST, })
        Services.postService('interviewmodemaster', details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.ADD_INTERVIEW_MODE_SUCESS, data: response.interview_mode }) }
                else { return Dispatch({ type: Constants.ADD_INTERVIEW_MODE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ADD_INTERVIEW_MODE_FAILED, data: error }) }
        )
    }
}

const updateInterviewModeDetails = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.UPDATE_INTERVIEW_MODE_REQUEST, })
        Services.patchService('interviewmodemaster', details?.id, details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.UPDATE_INTERVIEW_MODE_SUCESS, data: response.interview_mode }) }
                else { return Dispatch({ type: Constants.UPDATE_INTERVIEW_MODE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.UPDATE_INTERVIEW_MODE_FAILED, data: error }) }
        )
    }
}

const removeInterviewModeStatus = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.REMOVE_INTERVIEW_MODE_REQUEST, })
        Services.deleteService('interviewmodemaster', id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.REMOVE_INTERVIEW_MODE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.REMOVE_INTERVIEW_MODE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.REMOVE_INTERVIEW_MODE_FAILED, data: error }) }
        )
    }
}

// Degree 
const getAllDegree = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_DEGREE_REQUEST, })
        Services.getService('degreemaster').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_DEGREE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ALL_DEGREE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_DEGREE_FAILED, data: error }) }
        )
    }
}

const getActiveDegree = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ACTIVE_DEGREE_REQUEST, })
        Services.getService('degreemaster').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ACTIVE_DEGREE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ACTIVE_DEGREE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ACTIVE_DEGREE_FAILED, data: error }) }
        )
    }
}

const addNewDegree = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ADD_DEGREE_REQUEST, })
        Services.postService('degreemaster', details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.ADD_DEGREE_SUCESS, data: response.degree }) }
                else { return Dispatch({ type: Constants.ADD_DEGREE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ADD_DEGREE_FAILED, data: error }) }
        )
    }
}

const updateDegreeDetails = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.UPDATE_DEGREE_REQUEST, })
        Services.patchService('degreemaster', details?.id, details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.UPDATE_DEGREE_SUCESS, data: response.degree }) }
                else { return Dispatch({ type: Constants.UPDATE_DEGREE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.UPDATE_DEGREE_FAILED, data: error }) }
        )
    }
}

const removeDegreeStatus = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.REMOVE_DEGREE_REQUEST, })
        Services.deleteService('degreemaster', id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.REMOVE_DEGREE_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.REMOVE_DEGREE_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.REMOVE_DEGREE_FAILED, data: error }) }
        )
    }
}

// Degree 
const getAllInterview = () => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_ALL_INTERVIEWS_REQUEST, })
        Services.getService('interviews').then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_ALL_INTERVIEWS_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_ALL_INTERVIEWS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_ALL_INTERVIEWS_FAILED, data: error }) }
        )
    }
}

const getInterviewById = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.GET_INTERVIEWS_BY_ID_REQUEST, })
        Services.getService('interviews/' + id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.GET_INTERVIEWS_BY_ID_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.GET_INTERVIEWS_BY_ID_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.GET_INTERVIEWS_BY_ID_FAILED, data: error }) }
        )
    }
}

const addNewInterview = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.ADD_INTERVIEWS_REQUEST, })
        Services.postService('interviews', details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.ADD_INTERVIEWS_SUCESS, data: response.interview_details }) }
                else { return Dispatch({ type: Constants.ADD_INTERVIEWS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.ADD_INTERVIEWS_FAILED, data: error }) }
        )
    }
}

const updateInterviewDetails = (details) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.UPDATE_INTERVIEWS_REQUEST, })
        Services.patchService('interviews', details?.id, details).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.UPDATE_INTERVIEWS_SUCESS, data: response.degree }) }
                else { return Dispatch({ type: Constants.UPDATE_INTERVIEWS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.UPDATE_INTERVIEWS_FAILED, data: error }) }
        )
    }
}

const removeInterviewStatus = (id) => {
    return (Dispatch) => {
        Dispatch({ type: Constants.REMOVE_INTERVIEWS_REQUEST, })
        Services.deleteService('interview', id).then(
            (response) => {
                if (response.success) { return Dispatch({ type: Constants.REMOVE_INTERVIEWS_SUCESS, data: response.data }) }
                else { return Dispatch({ type: Constants.REMOVE_INTERVIEWS_FAILED, data: response }) }
            },
            (error) => { return Dispatch({ type: Constants.REMOVE_INTERVIEWS_FAILED, data: error }) }
        )
    }
}

export {
    // Login
    userLogin,
    setUserLoginDetails,
    userLogout,
    getAllUsers,
    createNewUser,
    removeUser,

    // Candidates Master
    getAllCandidates,
    getCandidateById,
    addNewCandidate,
    updateCandidateDetails,
    removeCandidate,

    // Source Master
    getAllSource,
    getActiveSource,
    getSourceById,
    addNewSource,
    updateSourceDetails,
    removeSource,

    // Skill Master
    getAllSkill,
    getSkillById,
    addNewSkill,
    updateSkillDetails,
    removeSkill,

    // Skill Type Master
    getAllSkillType,
    getActiveSkill,
    getSkillTypeById,
    addNewSkillType,
    updateSkillTypeDetails,
    removeSkillType,

    // Recruitment Status Master
    getAllRecruitmentStatus,
    getActiveRecruitmentStatus,
    addNewRecruitmentStatus,
    updateSRecruitmentStatusTypeDetails,
    removeRecruitmentStatus,

    // Mode of Work Master
    getAllModeOfWorkStatus,
    getActiveModeOfWorkStatus,
    addNewModeOfWorkStatus,
    updateModeOfWorkDetails,
    removeModeOfWorkStatus,

    // Interview Type master
    getAllInterviewType,
    getActiveInterviewType,
    addNewInterviewTypeStatus,
    updateInterviewTypeDetails,
    removeInterviewTypeStatus,

    // Interviewer
    getAllInterviewer,
    getActiveInterviewer,
    addNewInterviewer,
    updateInterviewerDetails,
    removeInterviewerStatus,

    // Interview Mode
    getAllInterviewMode,
    addNewInterviewMode,
    updateInterviewModeDetails,
    removeInterviewModeStatus,

    // Degree 
    getAllDegree,
    getActiveDegree,
    addNewDegree,
    updateDegreeDetails,
    removeDegreeStatus,

    // Interview
    getAllInterview,
    getInterviewById,
    addNewInterview,
    updateInterviewDetails,
    removeInterviewStatus,
}
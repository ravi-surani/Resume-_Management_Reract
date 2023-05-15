import React, { useEffect, useState } from "react";
import {
  addNewInterview,
  getActiveInterviewType,
  getActiveInterviewer,
  getAllInterviewMode,
  getInterviewById,
  updateInterviewDetails,
} from "../../Redux/Actions/Actions";
import {
  addInterviewAction,
  getInterviewByInterviewId,
  updateInterviewById,
} from "../../ReduxNew/Interview/interviewAction";
import { connect } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import NevbarComponent from "../NevbarComponent";
import SidebarComponent from "../SidebarComponent";
import { useNavigate, useParams } from "react-router-dom";

const EditScheduledInterview = ({
  interviewTypeListResponse,
  updateInterviewDetailsAction,
  interviewerListProp,
  getInterviewByIdAction,
  getActiveInterviewTypeAction,
  getActiveInterviewerAction,
  getAllInterviewModeAction,
  newInterviewsProp,
  interviewModeListProp,
  interviewDetailResponse,
  dispatchgetInterviewByInterview,
  getInterviewByInterviewIdResponse,
  getInterviewByInterviewIdLoading,
  dispatchUpdateInterview,
  candidate_id
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (params.id) {
      getInterviewByIdAction(params.id);
    }
    getActiveInterviewTypeAction();
    getActiveInterviewerAction();
    getAllInterviewModeAction();
  }, [newInterviewsProp]);

  useEffect(() => {
    if (params.id) {
      dispatchgetInterviewByInterview(params.id);
    }
  }, [params.id]);

//   const candidate_master_id = 

  const formikScheduleInterviewForm = useFormik({
    initialValues: {
      interview_type_id: "",
      interviewer_id: "",
      interview_mode_id: "",
      date: "",
      remarks: "",
      location_link: "",
    },
    validationSchema: Yup.object().shape({
      interview_type_id: Yup.string().required("Interview type is required"),
      interviewer_id: Yup.string().required("Interviewer is required"),
      interview_mode_id: Yup.string().required("Interview mode is required"),
      date: Yup.string().required("Date is required"),
      location_link: Yup.string().required("Location or link is required"),
    }),
    onSubmit: async(values) => {
      setIsLoading(true);
      try {
        if(candidate_id){
          await dispatchUpdateInterview({ ...values, candidate_master_id: candidate_id }, params.id, navigate, candidate_id);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (getInterviewByInterviewIdResponse?.interview?.location_link) {
      formikScheduleInterviewForm.setValues({
        ...formikScheduleInterviewForm.values,
        location_link:
          getInterviewByInterviewIdResponse.interview.location_link,
        remarks: getInterviewByInterviewIdResponse.interview.remarks,
        date: getInterviewByInterviewIdResponse.interview.date,
        interview_mode_id:
          getInterviewByInterviewIdResponse.interview.interview_mode_id,
        interviewer_id:
          getInterviewByInterviewIdResponse.interview.interviewer_id.id,
        interview_type_id:
          getInterviewByInterviewIdResponse.interview.interview_type_id,
      });
    }
  }, [getInterviewByInterviewIdResponse]);

  return (
    <>
      <NevbarComponent
        title={"Interview"}
        breadcrumbPath={[{ link: "interview", value: "Interview Details" }]}
      />
      <SidebarComponent />
      <div className="container-xl">
        <form onSubmit={formikScheduleInterviewForm.handleSubmit}>
          {getInterviewByInterviewIdLoading && (
            <div className="d-flex justify-content-center mt-2">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {!getInterviewByInterviewIdLoading &&
            getInterviewByInterviewIdResponse && (
              <div className="card-body">
                <div className="col-lg-8 ">
                  <label className="col-form-label fw-bold fs-6 mt-2">
                    Interview Type
                  </label>
                  <select
                    id="interview_type_id"
                    className="form-control form-control-lg form-control-solid text2"
                    name="interview_type_id"
                    onBlur={formikScheduleInterviewForm.handleBlur}
                    value={formikScheduleInterviewForm.values.interview_type_id}
                    onChange={formikScheduleInterviewForm.handleChange}
                  >
                    <option disabled selected="selected">
                      Select{" "}
                    </option>
                    {interviewTypeListResponse?.map((Types) => {
                      return (
                        <option
                          value={Types.id}
                          selected={
                            Types.id ===
                            formikScheduleInterviewForm.values.interview_type_id
                          }
                        >
                          {Types.interview_type}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-lg-8">
                  <label className="col-form-label mt-2">Interviewer</label>
                  <select
                    id="interviewer_id"
                    className="form-control form-control-lg form-control-solid text2"
                    name="interviewer_id"
                    onBlur={formikScheduleInterviewForm.handleBlur}
                    value={formikScheduleInterviewForm.values.interviewer_id}
                    onChange={formikScheduleInterviewForm.handleChange}
                  >
                    <option disabled selected="selected">
                      Select{" "}
                    </option>
                    {interviewerListProp?.map((Types) => {
                      return (
                        <option
                          value={Types.id}
                          selected={
                            Types.id ===
                            formikScheduleInterviewForm.values.interviewer_id
                          }
                        >
                          {Types.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-lg-8">
                  <label className="col-form-label mt-2">Interview Mode</label>
                  <select
                    id="interview_mode_id"
                    className="form-control form-control-lg form-control-solid text2"
                    name="interview_mode_id"
                    onBlur={formikScheduleInterviewForm.handleBlur}
                    value={formikScheduleInterviewForm.values.interview_mode_id}
                    onChange={formikScheduleInterviewForm.handleChange}
                  >
                    <option disabled selected="selected">
                      Select{" "}
                    </option>
                    {interviewModeListProp?.map((Types) => {
                      return (
                        <option
                          value={Types.id}
                          selected={
                            Types.id ===
                            formikScheduleInterviewForm.values.interview_mode_id
                          }
                        >
                          {Types.interview_mode}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-lg-8">
                  <label className="col-form-label mt-2">Date </label>
                  <input
                    id="date"
                    name="date"
                    type="datetime-local"
                    className="form-control form-control-lg form-control-solid text2"
                    value={formikScheduleInterviewForm.values.date}
                    onChange={formikScheduleInterviewForm.handleChange}
                    onBlur={formikScheduleInterviewForm.handleBlur}
                  />
                </div>

                <div className="col-lg-8">
                  <label className="col-form-label mt-2">Location Link </label>
                  <input
                    id="location_link"
                    name="location_link"
                    type="text"
                    className="form-control form-control-lg form-control-solid text2"
                    value={formikScheduleInterviewForm.values.location_link}
                    onChange={formikScheduleInterviewForm.handleChange}
                  />
                </div>
                <div className="col-lg-8">
                  <label className="col-form-label mt-2">Remarks </label>
                  <input
                    id="remarks"
                    name="remarks"
                    type="text"
                    className="form-control form-control-lg form-control-solid text2"
                    value={formikScheduleInterviewForm.values.remarks}
                    onChange={formikScheduleInterviewForm.handleChange}
                  />
                </div>
                <div className="col-lg-12 mt-4">
                  <button className="btn-primary btn" type="submit">
                    Update
                  </button>
                </div>
              </div>
            )}
        </form>
      </div>
    </>
  );
};

const mapStatetoProps = (state) => {
  return {
    getInterviewByInterviewIdLoading: state.viewInterviewByIdReducer.loading,
    getInterviewByInterviewIdResponse: state.viewInterviewByIdReducer.data,
    candidate_id: state.viewInterviewByIdReducer?.data?.candidate ? state.viewInterviewByIdReducer?.data?.candidate[0].id: undefined,
    
    interviewDetailResponse: state?.getInterviewsByIdReducer?.InterviewsDetials,
    interviewTypeListResponse:
      state?.getActiveInterviewTypeReducer?.interviewTypesList,
    interviewerListProp: state?.getActiveInterviewerReducer?.interviewerList,
    newInterviewsProp: state?.addInterviewsReducer?.newInterviews,
    interviewModeListProp: state?.getAllInterviewModeReducer?.interviewModeList,
  };
};

const mapDispatchtoProps = {
  dispatchgetInterviewByInterview: (id) => getInterviewByInterviewId(id),
  dispatchUpdateInterview: (data, id, callback, candidate_id) => updateInterviewById(data, id, callback, candidate_id),

  getInterviewByIdAction: (id) => getInterviewById(id),
  getActiveInterviewTypeAction: () => getActiveInterviewType(),
  getActiveInterviewerAction: () => getActiveInterviewer(),
  getAllInterviewModeAction: () => getAllInterviewMode(),
  addNewInterviewAction: (details) => addNewInterview(details),
  addInterviewDispatch: (details, id) => addInterviewAction(details, id),
  updateInterviewDetailsAction: (details) => updateInterviewDetails(details),
};
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(EditScheduledInterview);

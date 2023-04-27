import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux'

import { Formik, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";

import { getInterviewById, getActiveInterviewType, getActiveInterviewer, getAllInterviewMode, addNewInterview, updateInterviewDetails } from '../../Redux/Actions/Actions';

import SidebarComponent from '../SidebarComponent';
import NevbarComponent from '../NevbarComponent';
import { Link, useParams } from 'react-router-dom';

function InterviewDetailsComponent({ interviewsDetialsProp, interviewTypesListProp, interviewerListProp, interviewModeListProp, newInterviewsProp,
    getInterviewByIdAction, getActiveInterviewTypeAction, getActiveInterviewerAction, getAllInterviewModeAction, addNewInterviewAction, updateInterviewDetailsAction }) {

    const { id } = useParams()
    const [scheduleInterview, setScheduleInterview] = useState();

    useEffect(() => {
        if (id) {
            getInterviewByIdAction(id)
        }
        getActiveInterviewTypeAction();
        getActiveInterviewerAction();
        getAllInterviewModeAction();
    }, [newInterviewsProp]);


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
            interview_type_id: Yup.string().required("Please selct Interview Type."),
            interviewer_id: Yup.string().required("Please selct Interviewer."),
            interview_mode_id: Yup.string().required("Please selct Interview Mode."),
            date: Yup.string().required("Please enter selct Date."),
            location_link: Yup.string().required("Please enter Location Or Link."),
        }),
        onSubmit: (values, { resetForm }) => {
            debugger
            if (values?.id) {
                updateInterviewDetailsAction(values);
            }
            else {
                addNewInterviewAction({ ...values, "candidate_master_id": interviewsDetialsProp?.candidate[0]?.id })
            }
            resetForm();
        }
    });
    return (
        <>
            <NevbarComponent title={"Candidate Details"} breadcrumbPath={[{ link: 'candidate', value: "Candidate Details" }]} />
            <SidebarComponent />
            <div className="content-wrapper">
                <div className="container-fluid px-5">
                    <div className="content-header row">
                        <h1 className="m-0 col-9 ">Candidate Details</h1>
                        <div className='col-3 d-flex justify-content-lg-around '>

                            <button className="btn btn-primary " onClick={() => setScheduleInterview(true)}>Schedule Interview</button>
                            <Link to={'/'} className="btn btn-danger ">Back</Link>
                        </div>
                    </div>
                    <div className="wrapper">
                        <section className="content">
                            <div className="card">
                                <div className="card-body">
                                    <div className='d-flex justify-content-between '>
                                        <div className="w-75">
                                            <label className="font-weight-normal h6 ">Name :
                                                <span className='h5'> {interviewsDetialsProp?.candidate[0]?.name}</span>
                                            </label>
                                        </div>
                                        <div className="">
                                            <Link className='btn btn-primary ' to={interviewsDetialsProp?.resume_id}> Resume </Link>
                                        </div>
                                    </div>
                                    <div className="">
                                        <label className="font-weight-normal h6 ">Remarks :
                                            <span className='h5'> {interviewsDetialsProp?.remarks}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {scheduleInterview &&
                                <Formik
                                    initialValues={formikScheduleInterviewForm.initialValues}
                                    enableReinitialize={true}
                                    validateOnChange={false}
                                    validateOnBlur={false}
                                    onSubmit={values => { formikScheduleInterviewForm.handleSubmit(values) }}>
                                    {props => (
                                        <form onSubmit={props.handleSubmit}>
                                            <div className="wrapper">
                                                <section className="content">
                                                    <div className="card">
                                                        <div className='card-header bg-secondary'>
                                                            <h3 className='card-title col-10'>Schedule Interview</h3>
                                                            <button type='button' className="btn btn-danger col-1 btn-sm " onClick={() => setScheduleInterview(false)}>Cancel</button>
                                                            <button type='submit' className="btn btn-primary col-1 btn-sm ">Save</button>
                                                        </div>
                                                        <div className="card-body">

                                                            <div className='row'>
                                                                <div className="col-4 ">
                                                                    <label htmlFor="name" className="font-weight-normal mt-2 h6">Interview Type</label>
                                                                    <select
                                                                        id="interview_type_id"
                                                                        className={"form-control "}
                                                                        name='interview_type_id'
                                                                        onChange={selectedOption => {
                                                                            formikScheduleInterviewForm.setFieldValue('interview_type_id', selectedOption?.target?.value)
                                                                        }}
                                                                        onBlur={formikScheduleInterviewForm.handleBlur}>
                                                                        <option disabled selected='selected'>Select </option>
                                                                        {interviewTypesListProp?.map(Types => {
                                                                            return <option value={Types.id} selected={formikScheduleInterviewForm?.values?.interview_type_id == Types.id ? true : false} >{Types.interview_type} </option>
                                                                        }
                                                                        )}
                                                                    </select>
                                                                    {formikScheduleInterviewForm.touched.interview_type_id && formikScheduleInterviewForm.errors.interview_type_id ? (
                                                                        <span className="text-danger">{formikScheduleInterviewForm.errors.interview_type_id}</span>) : null}
                                                                </div>

                                                                <div className="col-4 ">
                                                                    <label htmlFor="name" className="font-weight-normal mt-2 h6">Interviewer</label>
                                                                    <select
                                                                        id="interviewer_id"
                                                                        className={"form-control "}
                                                                        name='interviewer_id'
                                                                        onChange={selectedOption => {
                                                                            formikScheduleInterviewForm.setFieldValue('interviewer_id', selectedOption?.target?.value)
                                                                        }}
                                                                        onBlur={formikScheduleInterviewForm.handleBlur}>
                                                                        <option disabled selected='selected'>Select </option>
                                                                        {interviewerListProp?.map(interviewer => {
                                                                            return <option key={interviewer.id} value={interviewer.id} selected={formikScheduleInterviewForm?.values?.interviewer_id == interviewer.id ? true : false} >{interviewer.name} </option>
                                                                        }
                                                                        )}
                                                                    </select>
                                                                    {formikScheduleInterviewForm.touched.interviewer_id && formikScheduleInterviewForm.errors.interviewer_id ? (
                                                                        <span className="text-danger">{formikScheduleInterviewForm.errors.interviewer_id}</span>) : null}
                                                                </div>

                                                                <div className="col-4 ">
                                                                    <label htmlFor="name" className="font-weight-normal mt-2 h6">Interview Mode</label>
                                                                    <select
                                                                        id="interview_mode_id"
                                                                        className={"form-control "}
                                                                        name='interview_mode_id'
                                                                        onChange={selectedOption => {
                                                                            formikScheduleInterviewForm.setFieldValue('interview_mode_id', selectedOption?.target?.value)
                                                                        }}
                                                                        onBlur={formikScheduleInterviewForm.handleBlur}>
                                                                        <option disabled selected='selected'>Select </option>
                                                                        {interviewModeListProp?.map(mode => <option  key={mode.id} value={mode.id} selected={formikScheduleInterviewForm?.values?.interview_mode_id == mode.id ? true : false} >{mode.interview_mode} </option>

                                                                        )}
                                                                    </select>
                                                                    {formikScheduleInterviewForm.touched.interview_mode_id && formikScheduleInterviewForm.errors.interview_mode_id ? (
                                                                        <span className="text-danger">{formikScheduleInterviewForm.errors.interview_mode_id}</span>) : null}
                                                                </div>
                                                                <div className="col-4 ">
                                                                    <label htmlFor="current_salary" className="font-weight-normal h6">Date  </label>
                                                                    <input
                                                                        id="date"
                                                                        name="date"
                                                                        type="datetime-local"
                                                                        className={"form-control "}
                                                                        onChange={formikScheduleInterviewForm.handleChange}
                                                                        onBlur={formikScheduleInterviewForm.handleBlur}
                                                                        value={formikScheduleInterviewForm.values.date}
                                                                    />
                                                                    {formikScheduleInterviewForm.touched.date && formikScheduleInterviewForm.errors.date ? (
                                                                        <span className="text-danger small">{formikScheduleInterviewForm.errors.date}</span>
                                                                    ) : null}
                                                                </div>
                                                                <div className="col-4 ">
                                                                    <label htmlFor="current_salary" className="font-weight-normal h6">Location Link </label>
                                                                    <input
                                                                        id="location_link"
                                                                        name="location_link"
                                                                        type="text"
                                                                        className={"form-control "}
                                                                        onChange={formikScheduleInterviewForm.handleChange}
                                                                        onBlur={formikScheduleInterviewForm.handleBlur}
                                                                        value={formikScheduleInterviewForm.values.location_link}
                                                                    />
                                                                    {formikScheduleInterviewForm.touched.location_link && formikScheduleInterviewForm.errors.location_link ? (
                                                                        <span className="text-danger small">{formikScheduleInterviewForm.errors.location_link}</span>
                                                                    ) : null}
                                                                </div>
                                                                <div className="col-4 ">
                                                                    <label htmlFor="current_salary" className="font-weight-normal h6">Remarks </label>
                                                                    <input
                                                                        id="remarks"
                                                                        name="remarks"
                                                                        type="text"
                                                                        className={"form-control "}
                                                                        onChange={formikScheduleInterviewForm.handleChange}
                                                                        onBlur={formikScheduleInterviewForm.handleBlur}
                                                                        value={formikScheduleInterviewForm.values.remarks}
                                                                    />
                                                                    {formikScheduleInterviewForm.touched.remarks && formikScheduleInterviewForm.errors.remarks ? (
                                                                        <span className="text-danger small">{formikScheduleInterviewForm.errors.remarks}</span>
                                                                    ) : null}
                                                                </div>

                                                            </div>


                                                        </div>

                                                    </div>
                                                </section>
                                            </div>

                                        </form>
                                    )}
                                </Formik>
                            }
                            <div className="card">
                                <div className='card-header bg-secondary'>
                                    <h3 className='card-title col-10'>Interviewers</h3>
                                </div>
                                <div className="card-body">
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Interview Type</th>
                                                <th>Date</th>
                                                <th>Mode</th>
                                                <th>Interviewer</th>
                                                <th>Remarks</th>
                                                <th>Location Link</th>
                                                <th>Points</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {interviewsDetialsProp?.interviews?.map(interview => {
                                                return <tr  key={interview.id}>
                                                    <td>{interview?.interview_type?.interview_type}</td>
                                                    <td>{interview?.date}</td>
                                                    <td>{interview?.interview_mode?.interview_mode}</td>
                                                    <td>{interview?.interviewer_id?.name}</td>
                                                    <td>{interview?.remarks}</td>
                                                    <td>{interview?.location_link}</td>
                                                    <td>{interview?.total_rating}</td>
                                                    <td><button className='btn btn-primary btn-sm' onClick={() => {
                                                        formikScheduleInterviewForm.setValues(interview)
                                                        setScheduleInterview(interview)
                                                    }}>Chnage</button> </td>
                                                </tr>
                                            })

                                            }
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                            <div className=' card '>
                                <div className='card-header bg-secondary'>
                                    <span className='card-title'>Skills </span>
                                </div>


                                <div className='card-body '>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Skill</th>
                                                <th>Self Rating</th>
                                                <th>Theory Rating</th>
                                                <th>Practical Ratings</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {interviewsDetialsProp?.skills?.map(skill => {
                                                return <tr  key={skill.id}>
                                                    <td>{skill.skill}</td>
                                                    <td>{skill.self_rating}</td>
                                                    <td>{skill.theory_rating}</td>
                                                    <td>{skill.practical_rating}</td>
                                                </tr>
                                            })}

                                        </tbody>

                                    </table>


                                    {/* <div className='row'>
                                            {interviewsDetialsProp?.skills?.map(skill => {
                                                // debugger
                                                return <div className='col-3 '>
                                                    <h5 className='border-bottom'>{skill?.skill}</h5>
                                                    <div className='row'>
                                                        <div className='col-4'>
                                                            <span> Self Rating</span>
                                                            <h6>{skill.self_rating}</h6>
                                                        </div>
                                                        <div className='col-4'>
                                                            <span> Self Rating</span>
                                                            <h6>{skill.self_rating}</h6>
                                                        </div>
                                                        <div className='col-4'>
                                                            <span> Self Rating</span>
                                                            <h6>{skill.self_rating}</h6>
                                                        </div>



                                                    </div>
                                                </div>
                                      
                                    })}
                                      */}
                                </div>
                            </div>



                        </section>
                    </div >
                </div >
            </div >
        </>
    )
}

const mapStatetoProps = (state) => {
    return {
        interviewsDetialsProp: state?.getInterviewsByIdReducer?.InterviewsDetials,
        interviewTypesListProp: state?.getActiveInterviewTypeReducer?.interviewTypesList,
        interviewerListProp: state?.getActiveInterviewerReducer?.interviewerList,
        interviewModeListProp: state?.getAllInterviewModeReducer?.interviewModeList,
        newInterviewsProp: state?.addInterviewsReducer?.newInterviews,


    }
}

const mapDispatchtoProps = {
    getInterviewByIdAction: (id) => getInterviewById(id),
    getActiveInterviewTypeAction: () => getActiveInterviewType(),
    getActiveInterviewerAction: () => getActiveInterviewer(),
    getAllInterviewModeAction: () => getAllInterviewMode(),
    addNewInterviewAction: (details) => addNewInterview(details),
    updateInterviewDetailsAction: (details) => updateInterviewDetails(details),
}
export default connect(mapStatetoProps, mapDispatchtoProps)(InterviewDetailsComponent)
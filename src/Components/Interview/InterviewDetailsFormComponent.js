import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";

import { Formik, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";

import {
  getCandidateById,
  getAllSkill,
  getAllSource,
  getAllDegree,
  getAllModeOfWorkStatus,
  getAllRecruitmentStatus,
  updateCandidateDetails,
  addNewCandidate,
} from "../../Redux/Actions/Actions";

import SidebarComponent from "../SidebarComponent";
import NevbarComponent from "../NevbarComponent";
import { Link, useNavigate, useParams } from "react-router-dom";

function InterviewDetailsFormComponent({
  candidateDetialsProp,
  sourceListProp,
  degreeListProp,
  skillListProp,
  modeOfWorkListProp,
  recruitmentStatusListProps,
  newCandidateProps,
  updatedCandidateProps,
  addNewCandidateAction,
  updateCandidateDetailsAction,
  getAllSkillAction,
  getAllSourceAction,
  getCandidateByIdAction,
  getAllDegreeAction,
  getAllModeOfWorkStatusAction,
  getAllRecruitmentStatusAction,
}) {
  const [skillDataModel, setSkillDataModel] = useState(false);
  const [previsCompaniesModel, setPrevisCompaniesModel] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCandidateByIdAction(id || 0);

    getAllSourceAction();
    getAllSkillAction();
    getAllRecruitmentStatusAction();
    getAllModeOfWorkStatusAction();
    getAllDegreeAction();
  }, []);

  useEffect(() => {
    if (candidateDetialsProp) {
      formikForm.setValues(candidateDetialsProp);
    }
  }, [candidateDetialsProp]);

  useEffect(() => {
    if (newCandidateProps?.sucess || updatedCandidateProps?.sucess) {
      // navigate('/candidate');
    }
  }, [newCandidateProps, updatedCandidateProps]);

  const formikForm = useFormik({
    initialValues: {
      name: "",
      resume_id: "",
      remarks: "",
      skills: [],
      email: "",
      contect_no: "",
      dob: "",
      mode_of_work_id: "",
      degree_id: "",
      passing_year: "",
      passing_grade: "",
      total_experience: "",
      current_salary: "",
      expected_salary: "",
      is_negotiable: "0",
      notice_period: "",
      previs_companies: [],
      address: "",
      city: "",
      state: "",
      countary: "",
      recruitment_status_id: "",
      source_id: "",
      status: true,
    },
    validationSchema: Yup.object().shape({
      // skill: Yup.string().required("Please enter Skill."),
      name: Yup.string().required("Please enter Name."),
      // resume_id: Yup.string().required("Please upload RFesume."),
      skills: Yup.array().min(1, "Please enter Skill."),
      email: Yup.string().required("Please enter Email Id."),
      contect_no: Yup.string()
        .required("Please Enter Contact No.")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Min 10 digits")
        .max(12, "Max 12 digits"),
      address: Yup.string().required("Please enter Address."),
      city: Yup.string().required("Please enter City."),
      state: Yup.string().required("Please enter State."),
      countary: Yup.string().required("Please enter Country."),
      // dob: Yup.string().required("Please enter Skill."),
      mode_of_work_id: Yup.string().required("Please enter Skill."),
      degree_id: Yup.string().required("Please enter Education."),
      passing_year: Yup.string().required("Please enter Passing Year."),
      passing_grade: Yup.string().required("Please enter Grade."),
      total_experience: Yup.string().required("Please enter Total Experience."),
      current_salary: Yup.string().required("Please enter Current Salary."),
      expected_salary: Yup.string().required("Please enter Expected Salary."),
      recruitment_status_id: Yup.string().required(
        "Please enter Recruitment Status."
      ),
      source_id: Yup.string().required("Please enter Source."),
    }),
    onSubmit: (values, { resetForm }) => {
      // values.skills = values.skills.map(skill => skill.skill_master_id)
      if (values?.id) {
        updateCandidateDetailsAction(values);
      } else {
        addNewCandidateAction(values);
      }
      resetForm();
      navigate("/candidate");
    },
  });

  const formikSkillForm = useFormik({
    initialValues: {
      skill_master_id: "",
      skill: "",
      self_rating: "",
      theory_rating: "",
      practical_rating: "",
    },
    validationSchema: Yup.object().shape({
      skill_master_id: Yup.string().required("Please enter Skill."),
      experience: Yup.string().required("Please enter Experience."),
      // self_rating: Yup.string().required("Please enter Self Rating."),
    }),
    onSubmit: (values, { resetForm }) => {
      formikSkillForm.values.skill = skillListProp.find(
        (skl) => skl.id == values.skill_master_id
      ).skill;

      formikForm.setFieldValue("skills", [
        ...formikForm.values.skills,
        formikSkillForm.values,
      ]);

      setSkillDataModel(false);
      resetForm();
    },
  });

  const formikPrevisCompaniesForm = useFormik({
    initialValues: {
      coumpany_name: "",
      from: "",
      to: "",
    },
    validationSchema: Yup.object().shape({
      coumpany_name: Yup.string().required("Please enter Compani Name."),
      from: Yup.string().required("Please enter Starting Date."),
    }),
    onSubmit: (values, { resetForm }) => {
      formikForm.setFieldValue("previs_companies", [
        ...formikForm.values.previs_companies,
        values,
      ]);
      setPrevisCompaniesModel(false);
      resetForm();
    },
  });

  const customStyles = {
    content: {
      top: "15%",
      left: "35%",
      width: "30%",
      right: "auto",
      padding: "0px",
      bottom: "auto",
      marginRight: "-50%",
    },
  };

  const removeSkill = (skill) => {
    let tempList = formikForm.values.skills;
    tempList.splice(
      tempList.findIndex((skl) => skl.skill_master_id == skill.skill_master_id),
      1
    );
    formikForm.setFieldValue("skills", tempList);
  };

  const removeCompany = (company) => {
    let tempList = formikForm.values.previs_companies;
    tempList.splice(
      tempList.findIndex((skl) => skl.id == company.id),
      1
    );
    formikForm.setFieldValue("previs_companies", tempList);
  };

  return (
    <>
      <NevbarComponent
        title={"Candidate Details"}
        breadcrumbPath={[{ link: "candidate", value: "Candidate Details" }]}
      />
      <SidebarComponent />
      <div className="content-wrapper pb-5">
        <Formik
          initialValues={formikForm.initialValues}
          enableReinitialize={true}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values) => {
            formikForm.handleSubmit(values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <div className="container-fluid px-5">
                <div className="content-header row">
                  <h1 className="m-0 col-10 ">Candidate Details</h1>
                  <Link to={"/candidate"} className="btn btn-danger col-1 ">
                    Back
                  </Link>
                  <button type="submit" className="btn btn-primary col-1 ">
                    Save
                  </button>
                </div>
                <div className="wrapper">
                  <section className="content">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between ">
                          <div className="row p-1 w-75">
                            <label
                              htmlFor="name"
                              className="font-weight-normal mt-2 h6"
                            >
                              Name
                            </label>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              className={"form-control "}
                              onChange={formikForm.handleChange}
                              onBlur={formikForm.handleBlur}
                              value={formikForm.values.name}
                            />
                            {formikForm.touched.name &&
                            formikForm.errors.name ? (
                              <span className="text-danger small">
                                {formikForm.errors.name}
                              </span>
                            ) : null}
                          </div>
                          <div className="">
                            <label
                              htmlFor="resume_id"
                              className="font-weight-normal mt-2 h6"
                            >
                              Resume
                            </label>
                            <input
                              id="resume_id"
                              name="resume_id"
                              type="file"
                              className={"form-control p-1 "}
                              onChange={formikForm.handleChange}
                              onBlur={formikForm.handleBlur}
                              // value={formikForm.values.resume_id}
                            />
                            {formikForm.touched.resume_id &&
                            formikForm.errors.resume_id ? (
                              <span className="text-danger small">
                                {formikForm.errors.resume_id}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="">
                          <label
                            htmlFor="remarks"
                            className="font-weight-normal mt-2 h6"
                          >
                            Remarks
                          </label>
                          <div className="">
                            <input
                              id="remarks"
                              name="remarks"
                              type="text"
                              className={"form-control "}
                              onChange={formikForm.handleChange}
                              onBlur={formikForm.handleBlur}
                              value={formikForm.values.remarks}
                            />
                            {formikForm.touched.remarks &&
                            formikForm.errors.remarks ? (
                              <span className="text-danger small">
                                {formikForm.errors.remarks}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <div className="card">
                          <div className="card-header bg-secondary">
                            <h3 className="card-title col-10">Skills</h3>
                            <button
                              type="button"
                              className="btn btn-light btn-sm col-2"
                              onClick={() => setSkillDataModel(true)}
                            >
                              Add
                            </button>
                          </div>
                          <div className="card-body">
                            <div className="d-felx "></div>
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Skill</th>
                                  <th>Experience</th>
                                  <th>Point</th>
                                  <th className="w-25">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {formikForm.touched.skills &&
                                formikForm.errors.skills ? (
                                  <span className="text-danger">
                                    {formikForm.errors.skills}
                                  </span>
                                ) : null}
                                {formikForm.values?.skills?.map((skill) => {
                                  return (
                                    <tr>
                                      <th>{skill.skill || skill.skill_id}</th>
                                      <th>{skill.experience}</th>
                                      <th>{skill.self_rating}</th>
                                      <th className="btn-group">
                                        <button
                                          type="button"
                                          className="btn btn-sm bg-gradient-danger "
                                          onClick={() => removeSkill(skill)}
                                        >
                                          Remove{" "}
                                        </button>
                                      </th>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="card">
                          <div className="card-header bg-secondary">
                            Contact Details
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-6">
                                <label
                                  htmlFor="email"
                                  className="font-weight-normal mt-2 h6"
                                >
                                  Email
                                </label>
                                <div className="">
                                  <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={"form-control "}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                    value={formikForm.values.email}
                                  />
                                  {formikForm.touched.email &&
                                  formikForm.errors.email ? (
                                    <span className="text-danger small">
                                      {formikForm.errors.email}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor="contect_no"
                                  className="font-weight-normal mt-2 h6"
                                >
                                  Contact No
                                </label>
                                <div className="">
                                  <input
                                    id="contect_no"
                                    name="contect_no"
                                    type="number"
                                    className={"form-control "}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                    value={formikForm.values.contect_no}
                                  />
                                  {formikForm.touched.contect_no &&
                                  formikForm.errors.contect_no ? (
                                    <span className="text-danger small">
                                      {formikForm.errors.contect_no}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor="address"
                                  className="font-weight-normal mt-2 h6"
                                >
                                  Address
                                </label>
                                <div className="">
                                  <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    className={"form-control "}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                    value={formikForm.values.address}
                                  />
                                  {formikForm.touched.address &&
                                  formikForm.errors.address ? (
                                    <span className="text-danger small">
                                      {formikForm.errors.address}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor="city"
                                  className="font-weight-normal mt-2 h6"
                                >
                                  City
                                </label>
                                <div className="">
                                  <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    className={"form-control "}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                    value={formikForm.values.city}
                                  />
                                  {formikForm.touched.city &&
                                  formikForm.errors.city ? (
                                    <span className="text-danger small">
                                      {formikForm.errors.city}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor="state"
                                  className="font-weight-normal mt-2 h6"
                                >
                                  State
                                </label>
                                <div className="">
                                  <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    className={"form-control "}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                    value={formikForm.values.state}
                                  />
                                  {formikForm.touched.state &&
                                  formikForm.errors.state ? (
                                    <span className="text-danger small">
                                      {formikForm.errors.state}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor="countary"
                                  className="font-weight-normal mt-2 h6"
                                >
                                  Country
                                </label>
                                <div className="">
                                  <input
                                    id="countary"
                                    name="countary"
                                    type="text"
                                    className={"form-control "}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                    value={formikForm.values.countary}
                                  />
                                  {formikForm.touched.countary &&
                                  formikForm.errors.countary ? (
                                    <span className="text-danger small">
                                      {formikForm.errors.countary}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="card">
                          <div className="card-header bg-secondary">
                            <h4 className="card-title col-10">
                              Previous Companies
                            </h4>
                            <button
                              type="button"
                              className="btn btn-light btn-sm col-2"
                              onClick={() => {
                                setPrevisCompaniesModel(true);
                              }}
                            >
                              Add{" "}
                            </button>
                          </div>
                          <div className="card-body">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Company</th>
                                  <th>From </th>
                                  <th>To</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {formikForm.values?.previs_companies?.map(
                                  (coumpany) => {
                                    return (
                                      <tr>
                                        <td>{coumpany.coumpany_name}</td>
                                        <td>{coumpany.from}</td>
                                        <td>{coumpany.to}</td>
                                        {/* <td>
                                          <button
                                            type="button"
                                            className="btn btn-danger btn-sm "
                                            onClick={() =>
                                              removeCompany(coumpany)
                                            }
                                          >
                                            Remove
                                          </button>
                                        </td> */}
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 row">
                        <div className="col-6">
                          <div className="card">
                            <div className="card-header bg-secondary">
                              Education Details
                            </div>
                            <div className="card-body row">
                              <div className="col-12 form-group row">
                                <select
                                  id="degree_id"
                                  className={
                                    "form-control " +
                                    (formikForm?.errors?.degree_id
                                      ? " border-danger "
                                      : "") +
                                    " "
                                  }
                                  name="degree_id"
                                  onChange={(selectedOption) => {
                                    formikForm.setFieldValue(
                                      "degree_id",
                                      selectedOption?.target?.value
                                    );
                                  }}
                                  onBlur={formikForm.handleBlur}
                                >
                                  <option disabled selected="selected">
                                    Select{" "}
                                  </option>
                                  {degreeListProp?.map((degree) => (
                                    <option
                                      value={degree.id}
                                      selected={
                                        formikForm?.values?.degree_id ==
                                        degree.id
                                          ? true
                                          : false
                                      }
                                    >
                                      {degree.degree}{" "}
                                    </option>
                                  ))}
                                </select>
                                {formikForm.touched.degree_id &&
                                formikForm.errors.degree_id ? (
                                  <span className="text-danger">
                                    {formikForm.errors.degree_id}
                                  </span>
                                ) : null}
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor="passing_year"
                                  className="font-weight-normal mt-2 h6"
                                >
                                  Passing Year
                                </label>
                                <div className="">
                                  <input
                                    id="passing_year"
                                    name="passing_year"
                                    type="text"
                                    className={"form-control "}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                    value={formikForm.values.passing_year}
                                  />
                                  {formikForm.touched.passing_year &&
                                  formikForm.errors.passing_year ? (
                                    <span className="text-danger small">
                                      {formikForm.errors.passing_year}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor="passing_grade"
                                  className="font-weight-normal mt-2 h6"
                                >
                                  Passing Grade
                                </label>
                                <div className="">
                                  <input
                                    id="passing_grade"
                                    name="passing_grade"
                                    type="number"
                                    className={"form-control "}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                    value={formikForm.values.passing_grade}
                                  />
                                  {formikForm.touched.passing_grade &&
                                  formikForm.errors.passing_grade ? (
                                    <span className="text-danger small">
                                      {formikForm.errors.passing_grade}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="card">
                            <div className="card-header bg-secondary">
                              Salary
                            </div>
                            <div className="card-body row">
                              <div className="col-6">
                                <label
                                  htmlFor="current_salary"
                                  className="font-weight-normal h6"
                                >
                                  Current Salary
                                </label>
                                <div className="">
                                  <input
                                    id="current_salary"
                                    name="current_salary"
                                    type="text"
                                    className={"form-control "}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                    value={formikForm.values.current_salary}
                                  />
                                  {formikForm.touched.current_salary &&
                                  formikForm.errors.current_salary ? (
                                    <span className="text-danger small">
                                      {formikForm.errors.current_salary}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor="expected_salary"
                                  className="font-weight-normal h6"
                                >
                                  Expected Salary
                                </label>
                                <div className="">
                                  <input
                                    id="expected_salary"
                                    name="expected_salary"
                                    type="text"
                                    className={"form-control "}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                    value={formikForm.values.expected_salary}
                                  />
                                  {formikForm.touched.expected_salary &&
                                  formikForm.errors.expected_salary ? (
                                    <span className="text-danger small">
                                      {formikForm.errors.expected_salary}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor="total_experience"
                                  className="font-weight-normal mt-2 h6"
                                >
                                  Total Experience (Years)
                                </label>
                                <div className="">
                                  <input
                                    id="total_experience"
                                    name="total_experience"
                                    type="number"
                                    step=".01"
                                    className={"form-control "}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                    value={formikForm.values.total_experience}
                                  />
                                  {formikForm.touched.total_experience &&
                                  formikForm.errors.total_experience ? (
                                    <span className="text-danger small">
                                      {formikForm.errors.total_experience}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor="notice_period"
                                  className="font-weight-normal mt-2 h6"
                                >
                                  Notice Period (Months)
                                </label>
                                <div className="">
                                  <input
                                    id="notice_period"
                                    name="notice_period"
                                    type="number"
                                    className={"form-control "}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                    value={formikForm.values.notice_period}
                                  />
                                  {formikForm.touched.notice_period &&
                                  formikForm.errors.notice_period ? (
                                    <span className="text-danger small">
                                      {formikForm.errors.notice_period}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="card">
                          <div className="card-header bg-secondary">
                            Mode of Work
                          </div>
                          <div className="card-body">
                            <select
                              id="mode_of_work_id"
                              className={
                                "form-control " +
                                (formikForm?.errors?.mode_of_work_id
                                  ? " border-danger "
                                  : "") +
                                " "
                              }
                              name="mode_of_work_id"
                              onChange={(selectedOption) => {
                                formikForm.setFieldValue(
                                  "mode_of_work_id",
                                  selectedOption?.target?.value
                                );
                              }}
                              onBlur={formikForm.handleBlur}
                            >
                              <option disabled selected="selected">
                                Select{" "}
                              </option>
                              {modeOfWorkListProp?.map((mode) => (
                                <option
                                  value={mode.id}
                                  selected={
                                    formikForm?.values?.mode_of_work_id ==
                                    mode.id
                                      ? true
                                      : false
                                  }
                                >
                                  {mode.mode_of_work}{" "}
                                </option>
                              ))}
                            </select>
                            {formikForm.touched.mode_of_work_id &&
                            formikForm.errors.mode_of_work_id ? (
                              <span className="text-danger">
                                {formikForm.errors.mode_of_work_id}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="card">
                          <div className="card-header bg-secondary">
                            Source of Connection
                          </div>
                          <div className="card-body">
                            <select
                              id="source_id"
                              className={
                                "form-control " +
                                (formikForm?.errors?.source_id
                                  ? " border-danger "
                                  : "") +
                                " "
                              }
                              name="source_id"
                              onChange={(selectedOption) => {
                                formikForm.setFieldValue(
                                  "source_id",
                                  selectedOption?.target?.value
                                );
                              }}
                              onBlur={formikForm.handleBlur}
                            >
                              <option disabled selected="selected">
                                Select{" "}
                              </option>
                              {sourceListProp?.map((source) => {
                                return (
                                  <option
                                    value={source.id}
                                    selected={
                                      formikForm?.values?.source_id == source.id
                                        ? true
                                        : false
                                    }
                                  >
                                    {source.source}{" "}
                                  </option>
                                );
                              })}
                            </select>
                            {formikForm.touched.source_id &&
                            formikForm.errors.source_id ? (
                              <span className="text-danger">
                                {formikForm.errors.source_id}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="card">
                          <div className="card-header bg-secondary">
                            Recruitment Status
                          </div>
                          <div className="card-body">
                            <select
                              id="recruitment_status_id"
                              className={
                                "form-control " +
                                (formikForm.errors.recruitment_status_id
                                  ? " border-danger "
                                  : "") +
                                " "
                              }
                              name="recruitment_status_id"
                              onChange={(selectedOption) => {
                                formikForm.setFieldValue(
                                  "recruitment_status_id",
                                  selectedOption?.target?.value
                                );
                              }}
                              onBlur={formikForm.handleBlur}
                            >
                              <option disabled selected="selected">
                                Select{" "}
                              </option>
                              {recruitmentStatusListProps?.map((status) => {
                                return (
                                  <option
                                    value={status.id}
                                    selected={
                                      formikForm?.values
                                        ?.recruitment_status_id == status.id
                                        ? true
                                        : false
                                    }
                                  >
                                    {status.recruitment_status}{" "}
                                  </option>
                                );
                              })}
                            </select>
                            {formikForm.touched.recruitment_status_id &&
                            formikForm.errors.recruitment_status_id ? (
                              <span className="text-danger">
                                {formikForm.errors.recruitment_status_id}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="card">
                          <div className="card-header bg-secondary">
                            Other Details
                          </div>
                          <div className="card-body">
                            <label
                              htmlFor="current_salary"
                              className="font-weight-normal h6"
                            >
                              Date of Birth{" "}
                            </label>
                            <input
                              id="dob"
                              name="dob"
                              type="date"
                              className={"form-control "}
                              onChange={formikForm.handleChange}
                              onBlur={formikForm.handleBlur}
                              value={formikForm.values.dob}
                            />
                            {formikForm.touched.dob && formikForm.errors.dob ? (
                              <span className="text-danger small">
                                {formikForm.errors.dob}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div>
        <Modal
          isOpen={skillDataModel}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <h4>Skill Details</h4>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                setSkillDataModel(false);
              }}
            >
              {" "}
              X
            </button>
          </div>
          <Formik
            initialValues={formikSkillForm.initialValues}
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values) => {
              formikSkillForm.handleSubmit(values);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="modal-body">
                  <div className="form-group row">
                    <label className="col-3 col-form-label">Skill </label>
                    <div className="col-9">
                      <select
                        id="skill_master_id"
                        className={
                          "form-control " +
                          (formikSkillForm?.errors?.skill_master_id
                            ? " border-danger "
                            : "") +
                          " "
                        }
                        name="skill_master_id"
                        onChange={formikSkillForm.handleChange}
                        onBlur={formikSkillForm.handleBlur}
                      >
                        <option disabled selected="selected">
                          Select{" "}
                        </option>
                        {skillListProp?.map((skill) => (
                          <option
                            value={skill.id}
                            selected={
                              formikSkillForm?.values?.skill_master_id ==
                              skill.id
                                ? true
                                : false
                            }
                          >
                            {skill.skill}{" "}
                          </option>
                        ))}
                      </select>
                      {formikSkillForm.touched.skill_master_id &&
                      formikSkillForm.errors.skill_master_id ? (
                        <span className="text-danger">
                          {formikSkillForm.errors.skill_master_id}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="experience"
                      className="col-sm-3 col-form-label"
                    >
                      Experience
                    </label>
                    <div className="col-sm-9">
                      <input
                        id="experience"
                        name="experience"
                        type="number"
                        className={
                          "form-control " +
                          (formikSkillForm?.errors.experience
                            ? " border-danger "
                            : "") +
                          " "
                        }
                        onChange={formikSkillForm.handleChange}
                        onBlur={formikSkillForm.handleBlur}
                        value={formikSkillForm.values.experience}
                      />
                      {formikSkillForm.touched.experience &&
                      formikSkillForm.errors.experience ? (
                        <span className="text-danger">
                          {formikSkillForm.errors.experience}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="self_rating"
                      className="col-sm-3 col-form-label"
                    >
                      Rating{" "}
                    </label>
                    <div className="col-sm-9">
                      <input
                        id="self_rating"
                        name="self_rating"
                        type="self_rating"
                        className={
                          "form-control " +
                          (formikSkillForm?.errors.self_rating
                            ? " border-danger "
                            : "") +
                          " "
                        }
                        onChange={formikSkillForm.handleChange}
                        onBlur={formikSkillForm.handleBlur}
                        value={formikSkillForm.values.self_rating}
                      />
                      {formikSkillForm.touched.self_rating &&
                      formikSkillForm.errors.self_rating ? (
                        <span className="text-danger">
                          {formikSkillForm.errors.self_rating}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-between">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={() => {
                      setSkillDataModel(false);
                    }}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save{" "}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </Modal>
      </div>
      <div>
        <Modal
          isOpen={previsCompaniesModel}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <h4>Skill Details</h4>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                setPrevisCompaniesModel(false);
              }}
            >
              {" "}
              X
            </button>
          </div>
          <Formik
            initialValues={formikPrevisCompaniesForm.initialValues}
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values) => {
              formikPrevisCompaniesForm.handleSubmit(values);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="modal-body">
                  <div className="form-group row">
                    <label
                      htmlFor="coumpany_name"
                      className="col-sm-3 col-form-label"
                    >
                      Companiey Name{" "}
                    </label>
                    <div className="col-sm-9">
                      <input
                        id="coumpany_name"
                        name="coumpany_name"
                        type="text"
                        className={
                          "form-control " +
                          (formikPrevisCompaniesForm?.errors.coumpany_name
                            ? " border-danger "
                            : "") +
                          " "
                        }
                        onChange={formikPrevisCompaniesForm.handleChange}
                        onBlur={formikPrevisCompaniesForm.handleBlur}
                        value={formikPrevisCompaniesForm.values.coumpany_name}
                      />
                      {formikPrevisCompaniesForm.touched.coumpany_name &&
                      formikPrevisCompaniesForm.errors.coumpany_name ? (
                        <span className="text-danger">
                          {formikPrevisCompaniesForm.errors.coumpany_name}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="from" className="col-sm-3 col-form-label">
                      Companiey Name{" "}
                    </label>
                    <div className="col-sm-9">
                      <input
                        id="from"
                        name="from"
                        type="date"
                        className={
                          "form-control " +
                          (formikPrevisCompaniesForm?.errors.from
                            ? " border-danger "
                            : "") +
                          " "
                        }
                        onChange={formikPrevisCompaniesForm.handleChange}
                        onBlur={formikPrevisCompaniesForm.handleBlur}
                        value={formikPrevisCompaniesForm.values.from}
                      />
                      {formikPrevisCompaniesForm.touched.from &&
                      formikPrevisCompaniesForm.errors.from ? (
                        <span className="text-danger">
                          {formikPrevisCompaniesForm.errors.from}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="to" className="col-sm-3 col-form-label">
                      Companiey Name{" "}
                    </label>
                    <div className="col-sm-9">
                      <input
                        id="to"
                        name="to"
                        type="date"
                        className={
                          "form-control " +
                          (formikPrevisCompaniesForm?.errors.to
                            ? " border-danger "
                            : "") +
                          " "
                        }
                        onChange={formikPrevisCompaniesForm.handleChange}
                        onBlur={formikPrevisCompaniesForm.handleBlur}
                        value={formikPrevisCompaniesForm.values.to}
                      />
                      {formikPrevisCompaniesForm.touched.to &&
                      formikPrevisCompaniesForm.errors.to ? (
                        <span className="text-danger">
                          {formikPrevisCompaniesForm.errors.to}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-between">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={() => {
                      setPrevisCompaniesModel(false);
                    }}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save{" "}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </Modal>
      </div>
    </>
  );
}

const mapStatetoProps = (state) => {
  return {
    sourceListProp: state.getAllSourceReducer?.sourceList,
    degreeListProp: state?.getAllDegreeReducer?.DegreeList,
    skillListProp: state?.getAllSkillReducer?.skillsList,
    modeOfWorkListProp: state?.getAllModeOfWorkReducer?.ModeOfWorkList,
    candidateDetialsProp: state?.getCandidatesReducer?.CandidateDetials,
    recruitmentStatusListProps:
      state?.getActiveRecruitmentStatusReducer?.RecruitmentStatusList,
    newCandidateProps: state?.getCandidatesReducer?.newCandidate,
    updatedCandidateProps: state?.getCandidatesReducer?.updatedCandidate,
  };
};

const mapDispatchtoProps = {
  getAllSkillAction: () => getAllSkill(),
  getAllSourceAction: () => getAllSource(),
  getCandidateByIdAction: (id) => getCandidateById(id),
  getAllDegreeAction: () => getAllDegree(),
  getAllModeOfWorkStatusAction: () => getAllModeOfWorkStatus(),
  getAllRecruitmentStatusAction: () => getAllRecruitmentStatus(),
  addNewCandidateAction: (details) => addNewCandidate(details),
  updateCandidateDetailsAction: (details) => updateCandidateDetails(details),
};
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(InterviewDetailsFormComponent);

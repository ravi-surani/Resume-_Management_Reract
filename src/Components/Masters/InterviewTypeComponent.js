import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";

import { Formik, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";

import {
  getAllInterviewType,
  addNewInterviewTypeStatus,
  updateInterviewTypeDetails,
  removeInterviewTypeStatus,
} from "../../Redux/Actions/Actions";

import DataTable from "../DataTable";
import SidebarComponent from "../SidebarComponent";
import NevbarComponent from "../NevbarComponent";

function InterviewTypeComponent({
  getAllInterviewTypeProps,
  addInterviewTypeProps,
  updateInterviewTypeProps,
  removedInterviewTypeProps,
  getAllInterviewTypeAction,
  addNewInterviewTypeStatusction,
  updateInterviewTypeDetailsction,
  removeInterviewTypeStatusction,
  interviewTypeLoading
}) {
  const searchRef = useRef("");
  const [interviewType, setInterviewType] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const customStyles = {
    content: {
      top: "15%",
      left: "35%",
      right: "auto",
      bottom: "auto",
      padding: "0px",
      marginRight: "-50%",
      // transform: 'translate(-50%, -120%)  ',
      width: "30%",
    },
  };

  const TableColumns = [
    { Header: "id", accessor: "id" },
    { Header: "Interview Type", accessor: "interview_type" },
    { Header: "Status", accessor: "status" },
    { Header: "Action", accessor: "action" },
  ];

  useEffect(() => {
    getAllInterviewTypeAction();
  }, [
    addInterviewTypeProps,
    updateInterviewTypeProps,
    removedInterviewTypeProps,
  ]);

  const formik = useFormik({
    initialValues: {
      interview_type: "",
      status: true,
    },
    validationSchema: Yup.object().shape({
      interview_type: Yup.string().required("Please enter Interview type"),
      // status: Yup.string().required("Please status."),
    }),

    onSubmit: (values, { resetForm }) => {
      if (values?.id) {
        updateInterviewTypeDetailsction(values);
      } else {
        addNewInterviewTypeStatusction(values);
      }
      resetForm();
      setIsModelOpen(false);
    },
  });

  useEffect(() => {
    if (!interviewTypeLoading && getAllInterviewTypeProps?.interviewTypesList) {
      let tempList = getAllInterviewTypeProps?.interviewTypesList?.map(
        (interviewType) => {
          return {
            id: interviewType.id,
            interview_type: interviewType.interview_type,
            status: interviewType.status ? (
              <h6 className="text-primary ">Active</h6>
            ) : (
              <h6 className="text-danger">Inactive</h6>
            ),
            action: (
              <div className="btn-group ">
                <button
                  type="button"
                  className="btn btn-info btn-sm"
                  onClick={() => {
                    formik.setValues(interviewType);
                    setIsModelOpen(true);
                  }}
                >
                  Edit
                </button>
                {/* <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => onSkillTypeRemove(interviewType.id)}
                >
                  Remove
                </button> */}
              </div>
            ),
          };
        }
      );
      setInterviewType(tempList);
      setTableData(tempList);
    }
  }, [getAllInterviewTypeProps, interviewTypeLoading]);

  const onSkillTypeRemove = (id) => {
    removeInterviewTypeStatusction(id);
  };

  const onCloseModel = () => {
    setIsModelOpen(false);
  };

  const onSearchfilter = (event) => {
    if (event?.target?.value) {
      setTableData(
        interviewType.filter((modeOfWork) =>
          modeOfWork.interview_type
            .toLocaleLowerCase()
            .includes(event.target.value.toLocaleLowerCase())
        )
      );
    } else {
      setTableData(interviewType);
    }
  };

  const onClearSearch = (event) => {
    searchRef.current.value = null;
    setTableData(interviewType);
  };

  return (
    <>
      <NevbarComponent
        title={"Interview Type List"}
        breadcrumbPath={[{ link: "modeofwork", value: "Interview Type List" }]}
      />
      <SidebarComponent />
      <div className="content-wrapper">
        <div className="container-fluid px-5">
          <div className="content-header row">
            <h1 className="m-0 col-6">Interview Type List</h1>
            <div className="form-group col-6">
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="text"
                    className="form-control"
                    name="search"
                    placeholder="Search "
                    ref={searchRef}
                    onChange={onSearchfilter}
                  />
                </div>
                <div className="input-group-append">
                  <button className="btn btn-danger" onClick={onClearSearch}>
                    Clear
                  </button>
                </div>
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setIsModelOpen(true);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper">
            {getAllInterviewTypeProps?.Loading ? (
              <section>Please Wait...</section>
            ) : (
              <section className="content">
                <DataTable columns={TableColumns} tableData={tableData} isLoading={interviewTypeLoading}/>
              </section>
            )}
          </div>
        </div>
      </div>

      <div>
        <Modal
          isOpen={isModelOpen}
          // onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <h4>Interview Type Details</h4>
            <button className="btn btn-danger  btn-sm" onClick={onCloseModel}>
              {" "}
              X
            </button>
          </div>

          <Formik
            initialValues={formik.initialValues}
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values) => {
              formik.handleSubmit(values);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <div className="modal-body">
                  <div className="form-group row">
                    <label
                      htmlFor="interview_type"
                      className="col-sm-3 col-form-label"
                    >
                      Interview Type
                    </label>
                    <div className="col-sm-9">
                      <input
                        id="interview_type"
                        name="interview_type"
                        type="text"
                        className={
                          "form-control " +
                          (formik?.errors?.interview_type
                            ? " border-danger "
                            : "") +
                          " "
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.interview_type}
                      />
                      {formik.touched.interview_type &&
                      formik.errors.interview_type ? (
                        <span className="text-danger">
                          {formik.errors.interview_type}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label htmlFor="status" className="col-sm-3 col-form-label">
                      Status
                    </label>
                    <div className="col-sm-9 d-flex">
                      <div className="input-group-prepend h-50 ">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <input
                                id="status"
                                name="status"
                                type="checkbox"
                                checked={formik.values.status}
                                className={"form-control h-100"}
                                onChange={() => {
                                  formik.setFieldValue(
                                    "status",
                                    !formik.values.status
                                  );
                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.status}
                              />
                            </span>
                          </div>
                          <label type="text" className="form-label ml-4">
                            {formik.values.status ? "Active" : "Inactive"}
                          </label>
                        </div>
                      </div>
                      {formik.touched.status && formik.errors.status ? (
                        <span className="text-danger">
                          {formik.errors.status}
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
                    onClick={onCloseModel}
                  >
                    Close
                  </button>
                  {formik.values.details?.id ? (
                    <button className="btn btn-primary">Update</button>
                  ) : (
                    <button className="btn btn-primary">Save </button>
                  )}
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
    interviewTypeLoading: state.getAllInterviewTypeReducer.Loading,
    getAllInterviewTypeProps: state?.getAllInterviewTypeReducer,
    addInterviewTypeProps:
      state?.addInterviewTypeReducer?.newInterviewTypeAdded,
    updateInterviewTypeProps:
      state?.updateInterviewTypeReducer?.interviewTypeUpdated,
    removedInterviewTypeProps:
      state?.removedInterviewTypeReducer?.interviewTypeRemoved,
  };
};

const mapDispatchtoProps = {
  getAllInterviewTypeAction: () => getAllInterviewType(),
  addNewInterviewTypeStatusction: (details) =>
    addNewInterviewTypeStatus(details),
  updateInterviewTypeDetailsction: (details) =>
    updateInterviewTypeDetails(details),
  removeInterviewTypeStatusction: (id) => removeInterviewTypeStatus(id),
};
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(InterviewTypeComponent);

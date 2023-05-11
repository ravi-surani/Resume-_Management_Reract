import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";

import { Formik, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";

import {
  getAllInterviewMode,
  addNewInterviewMode,
  updateInterviewModeDetails,
  removeInterviewModeStatus,
} from "../../Redux/Actions/Actions";

import DataTable from "../DataTable";
import SidebarComponent from "../SidebarComponent";
import NevbarComponent from "../NevbarComponent";

function InterviewModeComponent({
  interviewModeListProp,
  newinterviewModeAddedProp,
  interviewModeUpdatedProp,
  interviewModeRemovedProp,
  getAllInterviewModeAction,
  addNewInterviewModeAction,
  updateInterviewModeDetailsAction,
  removeInterviewModeStatusAction,
}) {
  const searchRef = useRef("");
  const [interviewModeList, setInterviewModeList] = useState(null);
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
    { Header: "Interview Mode", accessor: "interview_mode" },
    { Header: "Status", accessor: "status" },
    { Header: "Action", accessor: "action" },
  ];

  useEffect(() => {
    getAllInterviewModeAction();
  }, [
    newinterviewModeAddedProp,
    interviewModeUpdatedProp,
    interviewModeRemovedProp,
  ]);

  const formik = useFormik({
    initialValues: {
      interview_mode: "",
      status: true,
    },
    validationSchema: Yup.object().shape({
      interview_mode: Yup.string().required("Please enter Name."),
      // status: Yup.string().required("Please status."),
    }),

    onSubmit: (values, { resetForm }) => {
      if (values?.id) {
        updateInterviewModeDetailsAction(values);
      } else {
        addNewInterviewModeAction(values);
      }
      resetForm();
      setIsModelOpen(false);
    },
  });

  useEffect(() => {
    if (interviewModeListProp) {
      let tempList = interviewModeListProp.map((interviewMode) => {
        return {
          id: interviewMode.id,
          interview_mode: interviewMode.interview_mode,
          email: interviewMode.email,
          contect_no: interviewMode.contect_no,
          status: interviewMode.status ? (
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
                  formik.setValues(interviewMode);
                  setIsModelOpen(true);
                }}
              >
                Edit
              </button>
              {/* <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => onSkillTypeRemove(interviewMode.id)}
              >
                Remove
              </button> */}
            </div>
          ),
        };
      });
      setInterviewModeList(tempList);
      setTableData(tempList);
    }
  }, [interviewModeListProp]);

  const onSkillTypeRemove = (id) => {
    removeInterviewModeStatusAction(id);
  };

  const onCloseModel = () => {
    setIsModelOpen(false);
  };

  const onSearchfilter = (event) => {
    if (event?.target?.value) {
      setTableData(
        interviewModeList.filter((interview_mode) =>
          interview_mode.interview_mode
            .toLocaleLowerCase()
            .includes(event.target.value.toLocaleLowerCase())
        )
      );
    } else {
      setTableData(interviewModeList);
    }
  };

  const onClearSearch = (event) => {
    searchRef.current.value = null;
    setTableData(interviewModeList);
  };

  return (
    <>
      <NevbarComponent
        title={"Interview Mode"}
        breadcrumbPath={[{ link: "interviewmode", value: "Interview Mode" }]}
      />
      <SidebarComponent />
      <div className="content-wrapper">
        <div className="container-fluid px-5">
          <div className="content-header row">
            <h1 className="m-0 col-6">Interview Mode</h1>
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
            <section className="content">
              <DataTable columns={TableColumns} tableData={tableData} />
            </section>
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
            <h4>Interview Mode Details</h4>
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
                      htmlFor="interview_mode"
                      className="col-sm-3 col-form-label"
                    >
                      Interview Mode
                    </label>
                    <div className="col-sm-9">
                      <input
                        id="interview_mode"
                        name="interview_mode"
                        type="text"
                        className={
                          "form-control " +
                          (formik?.errors.interview_mode
                            ? " border-danger "
                            : "") +
                          " "
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.interview_mode}
                      />
                      {formik.touched.interview_mode &&
                      formik.errors.interview_mode ? (
                        <span className="text-danger">
                          {formik.errors.interview_mode}
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
                  {formik.values?.id ? (
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
    interviewModeListProp: state?.getAllInterviewModeReducer?.interviewModeList,
    newinterviewModeAddedProp:
      state?.addInterviewModeReducer?.newinterviewModeAdded,
    interviewModeUpdatedProp:
      state?.updateInterviewModeReducer?.interviewModeUpdated,
    interviewModeRemovedProp:
      state?.removedInterviewModeReducer?.interviewModeRemoved,
  };
};

const mapDispatchtoProps = {
  getAllInterviewModeAction: () => getAllInterviewMode(),
  addNewInterviewModeAction: (details) => addNewInterviewMode(details),
  updateInterviewModeDetailsAction: (details) =>
    updateInterviewModeDetails(details),
  removeInterviewModeStatusAction: (id) => removeInterviewModeStatus(id),
};
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(InterviewModeComponent);

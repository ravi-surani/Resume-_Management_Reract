import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

import {
  getAllDegree,
  addNewDegree,
  updateDegreeDetails,
  removeDegreeStatus,
} from "../../Redux/Actions/Actions";

import DataTable from "../DataTable";
import SidebarComponent from "../SidebarComponent";
import NevbarComponent from "../NevbarComponent";

function DegreeComponent({
  DegreeListProp,
  newDegreeAddedProp,
  DegreeUpdatedProp,
  DegreeRemovedProp,
  getAllDegreeAction,
  addNewDegreeModeAction,
  updateDegreeModeDetailsAction,
  removeDegreeModeStatusAction,
  degreeLoading
}) {
  const searchRef = useRef("");
  const [DegreeList, setDegreeList] = useState(null);
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
    { Header: "Degree", accessor: "degree" },
    { Header: "Status", accessor: "status" },
    { Header: "Action", accessor: "action" },
  ];

  useEffect(() => {
    getAllDegreeAction();
  }, [newDegreeAddedProp, DegreeUpdatedProp, DegreeRemovedProp]);

  const formik = useFormik({
    initialValues: {
      degree: "",
      status: true,
    },
    validationSchema: Yup.object().shape({
      degree: Yup.string().required("Please enter Degree."),
      // status: Yup.string().required("Please status."),
    }),

    onSubmit: (values, { resetForm }) => {
      if (values?.id) {
        updateDegreeModeDetailsAction(values);
      } else {
        addNewDegreeModeAction(values);
      }
      resetForm();
      setIsModelOpen(false);
    },
  });

  useEffect(() => {
    if (DegreeListProp) {
      let tempList = DegreeListProp.map((degree) => {
        return {
          id: degree.id,
          degree: degree.degree,
          status: degree.status ? (
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
                  formik.setValues(degree);
                  setIsModelOpen(true);
                }}
              >
                Edit
              </button>
              {/* <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => onSkillTypeRemove(degree.id)}
              >
                Remove
              </button> */}
            </div>
          ),
        };
      });
      setDegreeList(tempList);
      setTableData(tempList);
    }
  }, [DegreeListProp]);

  const onSkillTypeRemove = (id) => {
    removeDegreeModeStatusAction(id);
  };

  const onCloseModel = () => {
    setIsModelOpen(false);
  };

  const onSearchfilter = (event) => {
    if (event?.target?.value) {
      setTableData(
        DegreeList.filter(
          (modeOfWork) =>
            modeOfWork.interviewer
              .toLocaleLowerCase()
              .includes(event.target.value.toLocaleLowerCase()) ||
            modeOfWork.email
              .toLocaleLowerCase()
              .includes(event.target.value.toLocaleLowerCase()) ||
            modeOfWork.contect_no
              .toLocaleLowerCase()
              .includes(event.target.value.toLocaleLowerCase())
        )
      );
    } else {
      setTableData(DegreeList);
    }
  };

  const onClearSearch = (event) => {
    searchRef.current.value = null;
    setTableData(DegreeList);
  };

  return (
    <>
      <NevbarComponent
        title={"Degree List"}
        breadcrumbPath={[{ link: "interviewer", value: "Degree List" }]}
      />
      <SidebarComponent />
      <div className="content-wrapper">
        <div className="container-fluid px-5">
          <div className="content-header row">
            <h1 className="m-0 col-6">Degree List</h1>
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
              <DataTable columns={TableColumns} tableData={tableData} isLoading={degreeLoading}/>
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
            <h4>Degree Details</h4>
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
                    <label htmlFor="degree" className="col-sm-3 col-form-label">
                      Degree
                    </label>
                    <div className="col-sm-9">
                      <input
                        id="degree"
                        name="degree"
                        type="text"
                        className={
                          "form-control " +
                          (formik?.errors.degree ? " border-danger " : "") +
                          " "
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.degree}
                      />
                      {formik.touched.degree && formik.errors.degree ? (
                        <span className="text-danger">
                          {formik.errors.degree}
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
    degreeLoading: state.getAllDegreeReducer.Loading,
    DegreeListProp: state?.getAllDegreeReducer?.DegreeList,
    newDegreeAddedProp: state?.addDegreeReducer?.newDegreeAdded,
    DegreeUpdatedProp: state?.updateDegreeReducer?.DegreeUpdated,
    DegreeRemovedProp: state?.removedDegreeReducer?.DegreeRemoved,
  };
};

const mapDispatchtoProps = {
  getAllDegreeAction: () => getAllDegree(),
  addNewDegreeModeAction: (details) => addNewDegree(details),
  updateDegreeModeDetailsAction: (details) => updateDegreeDetails(details),
  removeDegreeModeStatusAction: (id) => removeDegreeStatus(id),
};
export default connect(mapStatetoProps, mapDispatchtoProps)(DegreeComponent);

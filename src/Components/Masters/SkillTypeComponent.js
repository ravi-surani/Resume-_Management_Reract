import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import Modal from "react-modal";
import { Formik, useFormik } from "formik";

import DataTable from "../DataTable";
import NevbarComponent from "../NevbarComponent";
import SidebarComponent from "../SidebarComponent";
import {
  getAllSkillType,
  addNewSkillType,
  updateSkillTypeDetails,
  removeSkillType,
} from "../../Redux/Actions/Actions";

function SkillTypeComponent({
  skillsTypeListProp,
  newSkillTypeAddedProp,
  skillTypeUpdatedProp,
  skillTypeRemovedProp,
  getAllSkillTypeAction,
  addNewSkillTypeAction,
  updateSkillTypeDetailsAction,
  removeSkillTypeAction,
  skillTypeloading
}) {
  const searchRef = useRef("");
  const [skillTypeList, setSkillTypeList] = useState(null);
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
    { Header: "Skill Type", accessor: "skill_type" },
    { Header: "Status", accessor: "status" },
    { Header: "Action", accessor: "action" },
  ];

  useEffect(() => {
    getAllSkillTypeAction();
  }, [newSkillTypeAddedProp, skillTypeUpdatedProp, skillTypeRemovedProp]);

  const formik = useFormik({
    initialValues: {
      skill_type: "",
      status: true,
    },
    validationSchema: Yup.object().shape({
      skill_type: Yup.string().required("Please enter Skill Type."),
      // status: Yup.string().required("Please status."),
    }),

    onSubmit: (values, { resetForm }) => {
      if (values?.id) {
        updateSkillTypeDetailsAction(values);
      } else {
        addNewSkillTypeAction(values);
      }
      resetForm();
      setIsModelOpen(false);
    },
  });

  useEffect(() => {
    if (skillsTypeListProp) {
      let tempList = skillsTypeListProp.map((skill) => {
        return {
          id: skill.id,
          skill_type: skill.skill_type,
          status: skill.status ? (
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
                  formik.setValues(skill);
                  setIsModelOpen(true);
                }}
              >
                Edit
              </button>
              {/* <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => onSkillTypeRemove(skill.id)}
              >
                Remove
              </button> */}
            </div>
          ),
        };
      });
      setSkillTypeList(tempList);
      setTableData(tempList);
    }
  }, [skillsTypeListProp]);

  const onSkillTypeRemove = (id) => {
    removeSkillTypeAction(id);
  };

  const onCloseModel = () => {
    formik.setValues({});
    setIsModelOpen(false);
  };

  const onSearchfilter = (event) => {
    if (event?.target?.value) {
      setTableData(
        skillTypeList.filter((skill) =>
          skill.skill_type
            .toLocaleLowerCase()
            .includes(event.target.value.toLocaleLowerCase())
        )
      );
    } else {
      setTableData(skillTypeList);
    }
  };

  const onClearSearch = (event) => {
    searchRef.current.value = null;
    setTableData(skillTypeList);
  };

  return (
    <>
      <NevbarComponent
        title={"Skill Types List"}
        breadcrumbPath={[{ link: "skilltypes", value: "Skill Types List"}]}
      />
      <SidebarComponent />
      <div className="content-wrapper">
        <div className="container-fluid px-5">
          <div className="content-header row">
            <h1 className="m-0 col-6">Skill Types List</h1>
            <div className="form-group col-6">
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="text"
                    className="form-control"
                    name="search"
                    ref={searchRef}
                    placeholder="Search"
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
              <DataTable columns={TableColumns} tableData={tableData} isLoading={skillTypeloading}/>
            </section>
          </div>
        </div>
      </div>

      <div>
        <Modal
          ariaHideApp={false}
          isOpen={isModelOpen}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-header">
            <h2>Skill Type Details</h2>
            <button className="btn btn-danger  btn-sm" onClick={onCloseModel}>
              {" "}
              X
            </button>
          </div>
          <Formik
            enableReinitialize={true}
            initialValues={formik.initialValues}
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
                      htmlFor="skill_type"
                      className="col-sm-2 col-form-label"
                    >
                      Skill Type
                    </label>
                    <div className="col-sm-10">
                      <input
                        id="skill_type"
                        name="skill_type"
                        type="text"
                        className={
                          "form-control " +
                          (formik?.errors?.skill_type
                            ? " border-danger "
                            : "") +
                          " "
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.skill_type}
                      />
                      {formik.touched.skill_type && formik.errors.skill_type ? (
                        <span className="text-danger">
                          {formik.errors.skill_type}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="status" className="col-sm-2 col-form-label">
                      Status
                    </label>
                    <div className="col-sm-10 d-flex">
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
                    <button type="submit" className="btn btn-primary">
                      Save{" "}
                    </button>
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
    skillTypeloading: state.getAllSkillTypeReducer.Loading,
    skillsTypeListProp: state?.getAllSkillTypeReducer?.skillsTypeList,
    newSkillTypeAddedProp: state?.addSkillTypeReducer?.newSkillTypeAdded,
    skillTypeUpdatedProp: state?.updateSkillTypeReducer?.skillTypeUpdated,
    skillTypeRemovedProp: state?.removedSkillTypeReducer?.skillTypeRemoved,
  };
};

const mapDispatchtoProps = {
  getAllSkillTypeAction: () => getAllSkillType(),
  addNewSkillTypeAction: (details) => addNewSkillType(details),
  updateSkillTypeDetailsAction: (details) => updateSkillTypeDetails(details),
  removeSkillTypeAction: (id) => removeSkillType(id),
};
export default connect(mapStatetoProps, mapDispatchtoProps)(SkillTypeComponent);

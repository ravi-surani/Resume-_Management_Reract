import React, { useEffect, useRef, useState } from "react";
import SidebarComponent from "../SidebarComponent";
import NevbarComponent from "../NevbarComponent";
import { connect } from "react-redux";
import { Formik, useFormik, useFormikContext } from "formik";
import DataTable from "../DataTable";
import * as Yup from "yup";
import Modal from "react-modal";

import {
  getAllSource,
  addNewSource,
  updateSourceDetails,
  removeSource,
} from "../../Redux/Actions/Actions";

function SourceComponent({
  sourceListProp,
  newSourceAddedProp,
  sourceUpdatedProp,
  sourceRemovedProp,
  getAllSourceAction,
  addNewSourceAction,
  updateSourceDetailsAction,
  removeSourceAction,
}) {
  const searchRef = useRef("");
  const [sourceList, setSourceList] = useState(null);
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
      width: "30%",
    },
  };

  const TableColumns = [
    { Header: "id", accessor: "id" },
    { Header: "Source", accessor: "source_name" },
    { Header: "Status", accessor: "status" },
    { Header: "Action", accessor: "action" },
  ];

  const formik = useFormik({
    initialValues: {
      source: "",
      status: true,
    },
    validationSchema: Yup.object().shape({
      source: Yup.string().required("Source is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      if (values?.id) {
        updateSourceDetailsAction(values);
      } else {
        addNewSourceAction(values);
      }
      resetForm();
      setIsModelOpen(false);
    },
  });

  useEffect(() => {
    getAllSourceAction();
  }, [newSourceAddedProp, sourceUpdatedProp, sourceRemovedProp]);

  useEffect(() => {
    if (sourceListProp) {
      let tempList = sourceListProp.map((source) => {
        return {
          id: source.id,
          source_name: source.source,
          status: source.status ? (
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
                  formik.setValues(source);
                  setIsModelOpen(true);
                }}
              >
                Edit
              </button>
              {/* <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => onSourceRemove(source.id)}
              >
                Remove
              </button> */}
            </div>
          ),
        };
      });
      setSourceList(tempList);
      setTableData(tempList);
    }
  }, [sourceListProp]);

  const onSourceRemove = (id) => {
    removeSourceAction(id);
  };

  const onCloseModel = () => {
    setIsModelOpen(false);
  };

  const onSearchfilter = (event) => {
    if (event?.target?.value) {
      setTableData(
        sourceList.filter((source) =>
          source.source_name
            .toLocaleLowerCase()
            .includes(event.target.value.toLocaleLowerCase())
        )
      );
    } else {
      setTableData(sourceList);
    }
  };

  const onClearSearch = (event) => {
    searchRef.current.value = null;
    setTableData(sourceList);
  };

  return (
    <>
      <NevbarComponent
        title={"Source List"}
        breadcrumbPath={[{ link: "source", value: "Source List" }]}
      />
      <SidebarComponent />
      <div className="content-wrapper">
        <div className="container-fluid px-5">
          <div className="content-header row">
            <h1 className="m-0 col-6">Source List</h1>
            <div className="form-group col-6">
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="text"
                    className="form-control"
                    ref={searchRef}
                    name="search"
                    placeholder="Search "
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
                      formik.setValues({
                        source: "",
                        status: false,
                      });
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
            <h2>Source Details</h2>
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
                    <label htmlFor="source" className="col-sm-2 col-form-label">
                      Source
                    </label>
                    <div className="col-sm-10">
                      <input
                        id="source"
                        name="source"
                        type="text"
                        className={
                          "form-control " +
                          (formik?.errors?.source ? " border-danger " : "") +
                          " "
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.source}
                      />
                      {formik.touched.source && formik.errors.source ? (
                        <span className="text-danger">
                          {formik.errors.source}
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
    sourceListProp: state.getAllSourceReducer?.sourceList,
    newSourceAddedProp: state.addSourceReducer?.newSourceAdded,
    sourceUpdatedProp: state.updateSourceReducer?.sourceUpdated,
    sourceRemovedProp: state.removedSourceReducer?.sourceRemoved,
  };
};
const mapDispatchtoProps = {
  getAllSourceAction: () => getAllSource(),
  addNewSourceAction: (details) => addNewSource(details),
  updateSourceDetailsAction: (details) => updateSourceDetails(details),
  removeSourceAction: (id) => removeSource(id),
};

export default connect(mapStatetoProps, mapDispatchtoProps)(SourceComponent);

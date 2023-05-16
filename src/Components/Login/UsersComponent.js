import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

import {
  getAllUsers,
  createNewUser,
  removeUser,
} from "../../Redux/Actions/Actions";

import DataTable from "../DataTable";
import SidebarComponent from "../SidebarComponent";
import NevbarComponent from "../NevbarComponent";

function UsersComponent({
  userDetailsProp,
  userListProp,
  removeUserDetailsProp,
  getAllUsersAction,
  createNewUserAction,
  removeUserAction,
  usersLoading
}) {
  const searchRef = useRef("");
  const [userList, setUserList] = useState(null);
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
    { Header: "User", accessor: "user" },
    { Header: "Email", accessor: "email" },
    { Header: "Contact No", accessor: "contect_no" },
    { Header: "Action", accessor: "action" },
  ];

  useEffect(() => {
    getAllUsersAction();
  }, [userListProp, removeUserDetailsProp]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contect_no: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Please enter Name."),
      email: Yup.string().required("Please enter Email."),
      contect_no: Yup.string().required("Please enter Contact No."),
      password: Yup.string().required("Please Password."),
    }),

    onSubmit: (values, { resetForm }) => {
      createNewUserAction(values);

      resetForm();
      setIsModelOpen(false);
    },
  });

  useEffect(() => {
    if (userDetailsProp) {
      let tempList = userDetailsProp.map((user) => {
        return {
          id: user.id,
          user: user.name,
          email: user.email,
          contect_no: user.contect_no,
          action: (
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => onSkillTypeRemove(user.id)}
            >
              Remove
            </button>
          ),
        };
      });
      setUserList(tempList);
      setTableData(tempList);
    }
  }, [userDetailsProp]);

  const onSkillTypeRemove = (id) => {
    removeUserAction(id);
  };

  const onCloseModel = () => {
    setIsModelOpen(false);
  };

  const onSearchfilter = (event) => {
    if (event?.target?.value) {
      setTableData(
        userList.filter(
          (usr) =>
            usr.user
              .toLocaleLowerCase()
              .includes(event.target.value.toLocaleLowerCase()) ||
            usr.email
              .toLocaleLowerCase()
              .includes(event.target.value.toLocaleLowerCase()) ||
            usr.contect_no
              .toLocaleLowerCase()
              .includes(event.target.value.toLocaleLowerCase())
        )
      );
    } else {
      setTableData(userList);
    }
  };

  const onClearSearch = (event) => {
    searchRef.current.value = null;
    setTableData(userList);
  };

  return (
    <>
      <NevbarComponent
        title={"Users List"}
        breadcrumbPath={[{ link: "Users", value: "Users List" }]}
      />
      <SidebarComponent />
      <div className="content-wrapper">
        <div className="container-fluid px-5">
          <div className="content-header row">
            <h1 className="m-0 col-6">Users List</h1>
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
              <DataTable columns={TableColumns} tableData={tableData} isLoading={usersLoading}/>
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
            <h4>User Details</h4>
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
                    <label htmlFor="name" className="col-sm-3 col-form-label">
                      User
                    </label>
                    <div className="col-sm-9">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className={
                          "form-control " +
                          (formik?.errors.name ? " border-danger " : "") +
                          " "
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <span className="text-danger">
                          {formik.errors.name}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="email" className="col-sm-3 col-form-label">
                      Email Id
                    </label>
                    <div className="col-sm-9">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={
                          "form-control " +
                          (formik?.errors.email ? " border-danger " : "") +
                          " "
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <span className="text-danger">
                          {formik.errors.email}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="contect_no"
                      className="col-sm-3 col-form-label"
                    >
                      Contact No
                    </label>
                    <div className="col-sm-9">
                      <input
                        id="contect_no"
                        name="contect_no"
                        type="contect_no"
                        className={
                          "form-control " +
                          (formik?.errors.contect_no ? " border-danger " : "") +
                          " "
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contect_no}
                      />
                      {formik.touched.contect_no && formik.errors.contect_no ? (
                        <span className="text-danger">
                          {formik.errors.contect_no}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="password"
                      className="col-sm-3 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-9">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className={
                          "form-control " +
                          (formik?.errors.password ? " border-danger " : "") +
                          " "
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <span className="text-danger">
                          {formik.errors.password}
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
    usersLoading: state.getAllUsers.Loading,
    userDetailsProp: state?.getAllUsers?.userList,
    userListProp: state?.createNewUserReducer?.userDetails,
    removeUserDetailsProp: state?.reomveUserReducer?.removeUserDetails,
  };
};

const mapDispatchtoProps = {
  getAllUsersAction: () => getAllUsers(),
  createNewUserAction: (details) => createNewUser(details),
  removeUserAction: (id) => removeUser(id),
};
export default connect(mapStatetoProps, mapDispatchtoProps)(UsersComponent);

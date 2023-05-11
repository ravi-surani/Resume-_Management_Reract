import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DataTable from "../DataTable";
import SidebarComponent from "../SidebarComponent";
import NevbarComponent from "../NevbarComponent";
import { viewInterview } from "../../ReduxNew/Interview/interviewAction";

function InterviewComponent({
  interviewsListProps,
  getAllInterviewAction,
  dispatchInterview,
  interviewsLoading,
  interviewsResponse,
  interviewsError,
}) {
  const searchRef = useRef("");
  const [interviewList, setInterviewList] = useState(null);
  const [tableData, setTableData] = useState([]);

  const TableColumns = [
    { Header: "Id", accessor: "id" },
    { Header: "Candidate", accessor: "candidate" },
    { Header: "Email", accessor: "email" },
    { Header: "Contact No", accessor: "contect_no" },
    { Header: "Interview Type", accessor: "interview_type" },
    { Header: "Action", accessor: "action" },
  ];

  useEffect(() => {
    // getAllInterviewAction();
    dispatchInterview();
  }, []);

  useEffect(() => {
    // if (interviewsListProps) {
    if (!interviewsLoading && interviewsResponse) {
      // let tempList = interviewsListProps.map((interview) => {
      let tempList = interviewsResponse.map((interview) => {
        return {
          id: interview?.id,
          candidate: interview?.candidate?.name,
          contect_no: interview?.candidate?.contect_no,
          email: interview?.candidate?.email,
          interview_type: interview?.interview_type?.interview_type,
          recruitment_status: interview?.recruitment_status,
          action: (
            <Link
              to={"/interview/" + interview?.candidate?.id}
              type="button"
              className="btn btn-info btn-sm"
            >
              Details
            </Link>
          ),
        };
      });
      setInterviewList(tempList);
      setTableData(tempList);
    }
    // }, [interviewsListProps]);
  }, [interviewsLoading, interviewsResponse]);

  const onSearchfilter = (event) => {
    if (event?.target?.value) {
      setTableData(
        interviewList.filter(
          (interview) =>
            interview.candidate
              .toLocaleLowerCase()
              .includes(event.target.value.toLocaleLowerCase()) ||
            interview.email
              .toLocaleLowerCase()
              .includes(event.target.value.toLocaleLowerCase()) ||
            interview.contect_no
              .toLocaleLowerCase()
              .includes(event.target.value.toLocaleLowerCase())
        )
      );
    } else {
      setTableData(interviewList);
    }
  };

  const onClearSearch = (event) => {
    searchRef.current.value = null;
    setTableData(interviewList);
  };

  return (
    <>
      <NevbarComponent
        title={"Interview List"}
        breadcrumbPath={[{ link: "interview", value: "Interview List" }]}
      />
      <SidebarComponent />
      <div className="content-wrapper">
        <div className="container-fluid px-5">
          <div className="content-header row">
            <h1 className="m-0 col-6">Interview List</h1>
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
              </div>
            </div>
          </div>
          <div className="wrapper">
            <section className="content">
              <DataTable
                columns={TableColumns}
                tableData={tableData}
                isLoading={interviewsLoading}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStatetoProps = (state) => {
  return {
    // interviewsListProps: state?.getAllInterviewsReducer?.InterviewsList,
    interviewsLoading: state.viewInterviewReducer.loading,
    interviewsResponse: state.viewInterviewReducer.data.data,
    interviewsError: state.viewInterviewReducer.error,
  };
};

const mapDispatchtoProps = {
  // getAllInterviewAction: () => getAllInterview(),
  dispatchInterview: () => viewInterview(),
};
export default connect(mapStatetoProps, mapDispatchtoProps)(InterviewComponent);

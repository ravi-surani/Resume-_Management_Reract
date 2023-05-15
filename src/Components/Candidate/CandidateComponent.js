import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DataTable from "../DataTable";
import SidebarComponent from "../SidebarComponent";
import NevbarComponent from "../NevbarComponent";
import { viewCandidate } from "../../ReduxNew/Candidate/candidateAction";

function CandidateComponent({ candidateListProp, getAllCandidatesAction, viewCandidatesDispatch, candidatesLoading, candidatesResponse, candidatesError }) {
  const searchRef = useRef("");
  const [candidateList, setCandidateList] = useState(null);
  const [tableData, setTableData] = useState([]);

  const TableColumns = [
    { Header: "Id", accessor: "id" },
    { Header: "Candidate", accessor: "candidate" },
    { Header: "Contact No", accessor: "contect_no" },
    { Header: "Email", accessor: "email" },
    { Header: "Source", accessor: "source" },
    { Header: "Status", accessor: "recruitment_status" },
    { Header: "Action", accessor: "action" },
  ];

  useEffect(() => {
    // getAllCandidatesAction();
    viewCandidatesDispatch();
  }, []);

  useEffect(() => {
    // if (candidateListProp) {
    if (!candidatesLoading && candidatesResponse) {
    //   let tempList = candidateListProp.map((candidate) => {
      let tempList = candidatesResponse?.map((candidate) => {
        return {
          id: candidate.id,
          candidate: candidate.name,
          contect_no: candidate.contect_no,
          email: candidate.email,
          recruitment_status: candidate.recruitment__status?.recruitment_status,
          source: candidate.source?.source,
          action: (
            <Link
              to={"/candidatedetails/" + candidate.id}
              type="button"
              className="btn btn-info btn-sm"
            >
              Details
            </Link>
          ),
        };
      });
      setCandidateList(tempList);
      setTableData(tempList);
    }
//   }, [candidateListProp]);
  }, [candidatesResponse, candidatesLoading]);

  const onSearchfilter = (event) => {
    if (event?.target?.value) {
      setTableData(
        candidateList.filter(
          (data) =>
            data.candidate?.toLocaleLowerCase()
              .includes(event.target.value.toLocaleLowerCase())
        )
      );
    } else {
      setTableData(candidateList);
    }
  };

  const onClearSearch = (event) => {
    searchRef.current.value = null;
    setTableData(candidateList);
  };

  return (
    <>
      <NevbarComponent
        title={"Candidate List"}
        breadcrumbPath={[{ link: "candidate", value: "Candidate List" }]}
      />
      <SidebarComponent />
      <div className="content-wrapper">
        <div className="container-fluid px-5">
          <div className="content-header row">
            <h1 className="m-0 col-6">Candidate List</h1>
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
                  <Link
                    to={"/candidateform"}
                    className="btn btn-primary"
                    onClick={() => {}}
                  >
                    Add
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper">
            <section className="content">
              <DataTable columns={TableColumns} tableData={tableData} isLoading={candidatesLoading}/>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStatetoProps = (state) => {
  return {
    // candidateListProp: state?.getCandidatesReducer?.CandidateList,
    candidatesLoading:state.viewCandidateReducer.loading,
    candidatesResponse: state.viewCandidateReducer.data.data,
    candidatesError: state.viewCandidateReducer.error
  };
};

const mapDispatchtoProps = {
  // getAllCandidatesAction: () => getAllCandidates(),
  viewCandidatesDispatch: () => viewCandidate()
};
export default connect(mapStatetoProps, mapDispatchtoProps)(CandidateComponent);

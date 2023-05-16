import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import SidebarComponent from "../SidebarComponent";
import NevbarComponent from "../NevbarComponent";
import { getCandidateById } from "../../Redux/Actions/Actions";


function CandidateDetailsComponent({
  candidateDetialsProp,
  getCandidateByIdAction,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCandidateByIdAction(id);
    }
  }, []);

  return (
    <>
      <NevbarComponent
        title={"Candidate Details"}
        breadcrumbPath={[{ link: "candidate", value: "Candidate Details" }]}
      />
      <SidebarComponent />
      <div className="content-wrapper">
        <div className="container-fluid px-5">
          <div className="content-header row">
            <h1 className="m-0 col-9 ">Candidate Details</h1>
            <div className="col-3 d-flex justify-content-lg-around ">
              <Link
                to={"/candidateform/" + candidateDetialsProp?.id}
                className="btn btn-primary "
              >
                Edit
              </Link>
              <Link
                to={"/interview/" + candidateDetialsProp?.id}
                className="btn btn-primary "
              >
                Interview
              </Link>
              <button className="btn btn-danger" onClick={()=>navigate(-1)}>
                Back
              </button>
            </div>
          </div>
          <div className="wrapper">
            <section className="content">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between ">
                    <div className="w-75">
                      <label className="font-weight-normal h6 ">
                        Name :
                        <span className="h6">
                          {" "}
                          {candidateDetialsProp?.name}
                        </span>
                      </label>
                    </div>
                    <div className="">
                      <a
                        href={candidateDetialsProp?.resume_id}
                        className="btn btn-primary "
                        target="blanck"
                      >
                        {" "}
                        Resume{" "}
                      </a>
                    </div>
                  </div>
                  <div className="">
                    <label className="font-weight-normal h6 ">
                      Remarks :
                      <span className="h6">
                        {" "}
                        {candidateDetialsProp?.remarks}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="card">
                    <div className="card-header bg-secondary">
                      <h3 className="card-title col-10">Skills</h3>
                    </div>
                    <div className="card-body">
                      <div className="d-felx "></div>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Skill</th>
                            <th>Experience</th>
                            <th>Point</th>
                          </tr>
                        </thead>
                        <tbody>
                          {candidateDetialsProp?.skills?.map((data) => {
                            return (
                              <tr>
                                <td>{data?.skill}</td>
                                <td>{data.experience}</td>
                                <td>{data.self_rating}</td>
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
                        <div className="col-6 row ">
                          <label className="font-weight-normal col-4 ">
                            Email
                          </label>
                          <h6 className="col-8">
                            {" "}
                            {candidateDetialsProp?.email}
                          </h6>
                        </div>
                        <div className="col-6 row ">
                          <label className="font-weight-normal col-4 ">
                            Contact No
                          </label>
                          <h6 className="col-8">
                            {" "}
                            {candidateDetialsProp?.contect_no}
                          </h6>
                        </div>
                        <div className="col-6 row ">
                          <label className="font-weight-normal col-4 ">
                            Address
                          </label>
                          <h6 className="col-8">
                            {" "}
                            {candidateDetialsProp?.address}
                          </h6>
                        </div>
                        <div className="col-6 row ">
                          <label className="font-weight-normal col-4 ">
                            City
                          </label>
                          <h6 className="col-8">
                            {" "}
                            {candidateDetialsProp?.city}
                          </h6>
                        </div>
                        <div className="col-6 row ">
                          <label className="font-weight-normal col-4 ">
                            State
                          </label>
                          <h6 className="col-8">
                            {" "}
                            {candidateDetialsProp?.state}
                          </h6>
                        </div>
                        {/* <div className="col-6 row ">
                          <label className="font-weight-normal col-4 ">
                            countary
                          </label>
                          <h6 className="col-8">
                            {" "}
                            {candidateDetialsProp?.countary}
                          </h6>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card">
                    <div className="card-header bg-secondary">
                      <h4 className="card-title col-10">Previous Companies</h4>
                    </div>
                    <div className="card-body">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Company</th>
                            <th>From </th>
                            <th>To</th>
                          </tr>
                        </thead>
                        <tbody>
                          {candidateDetialsProp?.candidate_experience?.map(
                            (companiy) => {
                              return (
                                <tr>
                                  <td>{companiy?.coumpany_name}</td>
                                  <td>{companiy.from}</td>
                                  <td>{companiy.to}</td>
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
                          <label className="font-weight-normal ">Degree</label>
                          <h6 className="col-9">
                            {" "}
                            {candidateDetialsProp?.degree?.degree}
                          </h6>
                        </div>
                        <div className="col-6">
                          <label className="font-weight-normal ">
                            Passing Year
                          </label>
                          <h6 className="col-9">
                            {" "}
                            {candidateDetialsProp?.passing_year}
                          </h6>
                        </div>
                        <div className="col-6">
                          <label className="font-weight-normal ">
                            Passing Grade
                          </label>
                          <h6 className="col-9">
                            {" "}
                            {candidateDetialsProp?.passing_grade}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card">
                      <div className="card-header bg-secondary">Salary</div>
                      <div className="card-body row">
                        <div className="col-6">
                          <label className="font-weight-normal ">
                            Current Salary
                          </label>
                          <h5 className="col-9">
                            {" "}
                            {candidateDetialsProp?.current_salary}
                          </h5>
                        </div>
                        <div className="col-6">
                          <label className="font-weight-normal ">
                            Expected Salary
                          </label>
                          <h5 className="col-9">
                            {" "}
                            {candidateDetialsProp?.expected_salary}
                          </h5>
                        </div>
                        <div className="col-6">
                          <label className="font-weight-normal ">
                            Total Experience
                          </label>
                          <h5 className="col-9">
                            {" "}
                            {candidateDetialsProp?.total_experience}
                          </h5>
                        </div>
                        <div className="col-6">
                          <label className="font-weight-normal ">
                            Notice Period
                          </label>
                          <h5 className="col-9">
                            {" "}
                            {candidateDetialsProp?.notice_period}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="card">
                    <div className="card-header bg-secondary">Mode of Work</div>
                    <div className="card-body">
                      <label className="font-weight-normal ">
                        Mode of Work
                      </label>
                      <h5 className="col-9">
                        {" "}
                        {candidateDetialsProp?.mode_of_work?.mode_of_work}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="card">
                    <div className="card-header bg-secondary">
                      Source of Connection
                    </div>
                    <div className="card-body">
                      <label className="font-weight-normal ">
                        Source of Connection
                      </label>
                      <h5 className="col-9">
                        {" "}
                        {candidateDetialsProp?.source?.source}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="card">
                    <div className="card-header bg-secondary">
                      Recruitment Status
                    </div>
                    <div className="card-body">
                      <label className="font-weight-normal ">
                        Source of Connection
                      </label>
                      <h5 className="col-9">
                        {" "}
                        {
                          candidateDetialsProp?.recruitment__status
                            ?.recruitment_status
                        }
                      </h5>
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
                      <div className="">
                        <h5 className="col-9">{candidateDetialsProp?.dob}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStatetoProps = (state) => {
  return {
    candidateDetialsProp: state?.getCandidatesReducer?.CandidateDetials,
  };
};

const mapDispatchtoProps = {
  getCandidateByIdAction: (id) => getCandidateById(id),
};
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(CandidateDetailsComponent);

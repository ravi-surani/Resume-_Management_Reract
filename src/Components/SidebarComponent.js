import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setUserLoginDetails, userLogout } from "../Redux/Actions/Actions";

function SidebarComponent({
  userDetailsProps,
  setUserLoginDetailsAction,
  userLogoutActon,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetailsProps && localStorage.getItem("login_user")?.length) {
      setUserLoginDetailsAction(JSON.parse(localStorage.getItem("login_user")));
    } else if (
      !userDetailsProps &&
      !JSON.parse(localStorage.getItem("login_user"))
    ) {
      navigate("/login");
    }
  }, []);

  const logoutAction = () => {
    userLogoutActon();
    navigate("/login");
  };



  return (
    <>

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/" className="brand-link">
          Resume Managemant
        </Link>
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to={"/"} className="nav-link text-left ">
                  <p>Calendar </p>
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/candidate"} className="nav-link text-left ">
                  <p>Candidate </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/interview"} className="nav-link text-left ">
                  <p>Interview </p>
                </Link>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link collapsed text-truncate"
                  href="#submenu1"
                  data-toggle="collapse"
                  data-target="#submenu1"
                >
                  <span class="d-none d-sm-inline">Masters &nbsp; <i className="fa fa-caret-right"></i></span>
                </a>
                <div class="collapse" id="submenu1" aria-expanded="true">
                  <ul class="flex-column  pl-2 nav">
                    <li class="nav-item">
                      <Link to={"/source"} className="nav-link text-left ">
                        <p>- Source</p>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to={"/skilltypes"} className="nav-link text-left ">
                        <p>- Skill Type</p>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to={"/skills"} className="nav-link text-left ">
                        <p>- Skill</p>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        to={"/recruitmentstatus"}
                        className="nav-link text-left "
                      >
                        <p>- Recruitment Status</p>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to={"/modeofwork"} className="nav-link text-left ">
                        <p>- Mode of Work</p>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        to={"/interviewtype"}
                        className="nav-link text-left "
                      >
                        <p>- Interview Type</p>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to={"/interviewer"} className="nav-link text-left ">
                        <p>- Interviewer</p>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        to={"/interviewmode"}
                        className="nav-link text-left "
                      >
                        <p>- Interview Mode</p>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to={"/degree"} className="nav-link text-left ">
                        <p>- Degree</p>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to={"/users"} className="nav-link text-left ">
                        <p>- Users</p>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* <li className="nav-item">
                <a href="#" className="nav-link">
           
                  Masters
                  <span className="badge badge-info right">
                    &nbsp; 10 &nbsp;
                  </span>
           
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to={"/source"} className="nav-link text-left ">
                      <p>Source</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/skilltypes"} className="nav-link text-left ">
                      <p>Skill Type</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/skills"} className="nav-link text-left ">
                      <p>Skill</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to={"/recruitmentstatus"}
                      className="nav-link text-left "
                    >
                      <p>Recruitment Status</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/modeofwork"} className="nav-link text-left ">
                      <p>Mode of Work</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/interviewtype"} className="nav-link text-left ">
                      <p>Interview Type</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/interviewer"} className="nav-link text-left ">
                      <p>Interviewer</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/interviewmode"} className="nav-link text-left ">
                      <p>Interview Mode</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/degree"} className="nav-link text-left ">
                      <p>Degree</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/users"} className="nav-link text-left ">
                      <p>Users</p>
                    </Link>
                  </li>
                </ul>
              </li> */}

              <li className="nav-item" style={{ cursor: "pointer" }}>
                <span
                  onClick={() => logoutAction()}
                  className="nav-link text-left text-red"
                >
                  Logout
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

const mapStatetoProps = (state) => {
  return {
    userDetailsProps: state?.loginUserReducer?.userDetails,
  };
};

const mapDispatchtoProps = {
  setUserLoginDetailsAction: (details) => setUserLoginDetails(details),
  userLogoutActon: () => userLogout(),
};

export default connect(mapStatetoProps, mapDispatchtoProps)(SidebarComponent);

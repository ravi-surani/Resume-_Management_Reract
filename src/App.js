import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NevbarComponent from './Components/NevbarComponent.js';
import SidebarComponent from './Components/SidebarComponent';
import PageComponent from './Components/PageComponent';
import SourceComponent from './Components/Masters/SourceComponent';
import SkillTypeComponent from './Components/Masters/SkillTypeComponent';
import SkillComponent from './Components/Masters/SkillComponent';
import RecruitmentStatusComponent from './Components/Masters/RecruitmentStatusComponent ';
import ModeOfWorkComponent from './Components/Masters/ModeOfWorkComponent ';
import InterviewTypeComponent from './Components/Masters/InterviewTypeComponent';
import InterviewerComponent from './Components/Masters/InterviewerComponent';
import InterviewModeComponent from './Components/Masters/InterviewModeComponent';
import DegreeComponent from './Components/Masters/DegreeComponent';
import CandidateComponent from './Components/Candidate/CandidateComponent';
import CandidateDetailsComponent from './Components/Candidate/CandidateDetailsComponent';
import CandidateDetailsFormComponent from './Components/Candidate/CandidateDetailsFormComponent';
import InterviewComponent from './Components/Interview/InterviewComponent';
import InterviewDetailsComponent from './Components/Interview/InterviewDetailsComponent';
import LoginComponent from './Components/Login/LoginComponent';
import CalendarComponent from './Components/Calendar/CalendarComponent';
import UsersComponent from './Components/Login/UsersComponent';

function App() {
  return (
    <div className="">


      <BrowserRouter >
        <Routes>
          <Route element={<NevbarComponent />} />
          <Route element={<SidebarComponent />} />

          {/* Calendar */}
          <Route path="/" element={<CalendarComponent />} />

          {/* <Route path="/" element={<PageComponent />} /> */}
          {/* Candidates */}
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/candidate" element={<CandidateComponent />} />
          <Route path="/candidatedetails/:id" element={<CandidateDetailsComponent />} />
          <Route path="/candidateform" element={<CandidateDetailsFormComponent />} >
            <Route path="/candidateform/:id" element={<CandidateDetailsFormComponent />} />
          </Route>


          {/* Interview */}
          <Route path="/interview" element={<InterviewComponent />} />
          <Route path="/interview/:id" element={<InterviewDetailsComponent />} />

          {/* Masters */}
          <Route path="/source" element={<SourceComponent />} />
          <Route path="/skilltypes" element={<SkillTypeComponent />} />
          <Route path="/skills" element={<SkillComponent />} />
          <Route path="/users" element={<UsersComponent />} />
          <Route path="/recruitmentstatus" element={<RecruitmentStatusComponent />} />
          <Route path="/modeofwork" element={<ModeOfWorkComponent />} />
          <Route path="/interviewtype" element={<InterviewTypeComponent />} />
          <Route path="/interviewer" element={<InterviewerComponent />} />
          <Route path="/interviewmode" element={<InterviewModeComponent />} />
          <Route path="/degree" element={<DegreeComponent />} />

        </Routes>
      </BrowserRouter>















      {/* <aside className="control-sidebar control-sidebar-dark">

        </aside> */}


    </div >
  );
}

export default App;

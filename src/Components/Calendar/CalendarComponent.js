import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import NevbarComponent from "../NevbarComponent";
import SidebarComponent from "../SidebarComponent";

import { getAllInterview, } from '../../Redux/Actions/Actions';
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment)

function CalendarComponent({ interviewsListProps, getAllInterviewAction }) {

    const navigate = useNavigate();
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        getAllInterviewAction();
    }, [])

    useEffect(() => {
        if (interviewsListProps) {
            let tempList = interviewsListProps.map(interview => {

                let starttime = new Date(interview?.date);

                let endtime = new Date();
                endtime.setHours(starttime.getHours() + 1)
                return {
                    candidateId: interview?.candidate?.id,
                    id: interview?.id,
                    id: interview?.id,
                    name: interview?.candidate?.name,
                    description: interview?.interview_type?.interview_type,
                    start: starttime,
                    end: endtime,
                }
            })
            setTableData(tempList)
        }
    }, [interviewsListProps])


    const Custoemevent = (event) => {
        navigate('/interview/' + event.candidateId)
    };

    const localizer = momentLocalizer(moment)

    console.log(tableData)
    return (
        <>
            <NevbarComponent title={"Calendar List"} breadcrumbPath={[{ link: '', value: "Calendar" }]} />
            <SidebarComponent />
            <div className="content-wrapper">
                <div className="container-fluid px-5">
                    <div className="" style={{ minHeight: 500 }}>
                        <Calendar

                            selectable={true}
                            localizer={localizer}
                            step={30}
                            defaultView="week"
                            views={["week", "day"]}
                            defaultDate={new Date()}
                            scrollToTime={new Date(1970, 1, 1, 6)}
                            onSelectEvent={(event) => Custoemevent(event)}
                            events={tableData ? tableData : []}
                            showMultiDayTimes
                            style={{ minHeight: 500 }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}


const mapStatetoProps = (state) => {
    return {
        interviewsListProps: state?.getAllInterviewsReducer?.InterviewsList,
    }
}

const mapDispatchtoProps = {
    getAllInterviewAction: () => getAllInterview(),
}
export default connect(mapStatetoProps, mapDispatchtoProps)(CalendarComponent)
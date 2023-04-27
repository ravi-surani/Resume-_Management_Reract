import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux'

import { Formik, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";

import { getAllInterview, } from '../../Redux/Actions/Actions';

import DataTable from '../DataTable';
import SidebarComponent from '../SidebarComponent';
import NevbarComponent from '../NevbarComponent';
import { Link } from 'react-router-dom';

function InterviewComponent({ interviewsListProps, getAllInterviewAction }) {

    const searchRef = useRef('');
    const [interviewList, setInterviewList] = useState(null);
    const [tableData, setTableData] = useState([])


    const TableColumns = [
        { Header: "Id", accessor: "id" },
        { Header: "Candidate", accessor: "candidate" },
        { Header: "Email", accessor: "email" },
        { Header: "Contact No", accessor: "contect_no" },
        { Header: "Interview Type", accessor: "interview_type" },
        { Header: "Action", accessor: "action" },
    ];

    useEffect(() => {
        getAllInterviewAction();
    }, [])


    useEffect(() => {
        if (interviewsListProps) {
            let tempList = interviewsListProps.map(interview => {

                return {
                    id: interview?.id,
                    candidate: interview?.candidate?.name,
                    contect_no: interview?.candidate?.contect_no,
                    email: interview?.candidate?.email,
                    interview_type: interview?.interview_type?.interview_type,
                    recruitment_status: interview?.recruitment_status,
                    action: <Link to={'/interview/' + interview?.candidate?.id} type="button" className="btn btn-info btn-sm" >Details</Link>
                }
            })
            setInterviewList(tempList)
            setTableData(tempList)
        }
    }, [interviewsListProps])

    const onSearchfilter = (event) => {
        if (event?.target?.value) {
            setTableData(
                interviewList.filter(interview => interview.candidate.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
                    interview.email.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
                    interview.contect_no.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
            );
        }
        else { setTableData(interviewList); }
    }



    const onClearSearch = (event) => {
        searchRef.current.value = null;
        setTableData(interviewList);
    }



    return (
        <>
            <NevbarComponent title={"Interview List"} breadcrumbPath={[{ link: 'interview', value: "Interview List" }]} />
            <SidebarComponent />
            <div className="content-wrapper">
                <div className="container-fluid px-5">
                    <div className="content-header row">
                        <h1 className="m-0 col-6">Interview List</h1>
                        <div className="form-group col-6">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="text" className="form-control" name='search' placeholder="Search " ref={searchRef} onChange={onSearchfilter} />
                                </div>
                                <div className="input-group-append">
                                    <button className="btn btn-danger" onClick={onClearSearch}>Clear</button>
                                </div>
                                <div className="input-group-append">
                                    {/* <Link to={'/interview'} className="btn btn-primary" onClick={() => {
                                    }}>Add</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper">
                        <section className="content">
                            <DataTable columns={TableColumns} tableData={tableData} />
                        </section>
                    </div>
                </div >
            </div >
        </>
    )

}

const mapStatetoProps = (state) => {
    return {
        interviewsListProps: state?.getAllInterviewsReducer?.InterviewsList,
    }
}

const mapDispatchtoProps = {
    getAllInterviewAction: () => getAllInterview(),
}
export default connect(mapStatetoProps, mapDispatchtoProps)(InterviewComponent)
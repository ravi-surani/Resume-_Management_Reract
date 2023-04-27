import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux'

import { Formik, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";

import { getAllInterviewer, addNewInterviewer, updateInterviewerDetails, removeInterviewerStatus, } from '../../Redux/Actions/Actions';

import DataTable from '../DataTable';
import SidebarComponent from '../SidebarComponent';
import NevbarComponent from '../NevbarComponent';

function InterviewerComponent({
    interviewerListProp, newinterviewerAddedProp, interviewerUpdatedProp, interviewerRemovedProp,
    getAllInterviewerAction, addNewInterviewerAction, updateInterviewerDetailsAction, removeInterviewerStatusAction, }) {

    const searchRef = useRef('');
    const [interviewerList, setInterviewerList] = useState(null);
    const [tableData, setTableData] = useState([])
    const [isModelOpen, setIsModelOpen] = useState(false);

    const customStyles = {
        content: {
            top: '15%',
            left: '35%',
            right: 'auto',
            bottom: 'auto',
            padding: '0px',
            marginRight: '-50%',
            // transform: 'translate(-50%, -120%)  ',
            width: '30%',
        },
    };

    const TableColumns = [
        { Header: 'id', accessor: 'id', },
        { Header: 'Interviewer', accessor: 'interviewer', },
        { Header: 'Email', accessor: 'email', },
        { Header: 'Contact No', accessor: 'contect_no', },
        { Header: 'Status', accessor: 'status', },
        { Header: 'Action', accessor: 'action', },
    ];

    useEffect(() => {
        getAllInterviewerAction();
    }, [newinterviewerAddedProp, interviewerUpdatedProp, interviewerRemovedProp])

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            contect_no: "",
            status: true
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Please enter Name."),
            email: Yup.string().required("Please enter Email."),
            contect_no: Yup.string().required("Please enter Contact No."),
            // status: Yup.string().required("Please status."),
        }),

        onSubmit: (values, { resetForm }) => {
            if (values?.id) {
                updateInterviewerDetailsAction(values)
            }
            else {
                addNewInterviewerAction(values)
            }
            resetForm();
            setIsModelOpen(false);
        }
    });


    useEffect(() => {
        if (interviewerListProp) {
            let tempList = interviewerListProp.map(interviewer => {

                return {
                    id: interviewer.id,
                    interviewer: interviewer.name,
                    email: interviewer.email,
                    contect_no: interviewer.contect_no,
                    status: interviewer.status ? <h6 className='text-primary '>Active</h6> : <h6 className='text-danger'>Inactive</h6>,
                    action:
                        <div className="btn-group ">
                            <button type="button" className="btn btn-info btn-sm" onClick={() => {
                                formik.setValues(interviewer)
                                setIsModelOpen(true);
                            }}>Edit</button>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => onSkillTypeRemove(interviewer.id)}>Remove</button>

                        </div>
                }
            })
            setInterviewerList(tempList)
            setTableData(tempList)
        }
    }, [interviewerListProp])

    const onSkillTypeRemove = (id) => {
        removeInterviewerStatusAction(id)
    }

    const onCloseModel = () => {
        setIsModelOpen(false);
    }

    const onSearchfilter = (event) => {
        if (event?.target?.value) {
            setTableData(
                interviewerList.filter(
                    modeOfWork => modeOfWork.interviewer.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
                        modeOfWork.email.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()) ||
                        modeOfWork.contect_no.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
            );
        }
        else { setTableData(interviewerList); }
    }



    const onClearSearch = (event) => {
        searchRef.current.value = null;
        setTableData(interviewerList);
    }

    return (
        <>
            <NevbarComponent title={"Interviewer List"} breadcrumbPath={[{ link: 'interviewer', value: "Interviewer List" }]} />
            <SidebarComponent />
            <div className="content-wrapper">
                <div className="container-fluid px-5">
                    <div className="content-header row">
                        <h1 className="m-0 col-6">Interviewer List</h1>
                        <div className="form-group col-6">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="text" className="form-control" name='search' placeholder="Search " ref={searchRef} onChange={onSearchfilter} />
                                </div>
                                <div className="input-group-append">
                                    <button className="btn btn-danger" onClick={onClearSearch}>Clear</button>
                                </div>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" onClick={() => {
                                        setIsModelOpen(true)
                                    }}>Add</button>
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

            <div>
                <Modal
                    isOpen={isModelOpen}
                    // onAfterOpen={afterOpenModal}
                    // onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className='modal-header'>
                        <h4 >Mode of Work Details</h4>
                        <button className='btn btn-danger  btn-sm' onClick={onCloseModel}> X</button>
                    </div>

                    <Formik
                        initialValues={formik.initialValues}
                        enableReinitialize={true}
                        validateOnChange={false}
                        validateOnBlur={false}

                        onSubmit={values => { formik.handleSubmit(values) }}>
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <div className="modal-body">
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-sm-3 col-form-label">Interviewer</label>
                                        <div className="col-sm-9">
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                className={"form-control " + ((formik?.errors.name) ? " border-danger " : "") + " "}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.name}
                                            />
                                            {formik.touched.name && formik.errors.name ? (
                                                <span className="text-danger">{formik.errors.name}</span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-3 col-form-label">Email Id</label>
                                        <div className="col-sm-9">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className={"form-control " + ((formik?.errors.email) ? " border-danger " : "") + " "}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <span className="text-danger">{formik.errors.email}</span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="contect_no" className="col-sm-3 col-form-label">Contact No</label>
                                        <div className="col-sm-9">
                                            <input
                                                id="contect_no"
                                                name="contect_no"
                                                type="contect_no"
                                                className={"form-control " + ((formik?.errors.contect_no) ? " border-danger " : "") + " "}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.contect_no}
                                            />
                                            {formik.touched.contect_no && formik.errors.contect_no ? (
                                                <span className="text-danger">{formik.errors.contect_no}</span>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="status" className="col-sm-3 col-form-label">Status</label>
                                        <div className="col-sm-9 d-flex">
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
                                                                onChange={() => { formik.setFieldValue('status', !formik.values.status) }}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.status} />
                                                        </span>
                                                    </div>
                                                    <label type="text" className="form-label ml-4">{formik.values.status ? 'Active' : "Inactive"}</label>
                                                </div>
                                            </div>
                                            {formik.touched.status && formik.errors.status ? (
                                                <span className="text-danger">{formik.errors.status}</span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer justify-content-between">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={onCloseModel}>Close</button>
                                    {formik.values?.id ?
                                        <button className="btn btn-primary" >Update</button>
                                        :
                                        <button className="btn btn-primary" >Save </button>
                                    }
                                </div>
                            </form>
                        )}
                    </Formik>
                </Modal >
            </div >


        </>
    )

}

const mapStatetoProps = (state) => {
    return {
        interviewerListProp: state?.getAllInterviewerReducer?.interviewerList,
        newinterviewerAddedProp: state?.addInterviewerReducer?.newinterviewerAdded,
        interviewerUpdatedProp: state?.updateInterviewerReducer?.interviewerUpdated,
        interviewerRemovedProp: state?.removedInterviewerReducer?.interviewerRemoved,

    }
}

const mapDispatchtoProps = {
    getAllInterviewerAction: () => getAllInterviewer(),
    addNewInterviewerAction: (details) => addNewInterviewer(details),
    updateInterviewerDetailsAction: (details) => updateInterviewerDetails(details),
    removeInterviewerStatusAction: (id) => removeInterviewerStatus(id),
}
export default connect(mapStatetoProps, mapDispatchtoProps)(InterviewerComponent)
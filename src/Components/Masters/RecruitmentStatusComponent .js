import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux'

import { Formik, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";

import { getAllRecruitmentStatus, addNewRecruitmentStatus, updateSRecruitmentStatusTypeDetails, removeRecruitmentStatus, } from '../../Redux/Actions/Actions';

import DataTable from '../DataTable';
import SidebarComponent from '../SidebarComponent';
import NevbarComponent from '../NevbarComponent';

function RecruitmentStatusComponent({
    recruitmentStatusListProps, recruitmentStatusAddedProps, recruitmentStatusUpdatedProps, recruitmentStatusRemovedProps,
    getAllRecruitmentStatusAction, addNewRecruitmentStatusAction, updateSRecruitmentStatusAction, removeRecruitmentStatusAction, }) {

    const searchRef = useRef('');
    const [recruitmentStatusList, setRecruitmentStatusList] = useState(null);
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
        { Header: 'Recruitment Status', accessor: 'recruitment_status', },
        { Header: 'Status', accessor: 'status', },
        { Header: 'Action', accessor: 'action', },
    ];

    useEffect(() => {
        getAllRecruitmentStatusAction();
    }, [recruitmentStatusAddedProps, recruitmentStatusUpdatedProps, recruitmentStatusRemovedProps,])

    const formik = useFormik({
        initialValues: {
            skill: '',
            skill_type: '',
            status: true
        },
        validationSchema: Yup.object().shape({
            recruitmentStatus: Yup.string().required("Please enter Recruitment Status."),
            // status: Yup.string().required("Please status."),
        }),

        onSubmit: (values, { resetForm }) => {
            if (values?.id) {
                updateSRecruitmentStatusAction(values)
            }
            else {
                addNewRecruitmentStatusAction(values)
            }
            resetForm();
            setIsModelOpen(false);
        }
    });

    useEffect(() => {
        if (recruitmentStatusListProps) {
            let tempList = recruitmentStatusListProps.map(recruitmentStatus => {
                return {
                    "id": recruitmentStatus.id,
                    recruitment_status: recruitmentStatus.recruitment_status,
                    status: recruitmentStatus.status ? <h6 className='text-primary '>Active</h6> : <h6 className='text-danger'>Inactive</h6>,
                    action:
                        <div className="btn-group ">
                            <button type="button" className="btn btn-info btn-sm" onClick={() => { formik.setValues(recruitmentStatus) }}>Edit</button>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => onSkillTypeRemove(recruitmentStatus.id)}>Remove</button>

                        </div>
                }
            })
            setRecruitmentStatusList(tempList)
            setTableData(tempList)
        }
    }, [recruitmentStatusListProps])

    const onSkillTypeRemove = (id) => {
        removeRecruitmentStatusAction(id)
    }

    const onCloseModel = () => {
        setIsModelOpen(false);
    }

    const onSearchfilter = (event) => {
        if (event?.target?.value) { setTableData(recruitmentStatusList.filter(skill => skill.skill_type.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))); }
        else { setTableData(recruitmentStatusList); }
    }


    const onClearSearch = (event) => {
        searchRef.current.value = null;
        setTableData(recruitmentStatusList);
    }

    return (
        <>
            <NevbarComponent title={"Recruitment Status List"} breadcrumbPath={[{ link: 'recruitment_status', value: "Recruitment Status List" }]} />
            <SidebarComponent />
            <div className="content-wrapper">
                <div className="container-fluid px-5">
                    <div className="content-header row">
                        <h1 className="m-0 col-6">Skill List</h1>
                        <div className="form-group col-6">
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="text" className="form-control" name='search' ref={searchRef} placeholder="Search " onChange={onSearchfilter} />
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
                        <h2 >Skill Details</h2>
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
                                        <label htmlFor="skill" className="col-sm-2 col-form-label">Skill</label>
                                        <div className="col-sm-10">
                                            <input
                                                id="skill"
                                                name="skill"
                                                type="text"
                                                className={"form-control " + ((formik?.errors?.skill) ? " border-danger " : "") + " "}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.skill}
                                            />
                                            {formik.touched.skill && formik.errors.skill ? (
                                                <span className="text-danger">{formik.errors.skill}</span>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
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
                                    {formik.values.details?.id ?
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
        recruitmentStatusListProps: state?.getAllRecruitmentStatusReducer?.RecruitmentStatusList,
        recruitmentStatusAddedProps: state?.addRecruitmentStatusReducer?.RecruitmentStatusAdded,
        recruitmentStatusUpdatedProps: state?.updateRecruitmentStatusReducer?.RecruitmentStatusUpdated,
        recruitmentStatusRemovedProps: state?.removedRecruitmentStatusReducer?.RecruitmentStatusRemoved,

    }
}

const mapDispatchtoProps = {
    getAllRecruitmentStatusAction: () => getAllRecruitmentStatus(),
    addNewRecruitmentStatusAction: (details) => addNewRecruitmentStatus(details),
    updateSRecruitmentStatusAction: (details) => updateSRecruitmentStatusTypeDetails(details),
    removeRecruitmentStatusAction: (id) => removeRecruitmentStatus(id),
}
export default connect(mapStatetoProps, mapDispatchtoProps)(RecruitmentStatusComponent)
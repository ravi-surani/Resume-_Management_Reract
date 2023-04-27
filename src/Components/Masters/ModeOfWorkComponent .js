import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import { connect } from 'react-redux'

import { Formik, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";

import { getAllModeOfWorkStatus, addNewModeOfWorkStatus, updateModeOfWorkDetails, removeModeOfWorkStatus, } from '../../Redux/Actions/Actions';

import DataTable from '../DataTable';
import SidebarComponent from '../SidebarComponent';
import NevbarComponent from '../NevbarComponent';

function ModeOfWorkComponent({
    modeOfWorkListProp, modeOfWorkAddedProp, modeOfWorkUpdatedProp, modeOfWorkRemovedProp,
    getAllModeOfWorkStatusAction, addNewModeOfWorkStatusAction, updateModeOfWorkDetailsAction, removeModeOfWorkStatusAction, }) {

    const searchRef = useRef('');
    const [modeOfWorkList, setModeOfWorkList] = useState(null);
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
        { Header: 'Modes of Work', accessor: 'mode_of_work', },
        { Header: 'Status', accessor: 'status', },
        { Header: 'Action', accessor: 'action', },
    ];

    useEffect(() => {
        getAllModeOfWorkStatusAction();
    }, [modeOfWorkAddedProp, modeOfWorkUpdatedProp, modeOfWorkRemovedProp])

    const formik = useFormik({
        initialValues: {
            mode_of_work: '',
            status: true
        },
        validationSchema: Yup.object().shape({
            mode_of_work: Yup.string().required("Please enter Mode of Work."),
            // status: Yup.string().required("Please status."),
        }),

        onSubmit: (values, { resetForm }) => {
            if (values?.id) {
                updateModeOfWorkDetailsAction(values)
            }
            else {
                addNewModeOfWorkStatusAction(values)
            }
            resetForm();
            setIsModelOpen(false);
        }
    });

    useEffect(() => {
        if (modeOfWorkListProp) {
            let tempList = modeOfWorkListProp.map(modeOfWork => {
                return {
                    "id": modeOfWork.id,
                    mode_of_work: modeOfWork.mode_of_work,
                    status: modeOfWork.status ? <h6 className='text-primary '>Active</h6> : <h6 className='text-danger'>Inactive</h6>,
                    action:
                        <div className="btn-group ">
                            <button type="button" className="btn btn-info btn-sm" onClick={() => {
                                formik.setValues(modeOfWork)
                                setIsModelOpen(true);
                            }}>Edit</button>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => onSkillTypeRemove(modeOfWork.id)}>Remove</button>

                        </div>
                }
            })
            setModeOfWorkList(tempList)
            setTableData(tempList)
        }
    }, [modeOfWorkListProp])

    const onSkillTypeRemove = (id) => {
        removeModeOfWorkStatusAction(id)
    }

    const onCloseModel = () => {
        setIsModelOpen(false);
    }

    const onSearchfilter = (event) => {
        if (event?.target?.value) { setTableData(modeOfWorkList.filter(modeOfWork => modeOfWork.mode_of_work.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))); }
        else { setTableData(modeOfWorkList); }
    }

    const onClearSearch = (event) => {
        searchRef.current.value = null;
        setTableData(modeOfWorkList);
    }

    return (
        <>
            <NevbarComponent title={"Mode of Work List"} breadcrumbPath={[{ link: 'modeofwork', value: "Mode of Work List" }]} />
            <SidebarComponent />
            <div className="content-wrapper">
                <div className="container-fluid px-5">
                    <div className="content-header row">
                        <h1 className="m-0 col-6">Mode of Work List</h1>
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
                                        <label htmlFor="mode_of_work" className="col-sm-3 col-form-label">Mode of Work</label>
                                        <div className="col-sm-9">
                                            <input
                                                id="mode_of_work"
                                                name="mode_of_work"
                                                type="text"
                                                className={"form-control " + ((formik?.errors?.mode_of_work) ? " border-danger " : "") + " "}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.mode_of_work}
                                            />
                                            {formik.touched.mode_of_work && formik.errors.mode_of_work ? (
                                                <span className="text-danger">{formik.errors.mode_of_work}</span>
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
        modeOfWorkListProp: state?.getAllModeOfWorkReducer?.ModeOfWorkList,
        modeOfWorkAddedProp: state?.addModeOfWorkReducer?.ModeOfWorkAdded,
        modeOfWorkUpdatedProp: state?.updateModeOfWorkReducer?.ModeOfWorkUpdated,
        modeOfWorkRemovedProp: state?.removedModeOfWorkReducer?.ModeOfWorkRemoved,

    }
}

const mapDispatchtoProps = {
    getAllModeOfWorkStatusAction: () => getAllModeOfWorkStatus(),
    addNewModeOfWorkStatusAction: (details) => addNewModeOfWorkStatus(details),
    updateModeOfWorkDetailsAction: (details) => updateModeOfWorkDetails(details),
    removeModeOfWorkStatusAction: (id) => removeModeOfWorkStatus(id),
}
export default connect(mapStatetoProps, mapDispatchtoProps)(ModeOfWorkComponent)
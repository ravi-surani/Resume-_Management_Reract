import React, { useEffect, useRef, useState } from 'react'
import SidebarComponent from '../SidebarComponent';
import { connect } from 'react-redux'
import { Formik, useFormik, useFormikContext, validateYupSchema } from "formik";
import DataTable from '../DataTable';
import * as Yup from "yup";
import Modal from 'react-modal';

import { getAllSkillType, getAllSkill, addNewSkill, updateSkillDetails, removeSkill, } from '../../Redux/Actions/Actions';

import NevbarComponent from '../NevbarComponent';

function SkillComponent({ skillsTypeListProp, skillListProp, newSkillAddedProp, skillUpdatedProp, skillRemovedProp,
    getAllSkillTypeAction, getAllSkillAction, addNewSkillAction, updateSkillDetailsAction, removeSkillAction, }) {

    const searchRef = useRef('');
    const [skillTypeList, setSkillTypeList] = useState(null);
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
        { Header: 'Skill', accessor: 'skill', },
        { Header: 'Skill Type', accessor: 'skill_type_id', },
        { Header: 'Status', accessor: 'status', },
        { Header: 'Action', accessor: 'action', },
    ];

    useEffect(() => {
        getAllSkillAction();
        getAllSkillTypeAction();
    }, [newSkillAddedProp, skillUpdatedProp, skillRemovedProp,])

    const formik = useFormik({
        initialValues: {
            skill: '',
            skill_type_id: '',
            status: true
        },
        validationSchema: Yup.object().shape({
            skill: Yup.string().required("Please enter Skill."),
            skill_type_id: Yup.string().required("Please Select Skill Type.").nullable(),
            // status: Yup.string().required("Please status."),
        }),
        onSubmit: (values, { resetForm }) => {
            if (values?.id) {
                updateSkillDetailsAction(values)
            }
            else {
                addNewSkillAction(values)
            }
            resetForm();
            setIsModelOpen(false);
        }
    });

    useEffect(() => {
        if (skillListProp) {
            let tempList = skillListProp.map(skill => {

                return {
                    "id": skill.id,
                    skill: skill.skill,
                    skill_type_id: skill?.skill_type?.skill_type,
                    status: skill.status ? <h6 className='text-primary '>Active</h6> : <h6 className='text-danger'>Inactive</h6>,
                    action:
                        <div className="btn-group ">
                            <button type="button" className="btn btn-info btn-sm" onClick={() => { onSetUpdateValue(skill) }}>Edit</button>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => onSkillTypeRemove(skill.id)}>Remove</button>
                        </div>
                }
            })
            setSkillTypeList(tempList)
            setTableData(tempList)
        }
    }, [skillListProp])

    const onSetUpdateValue = (skill) => {
        formik.setValues({ "id": skill.id, "skill": skill.skill, "skill_type_id": skill.skill_type_id, "status": skill.status });
        setIsModelOpen(true)
    }

    const onSkillTypeRemove = (id) => {
        removeSkillAction(id)
    }

    const onCloseModel = () => {
        setIsModelOpen(false);
    }

    const onSearchfilter = (event) => {
        if (event?.target?.value) { setTableData(skillTypeList.filter(skill => skill.skill_type_id.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))); }
        else { setTableData(skillTypeList); }
    }

    const onClearSearch = (event) => {
        searchRef.current.value = null;
        setTableData(skillTypeList);
    }


    return (
        <>
            <NevbarComponent title={"Skills List"} breadcrumbPath={[{ link: 'skills', value: "Skill List" }]} />
            <SidebarComponent />
            <div className="content-wrapper">
                <div className="container-fluid px-5">
                    <div className="content-header row">
                        <h1 className="m-0 col-6">Skill List</h1>
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
                                        <label htmlFor="skill" className="col-sm-2 col-form-label">Skill Type</label>
                                        <div className="col-sm-10">
                                            <select
                                                id="skill_type_id"
                                                className={"form-control " + ((formik?.errors?.skill_type_id) ? " border-danger " : "") + " "}
                                                name='skill_type_id'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}>
                                                <option disabled selected='selected'>Select </option>
                                                {skillsTypeListProp.map(skillsType =>
                                                    <option value={skillsType.id} selected={formik?.values?.skill_type_id == skillsType.id ? true : false} >{skillsType.skill_type} </option>
                                                )}
                                            </select>
                                            {formik.touched.skill_type_id && formik.errors.skill_type_id ? (
                                                <span className="text-danger">{formik.errors.skill_type_id}</span>) : null}
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
        skillsTypeListProp: state?.getAllSkillTypeReducer?.skillsTypeList,
        skillListProp: state?.getAllSkillReducer?.skillsList,
        newSkillAddedProp: state?.addSkillReducer?.newSkillAdded,
        skillUpdatedProp: state?.updateSkillReducer?.skillUpdated,
        skillRemovedProp: state?.removedSkillReducer?.skillRemoved,
    }
}

const mapDispatchtoProps = {
    getAllSkillTypeAction: () => getAllSkillType(),
    getAllSkillAction: () => getAllSkill(),
    addNewSkillAction: (details) => addNewSkill(details),
    updateSkillDetailsAction: (details) => updateSkillDetails(details),
    removeSkillAction: (id) => removeSkill(id),
}
export default connect(mapStatetoProps, mapDispatchtoProps)(SkillComponent)
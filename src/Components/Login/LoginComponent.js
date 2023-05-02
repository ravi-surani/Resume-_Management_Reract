import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


import { userLogin } from '../../Redux/Actions/Actions';
import { connect } from 'react-redux';
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { loginAction } from '../../ReduxNew/Auth/loginAction';
import { useState } from 'react';
import { showToastMessageSuccess } from '../../helper';

function LoginComponent({ userDetailsProps, dispatchLogin }) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const formikForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
            password: Yup.string().required("Password is required"),
        }),

        onSubmit: async(values, { setStatus, setSubmitting }) => {
            setLoading(true);
            dispatchLogin(values, navigate);
        }
    });
    

    useEffect(() => {
        if (!userDetailsProps && localStorage.getItem('login_user')?.length) {
            navigate('/');
        }
    }, [])


    return (
        <div className='hold-transition login-page'>
            <div className="login-box">
                <div className="login-logo">
                    <h5 > Resume Management</h5>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        <Formik
                            initialValues={formikForm.initialValues}
                            enableReinitialize={true}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={values => { formikForm.handleSubmit(values) }}>
                            {props => (
                                <form onSubmit={props.handleSubmit}>

                                    <div className=" mb-3">

                                        <input
                                            id="email"
                                            name="email"
                                            placeholder='Email '
                                            type="email"
                                            className={"form-control "}
                                            onChange={formikForm.handleChange}
                                            onBlur={formikForm.handleBlur}
                                            value={formikForm.values.email}
                                        />
                                        {formikForm.touched.email && formikForm.errors.email ? (
                                            <span className="text-danger">{formikForm.errors.email}</span>
                                        ) : null}


                                    </div>
                                    <div className=" mb-3">
                                        <input
                                            id="password"
                                            name="password"
                                            placeholder='Password '
                                            type="password"
                                            className={"form-control "}
                                            onChange={formikForm.handleChange}
                                            onBlur={formikForm.handleBlur}
                                            value={formikForm.values.password}
                                        />
                                        {formikForm.touched.password && formikForm.errors.password ? (
                                            <span className="text-danger">{formikForm.errors.password}</span>
                                        ) : null}

                                    </div>
                                    <div >
                                        <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )

}

const mapStatetoProps = (state) => {
    return {
        userDetailsProps: state?.loginUserReducer?.userDetails,
    }
}

const mapDispatchtoProps = {
    dispatchLogin: (details, callback) => loginAction(details, callback),
    userLoginAction: (details) => userLogin(details),
}
export default connect(mapStatetoProps, mapDispatchtoProps)(LoginComponent)



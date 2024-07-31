import React, { useContext, useEffect, useState } from 'react';
import verifyCss from './verify.module.css'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Authentication/Authentication';
import axios from 'axios';
import { useFormik } from 'formik';

export default function VerifyCode() {
    const { userEmail, baseUrl } = useContext(authContext)
    const navigate = useNavigate()
    let user = {
        forgetCode: "",
        email: userEmail
    }
    const [correctCode, setCorrectCode] = useState(null);
    const [inValidCode, setInValidCode] = useState(null);
    const [reCode, setReCode] = useState(null)
    const [noReCode, setNoReCode] = useState(null)

    async function verifyCode(values) {
        try {
            const { data } = await axios.patch(`${baseUrl}/auth/coderesetPass/email`, values)
            if (data.Message === "The code you entered is correct") {
                setCorrectCode(data.Message)
                navigate('/Reset-Password')
            }

        } catch (err) {
            setInValidCode(err.response.data.message)
        }
    }
    async function resendCode() {
        try {
            const { data } = await axios.patch(`${baseUrl}/auth/reconfirmResetPass/email`, { email: userEmail })
            if (data.Message === "check inbox !") {
                setInValidCode(null)
                setReCode("check inbox !")
            }

        } catch (err) {
            setNoReCode(err.response.data.message)
        }
    }
    const formikObj = useFormik({
        initialValues: user,
        onSubmit: verifyCode,
        validate: function (values) {
            setReCode(null)
            setInValidCode(null)

            const errors = {};
            if (!values.forgetCode.match(/^[0-9]{4}$/)) {
                errors.forgetCode = "Please enter four digits";
            }
            return errors;
        }
    })

    return <>
        <section className={`${verifyCss.background} forget d-flex justify-content-center align-items-center vh-100`}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={formikObj.handleSubmit}>
                            <div className={`${verifyCss.layer} content d-flex justify-content-center align-items-center flex-column py-5 rounded-5`}>
                                <div className="logo w-50 text-center opacity-50">
                                    <img className="w-50 rounded-5" src="Images/logo.png" alt="" />
                                </div>
                                <div className="text w-50 mt-3 d-flex justify-content-center align-items-center flex-column">
                                    <h2 className="text-black h2">Forget your password?</h2>
                                    <p className="text-light">Do not Worry about your account :) Code was sent to you</p>
                                </div>
                                <div className="input w-50 my-2 d-flex justify-content-center">
                                    <div className="input-group flex-nowrap w-50">
                                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.forgetCode} type="tel" maxLength="4" className="form-control rounded-5 opacity-75 text-center fs-4"
                                            id='forgetCode' placeholder="4-digit code" aria-label="Password" aria-describedby="addon-wrapping" />
                                    </div>

                                </div>
                                {correctCode ? <div className='alert alert-danger w-25 rounded-5 p-2 text-center fw-medium m-auto mb-3'>{correctCode}</div> : ""}
                                {inValidCode ? <div className='alert alert-danger w-25 rounded-5 p-2 text-center fw-medium m-auto mb-3'>{inValidCode}</div> : ""}
                                {reCode ? <div className='alert alert-success w-25 rounded-5 p-2 text-center fw-medium m-auto mb-3'>{reCode}</div> : ""}
                                {noReCode ? <div className='alert alert-danger w-25 rounded-5 p-2 text-center fw-medium m-auto mb-3'>{noReCode}</div> : ""}
                                {formikObj.errors.forgetCode && formikObj.touched.forgetCode ? <div className='alert alert-danger rounded-5 mb-3 fw-light h-25 py-1 m-0 d-flex justify-content-center align-items-center'>{formikObj.errors.forgetCode}</div> : ""}
                                <span className="text-white">this code expires in <span className="text-danger">5 minutes</span></span>

                                <div className="w-25 text-center my-3 d-flex align-items-center flex-column">
                                    <button onClick={function () { verifyCode() }} type='submit' className="text-center w-50 m-auto btn btn-light opacity-75 rounded-5 mb-3">Verify Code</button>
                                    <button onClick={function () { resendCode() }} type='submit' className="text-center w-50 m-auto btn btn-light opacity-75 rounded-5 mb-3">Resend Code</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}

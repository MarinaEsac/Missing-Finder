import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import verificationCss from './verification.module.css';
import axios from 'axios';
import { authContext } from '../../Authentication/Authentication';
import { useFormik } from 'formik';
import { ThreeDots } from 'react-loader-spinner';

export default function Verification() {
    const navigate = useNavigate();

    const { userToken, baseUrl } = useContext(authContext)
    let user = {
        activationCode: "",
    }
    const [successMsg, setSuccessMsg] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const [isloading, setIsLoading] = useState(false)
    const [reSend, setReSend] = useState(null)
    const [noResend, setNoResend] = useState(null)

    async function activeAccount(values) {
        setIsLoading(true);
        try {
            const { data } = await axios.post(`${baseUrl}/auth/activateAccount`, values, {
                headers: { token: userToken }
            })
            if (data.Message === "Done Account Active go to login") {
                setReSend(null)
                setSuccessMsg("Done Account Active go to login")
                setTimeout(function () {
                    navigate('/LogIn')
                }, 1000)
            }
        }
        catch (err) {
            setReSend(null)
            setErrMsg("The verification code is In-valid")
        }
        setIsLoading(false)
    }
    async function resendCode() {
        try {
            const { data } = await axios.post(`${baseUrl}/auth/ReconfirmAccountActivation`, "", {
                headers: { token: userToken }
            })
            if (data.success === true) {
                setErrMsg(null)
                setReSend(data.Message);
            }
        } catch (err) {
            setErrMsg(null)
            setNoResend(err.response.data.message);
        }
    }
    const formikObj = useFormik({
        initialValues: user,
        onSubmit: activeAccount,

        validate: function (values) {
            setErrMsg(null)
            const errors = {};
            if (!values.activationCode.match(/^[0-9]{4}$/)) {
                errors.activationCode = "Please enter four digits";
            }
            return errors;
        }
    })
    return <>
        <form onSubmit={formikObj.handleSubmit} className='bg-danger w-100' >
            <section className={`${verificationCss.background} verification d-flex justify-content-center align-items-center vh-100`}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className={`${verificationCss.layer} d-flex justify-content-center align-items-center flex-column py-5 rounded-5`}>
                                <div className="logo w-50 text-center opacity-50">
                                    <img className="w-50 rounded-5" src={require('../../Images/logo.png')} alt="" />
                                </div>
                                <p className="text-white fs-6 mt-4">Enter the confirmation code from the text message</p>
                                <p className="text-dark fs-6 fw-bold mb-3">Enter the code in the SMS sent to your email (Egypt)</p>

                                <div className="input w-25 d-flex justify-content-center align-items-center flex-column ">
                                    <label className="text text-white mb-1">Your Verification Code</label>
                                    <div className="input-group mb-3 w-75">
                                        <input onBlur={formikObj.handleBlur} value={formikObj.values.activationCode} onChange={formikObj.handleChange} type="tel" maxLength={4} className="form-control text-center rounded-5 opacity-75 fs-5" placeholder="4-digit code"
                                            id='activationCode' aria-label="email" aria-describedby="addon-wrapping" />
                                    </div>
                                    {formikObj.errors.activationCode && formikObj.touched.activationCode ? <div className='alert alert-danger rounded-5 mb-3 fw-light h-25 py-1 m-0 d-flex justify-content-center align-items-center'>{formikObj.errors.activationCode}</div> : ""}
                                    {successMsg ? <div className='alert alert-success w-100 text-center fw-medium m-auto mb-3'>{successMsg}</div> : ""}
                                    {errMsg ? <div className='alert alert-danger w-100 text-center fw-medium m-auto mb-3'>{errMsg}</div> : ""}
                                    {noResend ? <div className='alert alert-danger w-100 text-center fw-medium m-auto mb-3'>{noResend}</div> : ""}
                                    {reSend ? <div className='alert alert-success w-100 text-center fw-medium m-auto mb-3'>{reSend}</div> : ""}
                                </div>
                                <div className="btns w-25 d-flex justify-content-center flex-column text-center">
                                    <button type='submit' className="text-center w-50 m-auto btn btn-light opacity-75 rounded-5 mb-3"> {isloading ? <ThreeDots
                                        visible={true}
                                        height="20"
                                        width="110"
                                        color="#4fa94d"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    /> : `Sign In`}</button>
                                    <button onClick={function () { resendCode() }} type='submit' className="text-center w-50 m-auto btn btn-light opacity-75 rounded-5 mb-3">Resend Code</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    </>
}

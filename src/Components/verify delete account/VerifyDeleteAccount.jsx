import React, { useContext, useEffect, useState } from 'react';
import verifyDeleteCss from './verifyDelete.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { authContext } from './../../Authentication/Authentication';

export default function VerifyCode() {
    const {baseUrl} = useContext(authContext)
    const navigate = useNavigate()
    const auth = localStorage.getItem('auth');
    const [setLoginToken] = useState(null);
    
    let user = {
        code: "",
    }
    const [correctCode, setCorrectCode] = useState(null);
    const [inValidCode, setInValidCode] = useState(null);
    const [reCode, setReCode] = useState(null)
    const [noReCode, setNoReCode] = useState(null)

    async function verifyCode(values) {
        try {
            const { data } = await axios.post(`${baseUrl}/user/deleteAccount`, values, {
                headers: { authorization: auth }
            })
            if (data.success === true) {
                setTimeout(() => {
                    navigate('/signUp')
                }, 1200)
                setCorrectCode(data.Message);
                localStorage.removeItem('auth')
                localStorage.removeItem('info')
                localStorage.removeItem('tkn')
                setLoginToken(null)
            }

        } catch (err) {
            setInValidCode("The code is incorrect")
        }
    }
    async function resendCode() {
        try {
            const { data } = await axios.patch(`${baseUrl}/user/resendCodeDeleteAccount`, "", {
                headers: { authorization: auth }
            })
            if (data.Message === "check inbox !") {
                setInValidCode(null)
                setReCode("check inbox !")
                console.log(data.message);
            }

        } catch (err) {
            setNoReCode(err.response.data.message)
            console.log(err.response.data.message);
        }
    }
    const formikObj = useFormik({
        initialValues: user,
        onSubmit: verifyCode,
        validate: function (values) {
            setReCode(null)
            setInValidCode(null)
            const errors = {};
            if (!values.code.match(/^[0-9]{4}$/)) {
                errors.code = "Please enter four digits";
            }
            return errors;
        }
    })
    return <>
        <section className={`${verifyDeleteCss.background} forget d-flex justify-content-center align-items-center vh-100`}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={formikObj.handleSubmit}>
                            <div className={`${verifyDeleteCss.layer} content d-flex justify-content-center align-items-center flex-column py-5 rounded-5`}>
                                <div className="logo w-50 text-center opacity-50">
                                    <img className="w-50 rounded-5" src="Images/logo.png" alt="" />
                                </div>
                                <div className="text w-50 mt-3 d-flex justify-content-center align-items-center flex-column text-center">
                                    <h3 className="text-black">"Do you want to delete your account?"</h3>
                                    <p className="text-light">"Please enter the code that was sent to your email." <br /> You cannot undo after entering the code.</p>
                                </div>
                                <div className="input w-50 my-2 d-flex justify-content-center">
                                    <div className="input-group flex-nowrap w-50">
                                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.code} type="tel" maxLength="4" className="form-control rounded-5 opacity-75 text-center fs-4"
                                            id='code' name='code' placeholder="4-digit code" aria-label="Password" aria-describedby="addon-wrapping" />
                                    </div>
                                </div>
                                {correctCode ? <div className='alert alert-success w-25 rounded-5 p-2 text-center fw-medium m-auto mb-3'>{correctCode}</div> : ""}
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

import React, { useContext, useState } from 'react'
import forgetCss from './forget.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../Authentication/Authentication';
import axios from 'axios';
import { useFormik } from 'formik';
import { ThreeDots } from 'react-loader-spinner';

export default function ForgetPassword() {
    const { setUserEmail, setLoginToken, baseUrl } = useContext(authContext);
    const navigate = useNavigate();

    let user = {
        email: ""
    }
    const [checkInbox, setCheckInbox] = useState(null)
    const [forgetErr, setCheckErr] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    async function forgetPassword(values) {
        setIsLoading(true);
        try {
            setIsLoading(true)
            const { data } = await axios.post(`${baseUrl}/auth/forgetcode/email`, values)
            if (data.Message === "check inbox !") {
                setCheckInbox(data.Message)
                setUserEmail(values.email)
                localStorage.removeItem('auth');
                localStorage.removeItem('info');
                setLoginToken(null);
                localStorage.setItem("email", values.email)
                setTimeout(function () {
                    navigate("/Verify-code")
                }, 1000)
            }
        } catch (err) {
            setCheckErr(err.response.data.message)
        }
        setIsLoading(false)
    }
    const formikObj = useFormik({
        initialValues: user,
        onSubmit: forgetPassword,
        validate: function (values) {
            setCheckErr(null)
            const errors = {};

            if (!values.email.match(/^[a-zA-Z0-9]{3,50}@[a-zA-Z]+\.(com|net)$/)) {
                errors.email = "Please enter a valid email address";
            }
            return errors;
        }
    })
    return <>
        <section className={`${forgetCss.background}email d-flex justify-content-center align-items-center vh-100`}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={formikObj.handleSubmit}>
                            <div className={`${forgetCss.content} d-flex justify-content-center align-items-center flex-column py-5 rounded-5`}>
                                <div className="logo w-50 text-center opacity-50">
                                    <img className="w-50 rounded-5" src="Images/logo.png" alt="" />
                                </div>
                                <div className="text w-50 mt-3 d-flex justify-content-center align-items-center flex-column">
                                    <h2 className="text-black">Forget your password?</h2>
                                    <p className="text-light">Enter the email address to get code reset Your password
                                    </p>
                                </div>
                                <div className="input w-50 mt-2">
                                    <div className="input-group flex-nowrap">
                                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type="email" className="form-control rounded-5 opacity-75" placeholder="Email addess"
                                            id='email' aria-label="email" aria-describedby="addon-wrapping" />
                                    </div>
                                    {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger w-75 mt-2 text-center rounded-3 p-2 m-auto'>{formikObj.errors.email}</div> : ""}
                                    {checkInbox ? <div className='alert alert-success w-75 mt-2 text-center rounded-3 p-2 m-auto'>{checkInbox}</div> : ""}
                                    {forgetErr ? <div className='alert alert-danger w-75 mt-2 text-center rounded-3 p-2 m-auto'>{forgetErr}</div> : ""}
                                </div>
                                <div
                                    className="flex-nowrap icons w-75 mt2 d-flex justify-content-center align-items-center mt-1">
                                    <Link className="text-black" to={"#"} data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to="0" aria-label="Slide 1"><i
                                            className="fa-solid fa-envelope bg-body-secondary p-2 rounded-5 m-3"></i></Link>
                                </div>
                                <div className="login-btn w-50 text-center">
                                    <button type='submit' className="text-white btn btn-outline-dark"> {isLoading ? <ThreeDots
                                        visible={true}
                                        height="30"
                                        width="60"
                                        color="#4fa94d"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    /> : `Countinue`}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}

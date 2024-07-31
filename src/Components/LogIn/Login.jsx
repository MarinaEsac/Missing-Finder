import React, { useContext, useState } from 'react';
import loginCss from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { authContext } from '../../Authentication/Authentication';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
    const { setLoginToken, setUserInfo, userInfo, baseUrl } = useContext(authContext);
    const navigate = useNavigate();

    let user = {
        loginKey: "",
        password: "",
    }
    const [successMsg, setsuccessMsg] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const [isloading, setisloading] = useState(false)

    async function loginToAccount(values) {
        setisloading(true);
        try {
            const { data } = await axios.post(`${baseUrl}/auth/login`, values)
            if (data.success === true) {
                setsuccessMsg("Go to home page")
                localStorage.setItem('auth', `zaki__${data.auth}`)
                localStorage.setItem('info', JSON.stringify(jwtDecode(data.auth)))
                setUserInfo(jwtDecode(data.auth))
                setLoginToken(`zaki__${data.auth}`);
                console.log(userInfo.id);
                setTimeout(() => {
                    navigate("/home")
                }, 1200);
            }
        }
        catch (err) {
            setErrMsg(err.response.data.message)
            if (err.response.data.message === 'unactivated account!') {
                setTimeout(() => {
                    navigate("/Verification-Account")
                }, 1000);
            }
        }
        setisloading(false)
    }
    const formikObj = useFormik({
        initialValues: user,
        onSubmit: loginToAccount,
        validate: function (values) {
            setErrMsg(null)
            const errors = {};
            if (!values.loginKey.match(/^[a-zA-Z0-9]{3,50}@[a-zA-Z]+\.(com|net)$/)) {
                errors.loginKey = "Please enter a valid email address";
            }
            if (!values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)) {
                errors.password = "Please enter a valid password"
            }
            return errors;
        },
    });
    const [visible, setVisible] = useState(null)

    return <>
        <form onSubmit={formikObj.handleSubmit}>
            <section className="login d-flex justify-content-center align-items-center vh-100">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className={`${loginCss.layer} content d-flex justify-content-center align-items-center flex-column py-5 rounded-5`}>
                                <div className="logo w-50 text-center opacity-50">
                                    <img className="w-50 rounded-5" src={require("../../Images/logo.png")} alt="" />
                                </div>
                                <h2 className="h3 text-white py-3">Welcome Back</h2>
                                <div className="inputs w-50">
                                    <div className="input-group flex-nowrap mb-3">
                                        <span className={`${loginCss.inputs} d-flex align-items-center`} id="addon-wrapping"><i
                                            className="fa-solid fa-envelope bg-body-secondary p-2 me-2 rounded-5"></i></span>
                                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.loginKey} type="email" className={`${loginCss.inputcolor} rounded-5`}
                                            id='loginKey' placeholder="Enter your E-Mail" />
                                    </div>
                                    {formikObj.errors.loginKey && formikObj.touched.loginKey ? <div className='alert alert-danger rounded-3 w-75 m-auto p-2 text-center'>{formikObj.errors.loginKey}</div> : ""}
                                    <div className="input-group flex-nowrap mt-3 mb-3 position-relative">
                                        <span className={`${loginCss.inputs} d-flex align-items-center`} id="addon-wrapping"><i
                                            className="fa-solid fa-lock bg-body-secondary p-2 me-2 rounded-5"></i></span>
                                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} type={visible ? 'text' : 'password'} autoComplete={"No password"} className={`${loginCss.inputcolor}  rounded-5`}
                                            id='password' placeholder="Enter your Password" />
                                        <div onClick={() => setVisible(!visible)}>{visible ? <div className='position-absolute top-2 end-0 mt-2 me-3 text-success'><i className="fa-solid fa-unlock"></i></div> : <div className='position-absolute top-0 end-0 mt-2 me-3 text-dark'><i className="fa-solid fa-lock"></i></div>}
                                        </div>
                                    </div>
                                    {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger rounded-3 mt-2 p-2 text-center w-75 m-auto'>{formikObj.errors.password}</div> : ""}
                                </div>
                                <div className="forget-password w-50 text-end mb-4">
                                    <Link className="text-light" to={"/Forget-Password"}>Forget Password</Link>
                                </div>
                                <div className="login-btn w-25 text-center">
                                    <button type='submit' className="text-decoration-none text-white btn btn-outline-dark"> {isloading ? <ThreeDots
                                        visible={true}
                                        height="30"
                                        width="60"
                                        color="#4fa94d"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClassclassName=""
                                    /> : `Login`}</button>
                                </div>
                                <div className="remember-me w-50 mb-3">
                                    <span className="text-light"><input type="checkbox" /> Remember me</span>
                                </div>
                                {errMsg ? <div className='alert alert-danger w-25 text-center fw-medium'>{errMsg}</div> : ""}
                                {successMsg ? <div className='alert alert-success w-25 text-center fw-medium'>{successMsg}</div> : ""}
                                <span className="text-white">Don't have an account? <Link className="text-danger text-decoration-none"
                                    to={"/signUp"}>sign up</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    </>
}

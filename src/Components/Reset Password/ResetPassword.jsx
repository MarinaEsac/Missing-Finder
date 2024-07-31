import React, { useContext, useState } from 'react';
import resestPassCss from './resetPass.module.css';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Authentication/Authentication';
import axios from 'axios';
import { useFormik } from 'formik';
import { ThreeDots } from 'react-loader-spinner';

export default function ResetPassword() {
    const { userEmail, baseUrl } = useContext(authContext);
    const navigate = useNavigate();
    
    let user = {
        email: userEmail,
        password: "",
        confirmPassword: ""
    }
    const [resetPass, setResetPassword] = useState(null)
    const [isloading, setisloading] = useState(false)
    const [visible, setVisible] = useState(null)
    const [confirmVisible, setConfirmVisible] = useState(null)

    async function resetPassword(values) {
        try {
            setisloading(true);
            const { data } = await axios.patch(`${baseUrl}/auth/resetPass/email`, values)
            if (data.Message === "Done") {
                setResetPassword("Password has been successfully renewed.")
                setTimeout(() => {
                    navigate("/LogIn")
                }, 1000);
            }
        } catch (err) {
        }
        setisloading(false);

    }
    const formikObj = useFormik({
        initialValues: user,
        onSubmit: resetPassword,

        validate: function (values) {
            const errors = {};

            if (!values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)) {
                errors.password = "Please enter a strong password that contains lowercase & uppercase letters and numbers"
            }

            if (values.confirmPassword !== values.password) {
                errors.confirmPassword = "Password and confirm password don't match"
            }
            return errors;
        }
    })
    return <>
        <section className="resret-password d-flex justify-content-center align-items-center vh-100">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className={`${resestPassCss.layer} content d-flex justify-content-center align-items-center flex-column py-5 rounded-5`}>
                            <div className="logo w-50 text-center opacity-50">
                                <img className="w-50 rounded-5" src="Images/logo.png" alt="" />
                            </div>
                            <h2 className="h2 text-black mb-4">Reset Your Password</h2>
                            <form onSubmit={formikObj.handleSubmit} className='w-100 d-flex justify-content-center align-items-center flex-column'>
                                <div className="inputs w-50 d-flex justify-content-center flex-column align-items-center">
                                    <div className="mb-2 position-relative w-75">
                                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange}   type={visible ? 'text' : 'password'} autoComplete={"No password"} className={`${resestPassCss.inputcolor} form-control rounded-5`}
                                            id='password' placeholder="Enter New Password" />
                                        <div onClick={() => setVisible(!visible)}>{visible ? <div className='position-absolute top-0 end-0 mt-1 me-3 text-success'><i className="fa-solid fa-unlock"></i></div> : <div className='position-absolute top-0 end-0 mt-1 me-3 text-dark'><i className="fa-solid fa-lock"></i></div>}
                                        </div>
                                        {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger rounded-3 mt-2 p-2 text-center'>{formikObj.errors.password}</div> : ""}
                                    </div>
                                    <div className="mb-4 position-relative w-75">
                                        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.confirmPassword} type={confirmVisible ? 'text' : 'password'} autoComplete={"No password"} className={`${resestPassCss.inputcolor} form-control rounded-5`}
                                            id='confirmPassword' placeholder="Confirm New Password" />
                                        <div onClick={() => setConfirmVisible(!confirmVisible)}>{confirmVisible === true ? <div className='position-absolute top-0 end-0 mt-1 me-3 text-success'><i className="fa-solid fa-unlock"></i></div> : <div className='position-absolute top-0 end-0 mt-1 me-3 text-dark'><i className="fa-solid fa-lock"></i></div>}
                                        </div>
                                        {formikObj.errors.confirmPassword && formikObj.touched.confirmPassword ? <div className='alert alert-danger rounded-3 mt-2 p-2 text-center'>{formikObj.errors.confirmPassword}</div> : ""}
                                    </div>
                                    {resetPass ? <div className='alert alert-success p-2 mb-3 rounded-3'>{resetPass}</div> : ""}

                                    {/* <div className="input-group flex-nowrap mb-4 w-75">
                                        <input value={formikObj.values.password} onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} type="password" className="form-control rounded-5 opacity-75" placeholder="Enter New Password" aria-label="password"
                                            id='password' aria-describedby="addon-wrapping" />
                                    </div>
                                    <div className="input-group flex-nowrap mb-3 w-75">
                                        <input value={formikObj.values.confirmPassword} onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} type="password" className="form-control rounded-5 opacity-75" placeholder="Confirm New Password" aria-label="Password"
                                            id='confirmPassword' aria-describedby="addon-wrapping" />
                                    </div> */}
                                </div>
                                <div className="btn w-25 text-center">
                                    <button type='submit' className="text-decoration-none text-white btn btn-outline-dark"> {isloading ? <ThreeDots
                                        visible={true}
                                        height="30"
                                        width="60"
                                        color="#4fa94d"
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    /> : `Reset Password`}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

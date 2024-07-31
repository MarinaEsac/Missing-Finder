import React, { useContext, useState } from 'react'
import changepassCss from "./changePassword.module.css"
import { ThreeDots } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from 'axios';
import { authContext } from '../../../Authentication/Authentication';

export default function ChangePassword() {
    const { baseUrl } = useContext(authContext)
    const [setLoginToken] = useState(null);
    const navigate = useNavigate()

    const [successMessage, setSuccessMessage] = useState(null)
    const [errMessage, setErrMessage] = useState(null)
    const [isloading, setisloading] = useState(false)
    const [visible, setVisible] = useState(null)
    const [visible2, setVisible2] = useState(null)
    const [confirmVisible, setConfirmVisible] = useState(null)

    const auth = localStorage.getItem('auth')
    const user = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };
    async function changePass(values) {
        setisloading(true);
        try {
            const { data } = await axios.patch(`${baseUrl}/user/changePass`, values, {
                headers: { authorization: auth }
            });
            if (data.success === true) {
                setErrMessage(null)
                setisloading(false)
                setTimeout(() => {
                    navigate('/login')
                }, 1200);
                setSuccessMessage("The password has been changed successfully")
                localStorage.removeItem('auth');
                localStorage.removeItem('info');
                localStorage.removeItem('tkn');
                setLoginToken(null);
            }
        } catch (err) {
            setErrMessage(err.response.data.message)
            console.log(errMessage);
        }
        setisloading(false)
    }
    const formikObj = useFormik({
        initialValues: user,
        onSubmit: changePass,
        validate: function (values) {
            setErrMessage(null)
            const errors = {};

            if (!values.currentPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)) {
                errors.currentPassword = "Please enter your password"
            }

            if (!values.newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)) {
                errors.newPassword = "Please enter a strong password that contains lowercase and uppercase letters, numbers, and symbols"
            }

            if (values.confirmPassword !== values.newPassword) {
                errors.confirmPassword = "Password and confirm password don't match"
            }
            return errors;
        }
    })
    return <>
        <form onSubmit={formikObj.handleSubmit} className='w-100 d-flex justify-content-center'>
            <div className='w-50 text-white'>
                <h3 className='mb-4'>Change your password</h3>
                <div className="mb-4 position-relative">
                    <input value={formikObj.values.currentPassword} onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} autoComplete='noPassword' type={visible ? 'text' : 'password'} className={`${changepassCss.inputcolor} form-control rounded-5`}
                        id='currentPassword' name='currentPassword' placeholder="Current Password" />
                    <div onClick={() => setVisible(!visible)}>{visible ? <div className='position-absolute top-0 end-0 mt-1 me-3 text-success'><i className="fa-solid fa-unlock"></i></div> : <div className='position-absolute top-0 end-0 mt-1 me-3 text-dark'><i className="fa-solid fa-lock"></i></div>}
                    </div>
                    {formikObj.errors.currentPassword && formikObj.touched.currentPassword ? <div className='alert alert-danger rounded-3 mt-2 p-2 text-center'>{formikObj.errors.currentPassword}</div> : ""}
                </div>
                <div className="mb-4 position-relative">
                    <input value={formikObj.values.newPassword} onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} autoComplete='noPassword2' type={visible2 ? 'text' : 'password'} className={`${changepassCss.inputcolor} form-control rounded-5`}
                        id='newPassword' name='newPassword' placeholder="New Password" />
                    <div onClick={() => setVisible2(!visible2)}>{visible2 ? <div className='position-absolute top-0 end-0 mt-1 me-3 text-success'><i className="fa-solid fa-unlock"></i></div> : <div className='position-absolute top-0 end-0 mt-1 me-3 text-dark'><i className="fa-solid fa-lock"></i></div>}
                    </div>
                    {formikObj.errors.newPassword && formikObj.touched.newPassword ? <div className='alert alert-danger rounded-3 mt-2 p-2 text-center'>{formikObj.errors.newPassword}</div> : ""}
                </div>
                <div className="mb-2 position-relative">
                    <input value={formikObj.values.confirmPassword} onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} autoComplete='noPassword' type={confirmVisible ? 'text' : 'password'} className={`${changepassCss.inputcolor} form-control rounded-5`}
                        id='confirmPassword' name='confirmPassword' placeholder="Confirm New Password" />
                    <div onClick={() => setConfirmVisible(!confirmVisible)}>{confirmVisible == true ? <div className='position-absolute top-0 end-0 mt-1 me-3 text-success'><i className="fa-solid fa-unlock"></i></div> : <div className='position-absolute top-0 end-0 mt-1 me-3 text-dark'><i className="fa-solid fa-lock"></i></div>}
                    </div>
                </div>
                {formikObj.errors.confirmPassword && formikObj.touched.confirmPassword ? <div className='alert alert-danger rounded-3 my-3 p-2 text-center'>{formikObj.errors.confirmPassword}</div> : ""}
                {errMessage ? <div className='m-auto w-75 alert-danger my-3 alert'>{errMessage}</div> : ""}
                {successMessage ? <div className='m-auto w-75 alert-success my-3 alert'>{successMessage}</div> : ""}
                <div className=" mb-4 text-start ms-2">
                    <Link to={"/Forget-Password"} className={`${changepassCss.linkstyle}`}>Forgotten Your Password?</Link>
                </div>
                <div>
                    <button type='submit' className="text-decoration-none text-white btn btn-outline-dark"> {isloading ? <ThreeDots
                        visible={true}
                        height="30"
                        width="60"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassclassName=""
                    /> : `Change Password`}</button>
                </div>
            </div>
        </form>
    </>
}
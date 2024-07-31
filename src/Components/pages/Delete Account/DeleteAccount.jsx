import React, { useContext, useState } from 'react'
import deleteCss from "./deleteAccount.module.css"
import { ThreeDots } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from 'axios';
import { authContext } from './../../../Authentication/Authentication';

export default function ChangePassword() {
    const { baseUrl } = useContext(authContext)
    const navigate = useNavigate()
    const auth = localStorage.getItem('auth')

    const [successMessage, setSuccessMessage] = useState(null)
    const [errMessage, setErrMessage] = useState(null)
    const [isloading, setisloading] = useState(false)
    const [confirmVisible, setConfirmVisible] = useState(null)

    const user = {
        email: "",
        password: "",
    };
    async function deleteAcc(values) {
        setisloading(true);
        try {
            const { data } = await axios.patch(`${baseUrl}/user/sendCodeDeleteAccount`, values, {
                headers: { authorization: auth }
            });
            if (data.success === true) {
                setErrMessage(null)
                setisloading(false)
                console.log(auth);
                setTimeout(() => {
                    navigate('/deletAccountCode')
                }, 1200);
                setSuccessMessage(data.Message)
            }
        } catch (err) {
            setErrMessage(err.response.data.message)
            console.log(errMessage);
        }
        setisloading(false)
    }
    const formikObj = useFormik({
        initialValues: user,
        onSubmit: deleteAcc,
        validate: function (values) {
            setErrMessage(null)
            const errors = {};
            if (!values.email.match(/^[a-zA-Z0-9]{3,50}@[a-zA-Z]+\.(com|net)$/)) {
                errors.email = "Please enter a valid email address";
            }
            if (!values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)) {
                errors.password = "Please enter your password"
            }
            return errors;
        }
    })
    return <>
        <form onSubmit={formikObj.handleSubmit} className='w-100 d-flex justify-content-center'>
            <div className='w-50 text-white'>
                <h4 className='mb-4 w-100'>If you delete your account, all your data and the reports you submitted in the system will be deleted</h4>
                <div className="mb-4 position-relative">
                    <input value={formikObj.values.email} onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} className={`${deleteCss.inputcolor} form-control rounded-5`}
                        id='email' name='email' placeholder="Enter Your Email" />
                    {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger rounded-3 mt-2 p-2 text-center'>{formikObj.errors.email}</div> : ""}
                </div>
                <div className="mb-2 position-relative">
                    <input value={formikObj.values.password} onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} type={confirmVisible ? 'text' : 'password'} className={`${deleteCss.inputcolor} form-control rounded-5`}
                        id='password' name='password' placeholder="Enter Your Password" />
                    <div onClick={() => setConfirmVisible(!confirmVisible)}>{confirmVisible == true ? <div className='position-absolute top-0 end-0 mt-1 me-3 text-success'><i className="fa-solid fa-unlock"></i></div> : <div className='position-absolute top-0 end-0 mt-1 me-3 text-dark'><i className="fa-solid fa-lock"></i></div>}
                    </div>
                </div>
                {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger rounded-3 my-3 p-2 text-center'>{formikObj.errors.password}</div> : ""}
                {errMessage ? <div className='m-auto w-75 alert-danger my-3 alert'>{errMessage}</div> : ""}
                {successMessage ? <div className='m-auto w-75 alert-success my-3 alert'>{successMessage}</div> : ""}
                <div>
                    <button type='submit' className="text-decoration-none text-white btn btn-outline-dark mt-4"> {isloading ? <ThreeDots
                        visible={true}
                        height="30"
                        width="60"
                        color="#4fa94d"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassclassName=""
                    /> : `Submit`}</button>
                </div>
            </div>
        </form>
    </>
}
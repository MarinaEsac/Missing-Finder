import React, { useContext, useState } from 'react';
import createCss from './create.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { authContext } from '../../Authentication/Authentication';
export default function SignUp() {
  const { setUserToken, baseUrl } = useContext(authContext);

  const navigate = useNavigate();
  let user = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: ""
  }
  const [successMsg, setsuccessMsg] = useState(null)
  const [errMsg, setErrMsg] = useState(null)
  const [isloading, setisloading] = useState(false)

  async function registerNewUser(values) {
    setisloading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/auth/register`, values)
      if (data.success === true) {
        setsuccessMsg("Activate Your Account Now");
        localStorage.setItem('tkn', data.token_Activate_Account)
        setUserToken(data.token_Activate_Account);
        setTimeout(function () {
          navigate('/Verification-Account');
        }, 1000)
      };
    } catch (err) {
      setErrMsg(err.response.data.message)
    }

    setisloading(false)
  }
  const formikObj = useFormik({
    initialValues: user,

    onSubmit: registerNewUser,

    validate: function (values) {
      setErrMsg(null)
      const errors = {};

      if (!values.firstName.match(/^[a-zA-Z]{3,20}$/)) {
        errors.firstName = "Please enter first name";
      }
      if (!values.lastName.match(/^[a-zA-Z]{3,20}$/)) {
        errors.lastName = "Please enter last name";
      }
      if (!values.email.match(/^[a-zA-Z0-9]{3,50}@[a-zA-Z]+\.(com|net)$/)) {
        errors.email = "Please enter a valid email address";
      }
      if (!values.phone.match(/^(010|011|012|015)\d{8}$/)) {
        errors.phone = "Please enter a phone number";
      }
      if (!values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)) {
        errors.password = "Please enter a valid password"
      }
      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Password and confirm password don't match"
      }
      if (!values.dateOfBirth) {
        errors.dateOfBirth = "Please Enter Date"
      }
      if (!values.gender) {
        errors.gender = "Please Enter gender"
      }
      return errors;
    },

  });
  const [visible, setVisible] = useState(null)
  const [confirmVisible, setConfirmVisible] = useState(null)

  return <>
    <header className="create-account" id="create-account">
      <div className="container">
        <div className="row align-item">
          <div className="col-md-6 vh-100 d-flex justify-content-center align-items-center">
            <div className="left-part text-white d-flex align-items-center flex-column">
              {errMsg || formikObj.errors.firstName && formikObj.touched.firstName || formikObj.errors.lastName && formikObj.touched.lastName || formikObj.errors.email && formikObj.touched.email || formikObj.errors.phone && formikObj.touched.phone || formikObj.errors.password && formikObj.touched.password || formikObj.errors.confirmPassword && formikObj.touched.confirmPassword || formikObj.errors.dateOfBirth && formikObj.touched.dateOfBirth || formikObj.errors.gender && formikObj.touched.gender ? <div className='alert alert-danger w-100 text-center fw-medium'>{errMsg || formikObj.errors.firstName || formikObj.errors.lastName || formikObj.errors.email || formikObj.errors.phone || formikObj.errors.password || formikObj.errors.confirmPassword || formikObj.errors.dateOfBirth || formikObj.errors.gender}</div> : ""}
              {successMsg ? <div className='alert alert-success w-100 text-center fw-medium'>{successMsg}</div> : ""}
              <div className={createCss.logo}>
                <h1><img src={require('../../Images/logo.png')} className="w-100 rounded-5" alt="" /></h1>
              </div>
              <p className={`${createCss.pstyle}`}>Welcome to missing finder <br />
                You need to read <Link to={"#"} className="text-decoration-none text-danger">about us</Link> first</p>
            </div>
          </div>
          <div className="col-md-6 vh-100 d-flex justify-content-center align-items-center">
            <div className="right-part text-white">
              <div className="create-account mb-3">
                <h2 className="mb-3 h1">Create a new account</h2>
                <span>Already a member? <Link to={"/login"} className="text-decoration-none text-danger">Log in</Link>
                </span>
              </div>
              <form onSubmit={formikObj.handleSubmit}>
                <div className="inputs">
                  <div className="first-2-inputs mb-4 d-flex justify-content-start">
                    <div className={`${createCss.first2Inputs}`}>
                      <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.firstName} type="text" className={`${createCss.inputcolor} form-control rounded-4`}
                        id='firstName' placeholder="First Name" />
                    </div>
                    <div className="second">
                      <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.lastName} type="text" className={`${createCss.inputcolor} form-control rounded-4`}
                        id='lastName' placeholder="Last Name" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type="email" className={`${createCss.inputcolor} form-control rounded-4`}
                      id='email' placeholder="E-Mail" />
                  </div>
                  <div className="mb-4">
                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} type="phone" className={`${createCss.inputcolor} form-control rounded-4`}
                      id='phone' placeholder="phone Number" />
                  </div>
                  <div className="mb-4 position-relative">
                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} type={visible ? 'text' : 'password'} autoComplete={"No password"} className={`${createCss.inputcolor} form-control rounded-4`}
                      id='password' placeholder="Password" />
                    <div onClick={() => setVisible(!visible)}>{visible ? <div className='position-absolute top-0 end-0 mt-1 me-3 text-success'><i className="fa-solid fa-unlock"></i></div> : <div className='position-absolute top-0 end-0 mt-1 me-3 text-dark'><i className="fa-solid fa-lock"></i></div>}
                    </div>
                  </div>
                  <div className="mb-4 position-relative">
                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.confirmPassword} type={confirmVisible ? 'text' : 'password'} autoComplete={"No password"} className={`${createCss.inputcolor} form-control rounded-4`}
                      id='confirmPassword' placeholder="Confirm Password" />
                    <div onClick={() => setConfirmVisible(!confirmVisible)}>{confirmVisible === true ? <div className='position-absolute top-0 end-0 mt-1 me-3 text-success'><i className="fa-solid fa-unlock"></i></div> : <div className='position-absolute top-0 end-0 mt-1 me-3 text-dark'><i className="fa-solid fa-lock"></i></div>}
                    </div>
                  </div>
                  <div className="mb-4">
                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.dateOfBirth} type="date" className={`${createCss.inputcolor} form-control rounded-4`}
                      id='dateOfBirth' placeholder="Date Of Birth" />
                  </div>
                  <div className="gender d-flex justify-content-center">
                    <span className="me-5">Gender</span>
                    <div className="form-check me-5">
                      <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value="Male" className="form-check-input p-2" type="radio" name="gender" id="Male" />
                      <label className="form-check-label" htmlFor="Male">Male</label>
                    </div>
                    <div className="form-check">
                      <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value="Female" className="form-check-input p-2" type="radio" name="gender" id="Female" />
                      <label className="form-check-label" htmlFor="Female">Female</label>
                    </div>
                  </div>
                </div>
                <div className="continue d-flex justify-content-end align-items-center mt-3">
                  <button type='submit' className="text-decoration-none text-white btn btn-dark"> {isloading ? <FallingLines color="#4fa94d" width="50" visible={true} ariaLabel="falling-circles-loading" /> : `Sign Up`}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  </>
}
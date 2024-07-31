import React, { useContext, useState } from 'react'
import settingsCss from "./settings.module.css"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { authContext } from '../../Authentication/Authentication'
import { ColorRing } from 'react-loader-spinner'

export default function Settings() {
    const { setLoginToken, userInfo } = useContext(authContext)
    const navigate = useNavigate()

    function logOut() {
        localStorage.removeItem('auth')
        localStorage.removeItem('MissingResult')
        localStorage.removeItem('FoundData')
        localStorage.removeItem('info')
        setLoginToken(null)
        setTimeout(() => {
            navigate("home")
        }, 1000);
    }
    return <>
        {userInfo === null ? <div className='bg-dark vh-100 d-flex justify-content-center align-items-center'>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClassclassName="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div> :
            <section className={`${settingsCss.bg} vh-100 d-flex justify-content-center align-items-center`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className={`${settingsCss.layer} d-flex rounded-5 py-4 px-2`}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className={`${settingsCss.sidebar} col-md-3 rounded-5 `}>
                                            <div className='text-center pt-5 pb-4'>
                                                <h4 className='pt-5'>{Array.from(userInfo.userName).slice(0, -2)}</h4>
                                                <h6 className='opacity-75'>{userInfo.email}</h6>
                                            </div>
                                            <div className="pb-4">
                                                <ul className="list-unstyled d-flex flex-column text-start">
                                                    <div className="settings text-white">
                                                        <div className={`${settingsCss.topli} d-flex justify-content-center`}>
                                                            <li className={`text-center me-2`}><span>Setting and privacy </span></li>
                                                            <i className={`${settingsCss.icon} fa-solid fa-chevron-down fa-xl`}></i>
                                                        </div>
                                                        <ul className=" list-unstyled">
                                                            <Link to={"changePassword"} className='text-decoration-none'><li className={`${settingsCss.listyle}`}><span className="dropdown-item active" aria-current="true">Change Password</span></li></Link>
                                                            <Link to={"deleteAccount"} className='text-decoration-none'><li className={`${settingsCss.listyle}`}><span className="dropdown-item">Delete Account</span></li></Link>
                                                            <Link className='text-decoration-none' to={'about'}>
                                                                <li className={`${settingsCss.listyle}`}><span className="dropdown-item">About</span></li>
                                                            </Link>
                                                        </ul>
                                                    </div>
                                                    <span onClick={logOut} className='text-decoration-none'><li className={`${settingsCss.listyle}`}><span>Log Out</span></li></span>
                                                </ul>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <img className='me-2' src={require('../../Images/egypt.png')} alt="" />
                                                <h6 className='opacity-75'>Egypt</h6>
                                            </div>
                                            <div className='d-flex justify-content-center mt-1 pb-5'>
                                                <h6 className='opacity-75'>Language: English</h6>
                                            </div>
                                        </div>
                                        <div className="col-md-9 text-center d-flex justify-content-center align-items-center">
                                            <Outlet />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}


    </>
}

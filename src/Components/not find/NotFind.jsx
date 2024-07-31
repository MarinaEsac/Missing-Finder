import React from 'react'
import notFindCss from './notFind.module.css'
import { Link } from 'react-router-dom'
export default function NotFind() {
    return <>
        <section className={`${notFindCss.bg} vh-100 d-flex justify-content-center align-items-center`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className={`${notFindCss.layer} d-flex justify-content-center flex-column rounded-5 position-relative`}>
                            <div className=' d-flex flex-column align-items-center'>
                                <i className="fa-solid fa-triangle-exclamation fa-5x mb-4"></i>
                                <h2 className='text-black fw-bold mb-3'>No Matches Found</h2>
                                <h4 className='text-white'>You can make a report <br /><i className="fa-solid mt-3 text-dark fa-lg fa-circle-arrow-down"></i></h4>
                            </div>
                            <div className='w-75 m-auto d-flex justify-content-center mt-4'>
                                <Link to={'/report'} className={`${notFindCss.btnstyle} text-decoration-none text-white me-3 d-flex align-items-center justify-content-center rounded-5`}><>Report a missing person</></Link>
                                <Link to={'/volunteer'} className={`${notFindCss.btnstyle} text-decoration-none text-white d-flex align-items-center justify-content-center rounded-5`}><>Someone is missing (Volunteer)</></Link>
                            </div>
                            <div className='position-absolute ms-4 mb-3 bottom-0 start-0'>
                                <Link to={"/home"} className='text-decoration-none text-dark h5'><i className="fa-solid fa-chevron-left"></i> Go to home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

import React, { useEffect } from 'react'
import requestCss from './request.module.css'
import { useNavigate } from 'react-router-dom'
export default function Request() {

    const navigate = useNavigate();


    useEffect(function () {
        setTimeout(() => {
            navigate("/home")
        }, 5000);
    }, [])


    return <>
        <section className={`${requestCss.bg} vh-100 d-flex justify-content-center align-items-center`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className={`${requestCss.layer} d-flex justify-content-center rounded-5`}>
                            <div className=' d-flex flex-column align-items-center'>
                                <i className="mb-4 fa-regular fa-circle-check fa-5x"></i>
                                <h3 className='text-black fw-bold'>The report has been confirmed <br /> you will be notified when the missing person is found</h3>
                                <h4 className='text-white'>thank you for choosing missing finder</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>
}

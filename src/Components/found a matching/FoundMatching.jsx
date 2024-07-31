import React, { useContext, useEffect } from 'react'
import foundCss from './foundMatching.module.css'
import { Link, useNavigate } from 'react-router-dom'

export default function FoundMatching() {
    
    return <>
        <section className={`${foundCss.bg} vh-100 d-flex justify-content-center align-items-center`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className={`${foundCss.layer} d-flex justify-content-center rounded-5`}>
                            <div className=' d-flex flex-column align-items-center'>
                                <i className="mb-4 fa-regular fa-circle-check fa-5x"></i>
                                <h3 className='text-black fw-bold'>We Found a matching  </h3>
                                {/* <h3 className='text-black fw-bold'>please note that the result maybe are not accurate</h3> */}
                                <Link to={"/missingResult"} className={`${foundCss.btnstyle} px-5 mt-3 py-2 rounded-5 text-decoration-none fw-bold text-white`}>Show The Result</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>
}

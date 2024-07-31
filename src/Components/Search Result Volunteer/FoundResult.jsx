import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import resultCss from './FoundResult.module.css'
import { authContext } from '../../Authentication/Authentication';

export default function MissingResult() {
    const { matchingFound } = useContext(authContext)

    return <>
        {matchingFound === null ? <div className="layer vh-100 bg-dark d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-spinner fa-spin-pulse text-white fa-7x"></i>
        </div> : <section className={`${resultCss.bg} vh-100 d-flex justify-content-center align-items-center`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className={`${resultCss.layer} d-flex justify-content-center rounded-5 position-relative`}>
                            <div className='w-75 d-flex flex-column align-items-center'>
                                <div className='mb-4'>
                                    <img className={`${resultCss.missingPhoto}`} src={matchingFound.images[0].secure_url} alt="" />
                                </div>
                                <div className=''>
                                    <div className='d-flex align-items-center mb-4'>
                                        <h4 className={`${resultCss.datastyle} rounded-3 p-1 me-3`}>{matchingFound.fullName}</h4>
                                        <h4 className={`${resultCss.datastyle} rounded-3 p-1 `}>{matchingFound.age + ' Years old'}</h4>
                                    </div>
                                    <div className='d-flex align-items-center mb-4'>
                                        <h4 className={`${resultCss.datastyle} rounded-3 p-1 me-3`}>lost in {Array.from(matchingFound.dateOfLoss).slice(0, 10)}</h4>
                                        <h4 className={`${resultCss.datastyle} rounded-3 p-1`}>{matchingFound.country}</h4>
                                    </div>
                                </div>
                                <div className='w-50 d-flex justify-content-center'>
                                    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                                        <div className="modal-dialog modal-xl modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className={`modal-header ${resultCss.opacity}`}>
                                                    <h3 className="modal-title text-light w-100" id="exampleModalToggleLabel">All information about the missing person</h3>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body bg-dark">
                                                    <div className='d-flex justify-content-around mb-2'>
                                                        <div>
                                                            <img className={`${resultCss.missingPhoto}`} src={matchingFound.images[0].secure_url} alt="" />
                                                        </div>
                                                        <div>
                                                            <img className={`${resultCss.missingPhoto}`} src={matchingFound.images[1].secure_url} alt="" />
                                                        </div>
                                                        <div>
                                                            <img className={`${resultCss.missingPhoto}`} src={matchingFound.images[2].secure_url} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-around mb-2'>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Missing Name</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingFound.fullName}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Missing Gender</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingFound.foundPersonGender}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Health Status</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingFound.healthStatus}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Missing Age</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingFound.age}</h5>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-around mb-2'>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Date of Found</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{Array.from(matchingFound.dateOfLoss).slice(0, 10)}</h5>
                                                        </div>

                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Governorate</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingFound.country}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>City</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingFound.city}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Absence Report</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingFound.absenceReport}</h5>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-around mb-2'>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Reporter Name</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{Array.from(matchingFound.userId.userName).slice(0, -2)}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Reporter Number</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingFound.phone}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Reporter Email</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingFound.userId.email}</h5>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-around mb-2'>
                                                        <div className="w-100 px-4 text-white">
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Description</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingFound.address}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-dark w-25 me-3" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Show More</button>
                                    <Link to={"/notfind"} className="btn btn-dark w-25">Not him\ her ?</Link>
                                </div>
                            </div>
                            <div className='position-absolute ms-4 mb-3 bottom-0 start-0'>
                                <Link to={"/home"} className='text-decoration-none text-dark h4'><i className="fa-solid fa-chevron-left"></i> Go to home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>}

    </>

}

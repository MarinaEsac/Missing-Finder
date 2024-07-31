import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import resultCss from './result.module.css'
import { authContext } from '../../Authentication/Authentication';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';

export default function MissingResult() {
    const { matchingMissing, userInfo, loginToken, baseurl } = useContext(authContext)
    const navigate = useNavigate();

    async function deleteMatchingIfNotTheMissing() {
        try {
            const { data } = await axios.delete(`http://localhost:8000/missingPersons/deleteMatching/${matchingMissing._id}/${userInfo.id}`, {
                headers: { authorization: loginToken }
            });
            if (data.success === true) {
                setTimeout(() => {
                    navigate('/notfind')
                }, 100);
            }
        }
        catch (err) {
            if (err.response.data.success === false) {
                console.log(err);
            }
        }

    }
    return <>
        {matchingMissing === null ? <div className="layer vh-100 bg-dark d-flex justify-content-center align-items-center">
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClassclassName="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div> : <section className={`${resultCss.bg} vh-100 d-flex justify-content-center align-items-center`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className={`${resultCss.layer} d-flex justify-content-center rounded-5 position-relative`}>
                            <div className='w-75 d-flex flex-column align-items-center'>
                                <div className='mb-4'>
                                    <img className={`${resultCss.missingPhoto}`} src={matchingMissing.images[0].secure_url} alt="" />
                                </div>
                                <div className=''>
                                    <div className='d-flex align-items-center mb-4'>
                                        <h4 className={`${resultCss.datastyle} rounded-3 p-1 me-3`}>{matchingMissing.fullName}</h4>
                                        <h4 className={`${resultCss.datastyle} rounded-3 p-1 `}>{matchingMissing.age + ' Years old'}</h4>
                                    </div>
                                    <div className='d-flex align-items-center mb-4'>
                                        <h4 className={`${resultCss.datastyle} rounded-3 p-1 me-3`}>lost in {Array.from(matchingMissing.dateOfLoss).slice(0, 10)}</h4>
                                        <h4 className={`${resultCss.datastyle} rounded-3 p-1`}>{matchingMissing.country}</h4>
                                    </div>
                                </div>
                                <div className='w-50 d-flex justify-content-center'>
                                    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                                        <div className="modal-dialog modal-xl modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className={`modal-header ${resultCss.color}`}>
                                                    <h3 className="modal-title text-light w-100" id="exampleModalToggleLabel">All information about the missing person</h3>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body bg-dark">
                                                    <div className='d-flex justify-content-around mb-2'>
                                                        <div>
                                                            <img className={`${resultCss.missingPhoto}`} src={matchingMissing.images[0].secure_url} alt="" />
                                                        </div>
                                                        <div>
                                                            <img className={`${resultCss.missingPhoto}`} src={matchingMissing.images[1].secure_url} alt="" />
                                                        </div>
                                                        <div>
                                                            <img className={`${resultCss.missingPhoto}`} src={matchingMissing.images[2].secure_url} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-around mb-2'>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Missing Name</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.fullName}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Missing Gender</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.missingGender}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Health Status</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.healthStatus}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Missing Age</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.age}</h5>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-around mb-2'>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Date of Loss</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{Array.from(matchingMissing.dateOfLoss).slice(0, 10)}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Status of missing</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.missingPersonClassification}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Missing Status</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.healthStatus}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Governorate</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.country}</h5>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-around mb-2'>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>City</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.city}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Absence Report</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.absenceReport}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Reporter Name</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{Array.from(matchingMissing.userId.userName).slice(0, -2)}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Reporter Number</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.phone}</h5>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-center mb-2'>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Reporter Relation</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.relationMissingPerson}</h5>
                                                        </div>
                                                        <div className={`${resultCss.cardData} text-white`}>
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Reporter Email</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.userId.email}</h5>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-around mb-2'>
                                                        <div className="w-50 px-4 text-white">
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>Description</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.wherePersonLost}</h5>
                                                        </div>
                                                        <div className="w-50 px-4 text-white">
                                                            <h4 className='mb-0 bg-secondary px-2 py-1 border-bottom rounded-top-3'>birthMark</h4>
                                                            <h5 className='px-2 py-2 bg-gradient'>{matchingMissing.birthMark}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-dark w-25 me-3" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Show More</button>
                                    <button className="btn btn-dark w-25 me-3" data-bs-target="#exampleModal" data-bs-toggle="modal">Not him\ her ?</button>
                                    {/* <Link to={"/notfind"} className="btn btn-dark w-25">Not him\ her ?</Link> */}
                                    <div className="modal fade" data-bs-backdrop="static" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content bg-dark">
                                                <div className="modal-body py-4">
                                                    <h5 className='text-white'>Are you sure it's not the missing person you're looking for?</h5>
                                                </div>
                                                <div className="modal-footer d-flex justify-content-center">
                                                    <button className="btn btn-secondary" data-bs-dismiss="modal">Not sure</button>
                                                    <button onClick={deleteMatchingIfNotTheMissing} className="btn btn-success" data-bs-dismiss="modal">Yes sure</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
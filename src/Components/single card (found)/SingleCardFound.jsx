import React, { useContext, useEffect, useState } from 'react'
import cardcss from './singlecard.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner';
import { authContext } from './../../Authentication/Authentication';

export default function SingleCardMissing() {
    const { baseUrl } = useContext(authContext)
    const { id } = useParams();
    const [card, setCard] = useState(null)
    async function getSingleCard() {

        try {
            const { data } = await axios.get(`${baseUrl}/missingPersons/getAllFoundPersons/${id}`)
            setCard(data.result)
        } catch {

        }
    }
    useEffect(function () {
        getSingleCard()
    }, [])
    
    return <>
        {card === null ? <div className='bg-dark vh-100 d-flex justify-content-center align-items-center'>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClassclassName="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div> : <section className={`${cardcss.bg} vh-100 d-flex justify-content-center align-items-center`}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className={`${cardcss.layer} d-flex justify-content-center rounded-5`}>
                            <div className='w-100  d-flex justify-content-center'>
                                <div className="size col-sm-12 col-md-6 col-lg-3 me-5">
                                    <div className={`${cardcss.personcard} mb-2 rounded-3 py-4 px-3`}>
                                        <h6 className='mb-3'>Missing Information</h6>
                                        <div className={`w-100 d-flex`}>
                                            <div className='col-4 img me-2 d-flex flex-column text-center'>
                                                <img className="mb-2 w-100 rounded-2" src={card.images[0].secure_url} alt="missing person" />
                                                <span className={`${cardcss.missinfo} text-center`}>{card.fullName}</span>
                                            </div>
                                            <div className='col-8'>
                                                <div className={`${cardcss.missinfo} part2 py-2 me-2 d-flex justify-content-center align-items-center`}>
                                                    <i className="fa-regular fa-user text-dark mx-2 "></i>
                                                    <span className={`${cardcss.font} text-dark me-2`}>Age</span>
                                                    <span className={`${cardcss.font} me-2`}>{card.age}</span>
                                                </div>
                                                <div className={`${cardcss.missinfo} justify-content-center part2 py-2 me-2 d-flex align-items-center my-2`}>
                                                    <div className=''>
                                                        <i className="fa-regular fa-calendar-days text-dark ms-2 me-1 "></i>
                                                        <span className={`${cardcss.font} text-dark`}>Missing since</span><br />
                                                        <span className={`${cardcss.font} mx-4`}>{Array.from(card.dateOfLoss).slice(0, 10)}</span>
                                                    </div>
                                                </div>
                                                <div className={`${cardcss.missinfo} justify-content-center part2 py-2 me-2 d-flex align-items-center my-2`}>
                                                    <div className=''>
                                                        <i className="fa-solid fa-location-dot text-dark mx-2 "></i>
                                                        <span className={`${cardcss.font} text-dark`}>Missing From</span><br />
                                                        <span className={`${cardcss.font} mx-4`}>{card.country}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`size col-sm-12 col-md-6 col-lg-3`}>
                                    <div className={`${cardcss.reportercard} rounded-3 py-4 px-3`}>
                                        <h6 className='mb-3'>Reporter Information</h6>
                                        <h4 className=''>Name:</h4>
                                        <h5 className='mb-3'>{Array.from(card.userId.userName).slice(0, -2)}</h5>
                                        <h4 className=''>Email:</h4>
                                        <h5 className='mb-3'>{card.userId.email}</h5>
                                        <h4 className=''>Phone Number:</h4>
                                        <h5 className='mb-3'>{card.phone}</h5>
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

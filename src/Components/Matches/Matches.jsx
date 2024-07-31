import React, { useContext, useEffect, useState } from 'react';
import matchesCss from './matches.module.css';
import axios from 'axios';
import { authContext } from '../../Authentication/Authentication';
import { ColorRing } from 'react-loader-spinner';

export default function Matches() {
    const [allCards, setAllCards] = useState([]);
    const [err, setErr] = useState();
    const { baseUrl, loginToken } = useContext(authContext);
    const id = JSON.parse(localStorage.getItem('info')).id;

    async function getMatching() {
        try {
            const { data } = await axios.get(`${baseUrl}/missingPersons/checkface/matchings/${id}`);
            setAllCards(data.results);
        } catch (err) {
            if (err.response.data.message === "In-valid user_Id") {
                setErr(false)
            }
        }

    }

    async function handleDelete(cardId) {
        try {
            const response = await axios.delete(`${baseUrl}/missingPersons/checkFace/deleteMatching/${cardId}`, {
                headers: { authorization: loginToken }
            });
            console.log(response.data);
            setAllCards(allCards.filter(card => card._id !== cardId));
        } catch (error) {
            console.log('Error deleting card:', error);
            console.log('Request URL:', `${baseUrl}/missingPersons/checkFace/deleteMatching/${cardId}`);
            console.log('Response:', error.response);
        }
    }

    useEffect(function () {
        getMatching();
    }, []);

    return (
        <>
            {err === false ? (<section className={`${matchesCss.bg} vh-100`}>
                <div className="container-fluid pt-2">
                    <div className="row">
                        <div className="d-flex bg-light opacity-75 py-3 mb-3 text-black fw-bold">
                            <div className="col-3 text-center"><h5>Image</h5></div>
                            <div className="col-2 text-center"><h5>Volunteer Name</h5></div>
                            <div className="col-2 text-center"><h5>Email</h5></div>
                            <div className="col-2 text-center"><h5>Contact</h5></div>
                            <div className="col-3 text-center"><h5>Delete</h5></div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-center mt-5 h2  text-white'>You Don't have any matches</div>
                </div>
            </section>) : ""}
            {allCards.length === 0 && err !== false ? (
                <div className='bg-dark vh-100 d-flex justify-content-center align-items-center'>
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
                </div>
            ) : ""}
            {allCards.length !== 0 && err !== false ? (
                <section className={`${matchesCss.bg}`}>
                    <div className="container-fluid pt-2">
                        <div className="row">
                            <div className="d-flex bg-light opacity-75 py-3 mb-3 text-black fw-bold">
                                <div className="col-3 text-center"><h5>Image</h5></div>
                                <div className="col-2 text-center"><h5>Volunteer Name</h5></div>
                                <div className="col-2 text-center"><h5>Email</h5></div>
                                <div className="col-2 text-center"><h5>Contact</h5></div>
                                <div className="col-3 text-center"><h5>Delete</h5></div>
                            </div>
                            {allCards.map((card, idx) => (
                                <div key={idx} className={`${matchesCss.bgCard} d-flex align-items-center py-2 mb-2 text-black fw-bold`}>
                                    <div className="col-3 text-center">
                                        <img className={`${matchesCss.imageSize} rounded-3`} src={card.checkFaceimage.secure_url} alt="" />
                                    </div>
                                    <div className="col-2 text-center">{Array.from(card.userId.userName).slice(0, -2)}</div>
                                    <div className="col-2 text-center">{card.userId.email}</div>
                                    <div className="col-2 text-center">{card.userId.phone}</div>
                                    <div className="col-3 text-center">
                                        <button onClick={() => handleDelete(card._id)} className="w-50 btn btn-danger">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : ""}

        </>
    );
}

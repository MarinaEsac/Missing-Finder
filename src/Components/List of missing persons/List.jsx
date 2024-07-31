import React, { useContext, useEffect, useState } from 'react'
import listCss from './list.module.css'
import { Link } from 'react-router-dom'
import "./responsive.css"
import { authContext } from '../../Authentication/Authentication'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
import ReactPaginate from 'react-paginate'

export default function List() {
    const { loginToken, baseUrl } = useContext(authContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [searchArea, setSearchArea] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allCards, setAllCards] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);

    async function getAllData(currentPage) {
        const { data } = await axios.get(`${baseUrl}/missingPersons/getAllMissingPersons?page=${currentPage}`)
        setAllCards(data.results);
    }

    const handlePageClick = async (data) => {
        setCurrentPage(data.selected + 1);
    }

    async function searchByName(keyword) {
        try {
            const { data } = await axios.get(`${baseUrl}/missingPersons/all?keyword=${keyword}&page=${currentPage}`);
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error searching for missing persons:', error);
        }
    }
    const handleSearchName = (event) => {
        const keyword = event.target.value;
        setSearchTerm(keyword);
        if (keyword.trim() !== '') {
            searchByName(keyword);
        } else {
            setSearchResults([]);
        }
    };
    const handleAreaSearch = async (event) => {
        const area = event.target.value;
        setSearchArea(area);
        if (area.trim() !== '') {
            searchMissingPersonsByArea(area);
        } else {
            setSearchResults([]);
        }
    };
    async function searchMissingPersonsByArea(area) {
        try {
            const { data } = await axios.get(`${baseUrl}/missingPersons/getAllMissingPersonsWithArea?country=${area}&page=${currentPage}`);
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error searching for missing persons by area:', error);
        }
    }
    const handleYearSearch = (event) => {
        const year = event.target.value;
        setSearchYear(year);
        if (year.trim() !== '') {
            searchMissingPersonsByYear(year);
        } else {
            setSearchResults([]);
        }
    };
    async function searchMissingPersonsByYear(year) {
        try {
            const { data } = await axios.get(`${baseUrl}/missingPersons/getAllMissingPersonsWithYear?year=${year}&page=${currentPage}`);
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error searching for missing persons by year:', error);
        }
    }
    useEffect(function () {
        getAllData(currentPage);
    }, [currentPage])

    return <>
        {allCards === null ? <div className='bg-dark vh-100 d-flex justify-content-center align-items-center'>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClassclassName="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div> : <section className={`{require('../../Images/backgr2ound.png')}`}>
            <nav className={`${listCss.mynavbar} navbar navbar-expand-lg rounded-bottom-4 overflow-hidden mb-4`}>
                <div className="container-fluid d-flex align-items-center justify-content-center">
                    <div className={`${listCss.width} logo`}>
                        <img className={`w-75 rounded-5 ms-3`} src={require('../../Images/logo.png')} alt="missing finder logo" />
                    </div>
                    <div className="collapse navbar-collapse d-flex align-items-center" id="navbarNav">
                        {loginToken ? <><ul className="navbar-nav ms-auto">
                            <div className='d-flex me-5 pe-5'>
                                <li className="nav-item pe-3">
                                    <Link to={'/home'} className="nav-link text-light fw-bolder active" aria-current="page">Home</Link>
                                </li>
                                <li className="nav-item px-4">
                                    <Link to={"/settings/about"} className="nav-link text-light fw-bolder">About us</Link>
                                </li>
                                <li className="nav-item ps-3">
                                    <Link className="nav-link text-light fw-bolder">Contact</Link>
                                </li>
                            </div>
                        </ul>
                            <ul className="navbar-nav ms-auto ps-5 me-2">
                                <li className="nav-item">
                                    <Link to={"/settings/changePassword"} className="nav-link"><i className="fa-solid fa-bars fa-xl"></i></Link>
                                </li>
                            </ul> </> : <ul className="navbar-nav ms-auto ps-5 me-2">
                            <li className="nav-item h5">
                                <Link to={"/SignUp"} className="nav-link">SignUp</Link>
                            </li>
                            <li className="nav-item h5">
                                <Link to={"/Login"} className="nav-link">LogIn</Link>
                            </li>
                        </ul>}
                    </div>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 justify-content-center d-flex mb-4">
                        <div className={`col-sm-3 position-relative me-5`}>
                            <input value={searchTerm} onChange={handleSearchName} type="text" className={`${listCss.inputstyle}  form-control text-center text-white`} id="exampleFormControlInput1" placeholder="Search By Name" />
                            <i className={`${listCss.icon} fa-solid fa-magnifying-glass text-black`}></i>
                        </div>
                        <div className={`col-sm-3 position-relative me-5`}>
                            <input value={searchArea} onChange={handleAreaSearch} type="text" className={`${listCss.inputstyle}  form-control text-center text-white`} id="exampleFormControlInput2" placeholder="Search By Area" />
                            <i className={`${listCss.icon} fa-solid fa-magnifying-glass text-black`}></i>
                        </div>
                        <div className={`col-sm-3 position-relative me-5`}>
                            <input value={searchYear} onChange={handleYearSearch} className={`${listCss.inputstyle} form-control text-center text-white`} id="exampleFormControlInput3" placeholder="Missing Since" />
                            <i className={`${listCss.icon} fa-solid fa-magnifying-glass text-black`}></i>
                        </div>
                    </div>
                    <div className="d-flex flex-wrap col-12">
                        {searchResults && searchResults.length > 0 ? (
                            searchResults.map((search, index) => (<div key={index} className="">
                                <div className={`${listCss.personcard} me-2 mb-2 rounded- py-4 px-3`}>
                                    <div className={`w-100 d-flex mb-5`}>
                                        <div className='col-4 me-2 d-flex flex-column text-center'>
                                            <img className={`mb-2 w-100 rounded-2 ${listCss.missingPhotos}`} src={search.images[0].secure_url} alt="missing person" />
                                            <span className={`${listCss.missinfo} text-center`}>{search.fullName}</span>
                                        </div>
                                        <div className='col-8'>
                                            <div className={`${listCss.missinfo} part2 py-2 me-2 d-flex justify-content-center align-items-center`}>
                                                <i className="fa-regular fa-user text-dark mx-2 "></i>
                                                <span className={`${listCss.font} text-dark me-2`}>Age</span>
                                                <span className={`${listCss.font} me-2`}>{search.age}</span>
                                            </div>
                                            <div className={`${listCss.missinfo} justify-content-center part2 py-2 me-2 d-flex align-items-center my-2`}>
                                                <div className=''>
                                                    <i className="fa-regular fa-calendar-days text-dark ms-2 me-1 "></i>
                                                    <span className={`${listCss.font} text-dark`}>Missing since</span><br />
                                                    <span className={`${listCss.font} mx-4`}>{Array.from(search.dateOfLoss).slice(0, 10)}</span>
                                                </div>
                                            </div>
                                            <div className={`${listCss.missinfo} justify-content-center part2 py-2 me-2 d-flex align-items-center my-2`}>
                                                <div className=''>
                                                    <i className="fa-solid fa-location-dot text-dark mx-2 "></i>
                                                    <span className={`${listCss.font} text-dark`}>Missing From</span><br />
                                                    <span className={`${listCss.font} ms-5`}>{search.country}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='d-flex justify-content-center'>
                                        <Link to={`/MissingPersoninformation/${search._id}`} className={`${listCss.cursor} btn btn-outline-dark`}>Contact</Link>
                                    </div> */}
                                </div>
                            </div>))
                        ) : (allCards.map(function (card, idx) {
                            return <div key={idx} className="size col-sm-12 col-md-6 col-lg-3">
                                <div className={`${listCss.personcard} me-2 mb-2 rounded-3 py-4 px-3 overflow-hidden`}>
                                    <div className={`w-100 d-flex mb-5`}>
                                        <div className='col-4 me-2 d-flex flex-column text-center'>
                                            <img className={`mb-2 w-100 rounded-2 ${listCss.missingPhotos}`} src={card.images[0].secure_url} alt="missing person" />
                                            <span className={`${listCss.missinfo} text-center`}>{card.fullName}</span>
                                        </div>
                                        <div className='col-8'>
                                            <div className={`${listCss.missinfo} part2 py-2 me-2 d-flex justify-content-center align-items-center`}>
                                                <i className="fa-regular fa-user text-dark mx-2 "></i>
                                                <span className={`${listCss.font} text-dark me-2`}>Age</span>
                                                <span className={`${listCss.font} me-2`}>{card.age}</span>
                                            </div>
                                            <div className={`${listCss.missinfo} justify-content-center part2 py-2 me-2 d-flex align-items-center my-2`}>
                                                <div className=''>
                                                    <i className="fa-regular fa-calendar-days text-dark ms-2 me-1 "></i>
                                                    <span className={`${listCss.font} text-dark`}>Missing since</span><br />
                                                    <span className={`${listCss.font} mx-4`}>{Array.from(card.dateOfLoss).slice(0, 10)}</span>
                                                </div>
                                            </div>
                                            <div className={`${listCss.missinfo} justify-content-center part2 py-2 me-2 d-flex align-items-center my-2`}>
                                                <div className=''>
                                                    <i className="fa-solid fa-location-dot text-dark mx-2 "></i>
                                                    <span className={`${listCss.font} text-dark`}>Missing From</span><br />
                                                    <span className={`${listCss.font} ms-5`}>{card.country}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='d-flex justify-content-center'>
                                        <Link to={`/MissingPersoninformation/${card._id}`} className={`${listCss.cursor} btn btn-outline-dark`}>Contact</Link>
                                    </div> */}
                                </div>
                            </div>
                        }))}
                    </div>
                    <div className='d-flex align-items-center justify-content-center'>
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            pageCount={2}
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={0}
                            onPageChange={handlePageClick}
                            containerClassName='pagination'
                            pageClassName='page-item'
                            pageLinkClassName='page-link'
                            previousClassName='page-item'
                            previousLinkClassName='page-link'
                            nextClassName='page-item'
                            nextLinkClassName='page-link'
                            breakClassName='page-item'
                            breakLinkClassName='page-link'
                            activeClassName='active'
                        />
                    </div>
                </div>
            </div>
        </section>}



    </>
}

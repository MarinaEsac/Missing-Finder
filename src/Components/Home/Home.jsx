import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../../Images/home.png'
import homeCss from './home.module.css'
import './homeResponsive.css'
import { authContext } from './../../Authentication/Authentication';

export default function Home() {

    const { loginToken } = useContext(authContext)
    return <>
        <section>
            <nav className={`${homeCss.mynavbar} navbar navbar-expand-lg mb-4 rounded-bottom-4`}>
                <div className="container-fluid">
                    <Link className={`${homeCss.width} logo col-4 navbar-brand`} href="#">
                        <img className={`w-50 rounded-5`} src={require('../../Images/logo.png')} alt="missing finder logo" />
                    </Link>
                    <button className="navbar-toggler w-100" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse my-nav" id="navbarSupportedContent">
                        {loginToken ? <>
                            <ul className="navbar-nav fw-bold col-6 d-flex justify-content-center mb-lg-0 first-ul">
                                <li className="nav-item me-5">
                                    <Link to={'/home'} className="active text-white text-decoration-none" aria-current="page" href="#">Home</Link>
                                </li>
                                <li className="nav-item me-5">
                                    <Link to={'/settings/about'} className="text-white text-decoration-none" href="#">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="text-white text-decoration-none" href="#">Contact</Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav col-2 mb-lg-0 ms-auto d-flex justify-content-end second-ul">
                                <li className="nav-item col-3">
                                    <Link to={"/settings/changePassword"} className="nav-link"><i className="fa-solid fa-bars fa-xl"></i></Link>                            </li>
                            </ul> </> : <ul className="navbar-nav ms-auto authLinks">
                            <li className="nav-item h5">
                                <Link to={"/SignUp"} className="nav-link signup">SignUp</Link>
                            </li>
                            <li className="nav-item h5">
                                <Link to={"/Login"} className="nav-link">LogIn</Link>
                            </li>
                        </ul>}

                    </div>
                </div>
            </nav>

            <div className={`${homeCss.bg} position-relative`}>
                <div className={`${homeCss.card1} card1 position-absolute py-2`}>
                    <p className='text-white h2 text-center'>Missing finder is here to help
                        searching for your beloved ones</p>
                </div>
                <div className={`${homeCss.card2} card2 position-absolute`}>
                    <p className='text-white h2 text-center py-1'>We Never stop caring</p>
                </div>
            </div>
            <section className='pt-4'>
                <div className={`${homeCss.innerdiv} rounded-3 pb-4`}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="d-flex maindiv p-4">
                                <div className='me-3 sectionLogo'>
                                    <img className='' src={require('../../Images/Component 13.png')} alt="missings" />
                                </div>
                                <div className="">
                                    <div className='position-relative description'>
                                        <p className={`${homeCss.pstyle} text-center h2 mb-4 p1`}> The website operates on a simple premise to aggregate and analyze diverse datasets related to missing persons cases using advanced AI algorithms.
                                        </p>
                                        <p className='text-center h2 text-white p2'>Here is Most Recent missing cases in the same area</p>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                {loginToken ? <Link to={'/searchForthemissing'} className={`${homeCss.btnstyle} btnstyle text-decoration-none text-white me-3 d-flex align-items-center justify-content-center rounded-5`}><>Search for the missing person</></Link> : <Link to={'/login'} className={`${homeCss.btnstyle} btnstyle text-decoration-none text-white me-3 d-flex align-items-center justify-content-center rounded-5`}><>Search for the missing person</></Link>}
                                {loginToken ? <Link to={'/Matches'} className={`${homeCss.btnstyle} btnstyle text-decoration-none text-white me-3 d-flex align-items-center justify-content-center rounded-5`}><>Matches Your Report</></Link> : <Link to={'/login'} className={`${homeCss.btnstyle} btnstyle text-decoration-none text-white me-3 d-flex align-items-center justify-content-center rounded-5`}><>Search for the missing person</></Link>}
                                <Link to={'/listOfFoundPersons'} className={`${homeCss.btnstyle} btnstyle text-decoration-none text-white me-3 d-flex align-items-center justify-content-center rounded-5`}><>List of found persons</></Link>
                                <Link to={'/listOfMissingPersons'} className={`${homeCss.btnstyle} btnstyle text-decoration-none text-white me-3 d-flex align-items-center justify-content-center rounded-5`}><>List of missing persons</></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className={`${homeCss.bgfooter} pt-4 overflow-hidden`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className={`d-flex text-white rounded-top-5 py-3 myfooter ${homeCss.myfooter}`}>
                            <div className="d-flex flex-column text-center line1 fw-bold">
                                <span className='h4'>Get Help</span>
                                <span>My Loved one is missing</span>
                                <span>Report a missing person</span>
                                <div className='w-50 m-auto mt-4 footerlogo'><img className={`w-100 rounded-5`} src={require('../../Images/logo.png')} alt="missing finder logo" /></div>
                            </div>
                            <div className="col-3 line2">
                                <div className='d-flex flex-column text-center fw-bold'>
                                    <span className='h4'>Contact Us</span>
                                    <Link className='text-white' to={'mailto:MissingFinder@gmail.com'}>MissingFinder@gmail.com</Link>
                                </div>
                            </div>
                            <div className="breckline me-3">
                                <div className={`${homeCss.breackfooter} breckline d-flex flex-column fw-bold`}>
                                </div>
                            </div>
                            <div className="d-flex text-center text-white alldiv">
                                <div className='fw-bold d-flex flex-column col-sm-6 col-lg-3 col-xl-6 socielmedia'>
                                    <Link target='-blank' to={'https://www.apple.com/eg-ar/app-store/'} className='mb-2'>
                                        <img className='iconfooter' src={require('../../Images/app store.png')} alt="download on the app store" />
                                    </Link>
                                    <Link target='-blank' to={'https://play.google.com/store/games?hl=en_UShttps%3A%2F%2Fplay.google.com%2Fstore%2Fgames%3Fhl%3Den_US'}>
                                        <img className='iconfooter' src={require('../../Images/google.png')} alt="download on the app store" />
                                    </Link>
                                    <div className='icons mt-3'>
                                        <div className='d-flex justify-content-center w-75 m-auto'>
                                            <Link target='-blank' to={'https://twitter.com/'}>
                                                <img className='w-50 me-3 bg-white' src={require('../../Images/twitter.png')} alt="download on the app store" />
                                            </Link>
                                            <Link target='-blank' to={'https://gmail.com/'}>
                                                <img className='w-50 me-3' src={require('../../Images/gmail.png')} alt="download on the app store" />
                                            </Link>
                                            <Link target='-blank' to={'https://facebook.com/'}>
                                                <img className='w-75' src={require('../../Images/facebook.png')} alt="download on the app store" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-6 col-lg-3 col-xl-6 fw-bold text-center artical'>
                                    <p>"Missing finder Using AI to Reunite Families.
                                        Our graduation project, 'Missing Finder,'
                                        harnesses the power of artificial intelligence
                                        to locate missing loved ones,
                                        bridging gaps and restoring hope."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    </>
}

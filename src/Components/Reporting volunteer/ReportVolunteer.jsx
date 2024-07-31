import React, { useContext, useState } from 'react'
import volunteerCss from './volunteer.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../Authentication/Authentication';
import axios from 'axios';
import { useFormik } from 'formik';
import { ThreeDots } from 'react-loader-spinner';

export default function Report() {
    const navigate = useNavigate();
    const { loginToken, baseUrl } = useContext(authContext);

    const [imageFiles, setImageFiles] = useState([]);
    const [isloading, setisloading] = useState(false)

    const formikObj = useFormik({
        initialValues: {
            images: imageFiles,
            label1: '',
            missingPersonInformation: '',
            foundPersonGender: '',
            healthStatus: '',
            age: '',
            address: '',
            absenceReport: '',
            phone: '',
            country: '',
            city: '',
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            imageFiles.forEach((image, index) => {
                formData.append(`File${index + 1}`, image);
            });
            formData.append('label1', values.label1);
            formData.append('missingPersonInformation', values.missingPersonInformation);
            formData.append('foundPersonGender', values.foundPersonGender);
            formData.append('healthStatus', values.healthStatus);
            formData.append('age', values.age);
            formData.append('address', values.address);
            formData.append('absenceReport', values.absenceReport);
            formData.append('phone', values.phone);
            formData.append('country', values.country);
            formData.append('city', values.city);

            setisloading(true);
            try {
                const { data } = await axios.post(`${baseUrl}/missingPersons/addFound`, formData, { headers: { authorization: loginToken } })
                if (data.success === true) {
                    setTimeout(function () {
                        navigate('/confirmedSubmit')
                    }, 1000)
                }
                console.log('Response:', data);
            } catch (error) {
                console.error('Error:', error);
            }
            setisloading(false)
        },
        validate: function (values) {
            const errors = {};

            if (imageFiles.length !== 3) {
                errors.images = "Please upload 3 photos";
            }
            if (!values.label1.match(/^(?=.*[a-zA-Z])(?:[a-zA-Z\s\W]){3,50}$/)) {
                errors.label1 = "Please enter the name of the missing person";
            }
            if (!values.missingPersonInformation) {
                errors.missingPersonInformation = "Specify whether he/she told you their name or not"
            }
            if (!values.age.match(/^(?:100|[1-9]?[0-9])$/)) {
                errors.age = "Please enter the age of the missing person";
            }
            if (!values.country.match(/^[a-zA-Z]{3,50}$/)) {
                errors.country = "Please enter the governorate where the missing person was lost";
            }
            if (!values.city.match(/^(?=.*[a-zA-Z])(?:[a-zA-Z\s]){3,50}$/)) {
                errors.city = "Please enter the city where the missing person was lost";
            }
            if (!values.healthStatus) {
                errors.healthStatus = "Please Enter health Status"
            }
            if (!values.foundPersonGender) {
                errors.foundPersonGender = "PPlease select gender"
            }
            if (!values.absenceReport) {
                errors.absenceReport = "Please Enter absence Report"
            }
            if (!values.address) {
                errors.address = "Please enter the Description"
            }
            if (!values.phone.match(/^(010|011|012|015)\d{8}$/)) {
                errors.phone = "Please enter your phone number";
            }
            return errors;

        }
    });
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 3);
        setImageFiles(files);
    };

    return <>
        <form onSubmit={formikObj.handleSubmit}>
            <section className={`${volunteerCss.bg} px-4 vh-100 d-flex align-items-center justify-content-center`}>
                <div className={`container-fluid rounded-4 ${volunteerCss.layer} overflow-hidden`}>
                    <div className="row">
                        <div className="py-4 d-flex justify-content-center">
                            <div className='d-flex w-100'>
                                <div className='col-lg-4 col-md-4 text-center pb-4 d-flex justify-content-center align-items-center flex-column'>
                                    <div className=' w-75 mb-5'>
                                        {imageFiles.map((image, index) => (
                                            <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} className={`${volunteerCss.missingPhotos} pe-1 mb-1`} />
                                        ))}
                                        <label className={`${volunteerCss.lable} d-block mb-2 h5 btn btn-light rounded-5 opacity-75 mb-3`} htmlFor="input-file">Upload 3 Photos <i className="fa-solid fa-upload"></i></label>
                                        <input className='d-none' onChange={handleImageChange} multiple type="file" accept='image/jpeg, image/png, image/jpg' id='input-file' />
                                        <div className='spans'>
                                            <input id='label1' value={formikObj.values.label1} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${volunteerCss.inputstyle} mb-2 form-control rounded-5 text-center`} type="text" placeholder='Name' />
                                            <div className='radios d-flex text-start flex-column'>
                                                <div className='mb-1'>
                                                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={"The Person Himself Confirmed His Name"} name='missingPersonInformation' id='The Person Himself Confirmed His Name' className='me-1 opacity-75' type="radio" />
                                                    <label className='text-white' htmlFor="The Person Himself Confirmed His Name">The person himself confirmed his name </label>
                                                </div>
                                                <div className='mb-3'>
                                                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={"Not sure of his/her identity"} name='missingPersonInformation' id='Not sure of his/her identity' className='me-1 opacity-75' type="radio" />
                                                    <label className='text-white' htmlFor="Not sure of his/her identity">Not sure of his/her identity </label>
                                                </div>
                                            </div>
                                            <input id='age' value={formikObj.values.age} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${volunteerCss.inputstyle} mb-2 form-control rounded-5 text-center`} type="text" placeholder='Age' />
                                        </div>
                                    </div>
                                    {formikObj.errors.images && formikObj.touched.images || formikObj.errors.label1 && formikObj.touched.label1 || formikObj.errors.missingPersonInformation && formikObj.touched.missingPersonInformation || formikObj.errors.age && formikObj.touched.age || formikObj.errors.healthStatus && formikObj.touched.healthStatus || formikObj.errors.foundPersonGender && formikObj.touched.foundPersonGender || formikObj.errors.absenceReport && formikObj.touched.absenceReport || formikObj.errors.address && formikObj.touched.address || formikObj.errors.country && formikObj.touched.country || formikObj.errors.city && formikObj.touched.city || formikObj.errors.phone && formikObj.touched.phone ? <div className='alert alert-danger rounded-3 w-75 py-3 d-flex justify-content-center align-items-center'>{formikObj.errors.images || formikObj.errors.label1 || formikObj.errors.missingPersonInformation || formikObj.errors.age || formikObj.errors.healthStatus || formikObj.errors.foundPersonGender || formikObj.errors.absenceReport || formikObj.errors.address || formikObj.errors.country || formikObj.errors.city || formikObj.errors.phone}</div> : ""}
                                </div>
                                <div className='col-lg-8 col-md-8'>
                                    <div className=''>
                                        <p className={`${volunteerCss.color}`}>Reporting a missing person</p>
                                    </div>
                                    <div className='inputs d-flex flex-colum w-100'>
                                        <div className='w-25 me-5'>
                                            <span className={`${volunteerCss.spanstyle}  mb-2 form-control rounded-5 text-center`}>Health status</span>
                                            <span className={`${volunteerCss.spanstyle} mb-2 form-control rounded-5 text-center`}>Gender</span>
                                            <span className={`${volunteerCss.spanstyle} mb-2 form-control rounded-5 text-center`}>absence Report</span>
                                        </div>
                                        <div className="first-column me-5">
                                            <div className='health mt-1 mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${volunteerCss.radiostyle} form-check-input me-2`} id='healthy' type="radio" value="healthy" name='healthStatus' />
                                                <label className={`${volunteerCss.rediostyle} h5`} htmlFor="healthy">Healthy</label>
                                            </div>
                                            <div className='gender mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${volunteerCss.radiostyle} form-check-input me-2`} value='Male' id='Male' type="radio" name='foundPersonGender' />
                                                <label className={`${volunteerCss.rediostyle} h5`} htmlFor="Male">Male</label>
                                            </div>
                                            <div className='absence mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${volunteerCss.radiostyle} form-check-input me-2`} value="Yes" id='Yes' type="radio" name='absenceReport' />
                                                <label className={`${volunteerCss.rediostyle} h5`} htmlFor="Yes">Yes</label>
                                            </div>
                                        </div>
                                        <div className="second-column me-5">
                                            <div className='health mt-1 mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${volunteerCss.radiostyle} form-check-input me-2`} id='sick' type="radio" value="sick" name='healthStatus' />
                                                <label className={`${volunteerCss.rediostyle} h5`} htmlFor="sick">sick</label>
                                            </div>
                                            <div className='gender mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${volunteerCss.radiostyle} form-check-input me-2`} value='Female' id='Female' type="radio" name='foundPersonGender' />
                                                <label className={`${volunteerCss.rediostyle} h5`} htmlFor="Female">Female</label>
                                            </div>
                                            <div className='absence mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${volunteerCss.radiostyle} form-check-input me-2`} value="No" id='No' type="radio" name='absenceReport' />
                                                <label className={`${volunteerCss.rediostyle} h5`} htmlFor="No">No</label>
                                            </div>
                                        </div>
                                        <div className="third-column me-2">
                                            <div className='health mt-1 mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${volunteerCss.radiostyle} form-check-input me-2`} id='special' type="radio" value="SpecialNeeds" name='healthStatus' />
                                                <label className={`${volunteerCss.rediostyle} h5`} htmlFor="special">special Needs</label>
                                            </div>
                                            <div className={`${volunteerCss.hide} gender mb-3`}>
                                                <input className={`${volunteerCss.radiostyle} form-check-input me-2`} value={'Female'} id='female' type="radio" name='gender' />
                                                <label className={`${volunteerCss.rediostyle} h5`} htmlFor="female">Female</label>
                                            </div>
                                            <div className={`absence mb-3`}>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${volunteerCss.radiostyle} form-check-input me-2`} value="No clue" id='No clue' type="radio" name='absenceReport' />
                                                <label className={`${volunteerCss.rediostyle} h5`} htmlFor="No clue">No clue</label>
                                            </div>
                                        </div>
                                        <div className="fourth-column">
                                            <div className={`${volunteerCss.hide} mt-1 mb-3`}>
                                                <input className={`${volunteerCss.radiostyle} form-check-input me-2`} id='special0' type="radio" name='health Status' />
                                                <label className={`${volunteerCss.rediostyle} h5`} htmlFor="special0">special Needs</label>
                                            </div>
                                            <div className={`${volunteerCss.hide} gender mb-3`}>
                                                <input className={`${volunteerCss.radiostyle} form-check-input me-2`} value={'Female'} id='female0' type="radio" name='gender' />
                                                <label className={`${volunteerCss.rediostyle} h5`} htmlFor="female0">Female</label>
                                            </div>
                                            <div className={`${volunteerCss.hide} absence mb-3`}>
                                                <input className={`${volunteerCss.radiostyle} form-check-input me-2`} id='No0' type="radio" name='absenceReport' />
                                                <label className={`${volunteerCss.rediostyle} h5`} htmlFor="No0">No</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <textarea value={formikObj.values.address} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className='rounded-4' placeholder='Description place of missing ,clothes ,etc|' name="address" id="address" cols="102" rows="10"></textarea>
                                    </div>
                                    <div className={`${volunteerCss.inputsSize} d-flex justify-content-center mb-3`}>
                                        <select value={formikObj.values.country} onChange={(e) => formikObj.setFieldValue('country', e.target.value)} className={`${volunteerCss.inputstyle} rounded-5 form-select form-select-md w-25 pe-3 me-4`} aria-label="Small select example" >
                                            <option value={"cairo"} className={`${volunteerCss.options} text-center`}>Country</option>
                                            <option value={"New Valley"} className={`${volunteerCss.options} text-center`}>New Valley</option>
                                            <option value={"Matruh"} className={`${volunteerCss.options} text-center`}>Matruh</option>
                                            <option value={"Red Sea"} className={`${volunteerCss.options} text-center`}>Red Sea</option>
                                            <option value={"Giza"} className={`${volunteerCss.options} text-center`}>Giza</option>
                                            <option value={"Cairo"} className={`${volunteerCss.options} text-center`}>Cairo</option>
                                            <option value={"South Sinai"} className={`${volunteerCss.options} text-center`}>South Sinai</option>
                                            <option value={"North Sinai"} className={`${volunteerCss.options} text-center`}>North Sinai</option>
                                            <option value={"Suez"} className={`${volunteerCss.options} text-center`}>Suez</option>
                                            <option value={"Beheira"} className={`${volunteerCss.options} text-center`}>Beheira</option>
                                            <option value={"Helwan"} className={`${volunteerCss.options} text-center`}>Helwan</option>
                                            <option value={"Sharqia"} className={`${volunteerCss.options} text-center`}>Sharqia</option>
                                            <option value={"Dakahlia"} className={`${volunteerCss.options} text-center`}>Dakahlia</option>
                                            <option value={"Kafr el-Sheikh"} className={`${volunteerCss.options} text-center`}>Kafr el-Sheikh</option>
                                            <option value={"Alexandria"} className={`${volunteerCss.options} text-center`}>Alexandria</option>
                                            <option value={"Monufia"} className={`${volunteerCss.options} text-center`}>Monufia</option>
                                            <option value={"Minya"} className={`${volunteerCss.options} text-center`}>Minya</option>
                                            <option value={"Gharbia"} className={`${volunteerCss.options} text-center`}>Gharbia</option>
                                            <option value={"Faiyum"} className={`${volunteerCss.options} text-center`}>Faiyum</option>
                                            <option value={"Qena"} className={`${volunteerCss.options} text-center`}>Qena</option>
                                            <option value={"Asyut"} className={`${volunteerCss.options} text-center`}>Asyut</option>
                                            <option value={"Sohag"} className={`${volunteerCss.options} text-center`}>Sohag</option>
                                            <option value={"Ismailia"} className={`${volunteerCss.options} text-center`}>Ismailia</option>
                                            <option value={"Beni Suef"} className={`${volunteerCss.options} text-center`}>Beni Suef</option>
                                            <option value={"Qalyubia"} className={`${volunteerCss.options} text-center`}>Qalyubia</option>
                                            <option value={"Aswan"} className={`${volunteerCss.options} text-center`}>Aswan</option>
                                            <option value={"Damietta"} className={`${volunteerCss.options} text-center`}>Damietta</option>
                                            <option value={"Port Said"} className={`${volunteerCss.options} text-center`}>Port Said</option>
                                            <option value={"Luxor"} className={`${volunteerCss.options} text-center`}>Luxor</option>
                                            <option value={"6th of October"} className={`${volunteerCss.options} text-center`}>6th of October</option>
                                            <option value={"Other"} className={`${volunteerCss.options} text-center`}>Other</option>
                                        </select>
                                        <input id='city' value={formikObj.values.city} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${volunteerCss.inputstyle} form-control rounded-5 text-center w-25`} type="text" placeholder='City' />
                                    </div>
                                    <div className={`${volunteerCss.inputsSize} d-flex justify-content-center mb-4`}>
                                        <input value={formikObj.values.phone} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} name='phone' className={`${volunteerCss.inputstyle} text-black form-control me-3  rounded-5 text-center w-25`} type="text" placeholder='Your Phone Number' />
                                    </div>

                                    <div className={`${volunteerCss.inputsSize} d-flex justify-content-center`}>
                                        <button type='submit' className="btn btn-dark rounded-3"> {isloading ? <ThreeDots
                                            visible={true}
                                            height="30"
                                            width="60"
                                            color="#4fa94d"
                                            radius="12"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        /> : `Submit`}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-5 bg-danger'>
                        <div className='position-absolute ms-5 mb-5 start-0'>
                            <Link to={"/home"} className='text-decoration-none text-dark h5'><i className="fa-solid fa-chevron-left"></i> Go to home</Link>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    </>
}
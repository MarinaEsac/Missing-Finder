import React, { useContext, useState } from 'react'
import reportCss from './report.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../Authentication/Authentication';
import axios from 'axios';
import { useFormik } from 'formik';
import { FallingLines } from 'react-loader-spinner';

export default function Report() {
    const navigate = useNavigate();
    const { loginToken, baseUrl } = useContext(authContext);

    const [imageFiles, setImageFiles] = useState([]);
    const [isloading, setisloading] = useState(false)

    const formikObj = useFormik({
        initialValues: {
            images: imageFiles,
            label1: '',
            missingGender: '',
            healthStatus: '',
            age: '',
            missingPersonClassification: '',
            wherePersonLost: '',
            absenceReport: '',
            birthMark: '',
            phone: '',
            relationMissingPerson: '',
            country: '',
            city: '',
            dateOfLoss: '',
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            imageFiles.forEach((image, index) => {
                formData.append(`File${index + 1}`, image);
            });
            formData.append('label1', values.label1);
            formData.append('missingGender', values.missingGender);
            formData.append('healthStatus', values.healthStatus);
            formData.append('age', values.age);
            formData.append('missingPersonClassification', values.missingPersonClassification);
            formData.append('wherePersonLost', values.wherePersonLost);
            formData.append('absenceReport', values.absenceReport);
            formData.append('birthMark', values.birthMark);
            formData.append('phone', values.phone);
            formData.append('relationMissingPerson', values.relationMissingPerson);
            formData.append('country', values.country);
            formData.append('city', values.city);
            formData.append('dateOfLoss', values.dateOfLoss);

            setisloading(true);
            try {
                const { data } = await axios.post(`${baseUrl}/missingPersons/addFinder`, formData, { headers: { authorization: loginToken } })
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
            if (!values.age.match(/^(?:100|[1-9]?[0-9])$/)) {
                errors.age = "Please enter the age of the missing person";
            }
            if (!values.dateOfLoss) {
                errors.dateOfLoss = "Please enter the date of loss"
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
            if (!values.missingGender) {
                errors.missingGender = "Please select gender"
            }
            if (!values.absenceReport) {
                errors.absenceReport = "Please Enter absence Report"
            }
            if (!values.missingPersonClassification) {
                errors.missingPersonClassification = "Please Enter status of the missing"
            }
            if (!values.wherePersonLost) {
                errors.wherePersonLost = "Please enter the Description"
            }
            if (!values.birthMark) {
                errors.birthMark = "Please enter the birth mark or write don't know"
            }
            if (!values.phone.match(/^(010|011|012|015)\d{8}$/)) {
                errors.phone = "Please enter your phone number";
            }
            if (!values.relationMissingPerson) {
                errors.relationMissingPerson = "Please specify your relationship to the missing person"
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
            <section className={`${reportCss.bg} px-4 vh-100 d-flex align-items-center justify-content-center`}>
                <div className={`container-fluid rounded-4 ${reportCss.layer} overflow-hidden`}>
                    <div className="row">
                        <div className="py-4 d-flex justify-content-center">
                            <div className='d-flex w-100'>
                                <div className='col-lg-4 col-md-4 text-center pb-4 d-flex justify-content-center align-items-center flex-column'>
                                    <div className=' w-75 mb-5'>
                                        {imageFiles.map((image, index) => (
                                            <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} className={`${reportCss.missingPhotos} pe-1 mb-1`} />
                                        ))}
                                        <label className={`${reportCss.lable} d-block mb-2 h5 btn btn-light rounded-5 opacity-75 mb-3`} htmlFor="input-file">Upload 3 Photos <i className="fa-solid fa-upload"></i></label>
                                        <input className='d-none' onChange={handleImageChange} multiple type="file" accept='image/jpeg, image/png, image/jpg' id='input-file' />
                                        <div className='spans'>
                                            <input id='label1' value={formikObj.values.label1} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.inputstyle} mb-2 form-control rounded-5 text-center`} type="text" placeholder='Name' />
                                            <input id='age' value={formikObj.values.age} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.inputstyle} mb-2 form-control rounded-5 text-center`} type="text" placeholder='Age' />
                                            <select value={formikObj.values.country} onChange={(e) => formikObj.setFieldValue('country', e.target.value)} className={`${reportCss.inputstyle} rounded-5 form-select form-select-md w-100 mb-2 pe-2`} aria-label="Small select example">
                                                <option value={"cairo"} className={`${reportCss.options} text-center`}>Country</option>
                                                <option value={"New Valley"} className={`${reportCss.options} text-center`}>New Valley</option>
                                                <option value={"Matruh"} className={`${reportCss.options} text-center`}>Matruh</option>
                                                <option value={"Red Sea"} className={`${reportCss.options} text-center`}>Red Sea</option>
                                                <option value={"Cairo"} className={`${reportCss.options} text-center`}>Cairo</option>
                                                <option value={"Giza"} className={`${reportCss.options} text-center`}>Giza</option>
                                                <option value={"South Sinai"} className={`${reportCss.options} text-center`}>South Sinai</option>
                                                <option value={"North Sinai"} className={`${reportCss.options} text-center`}>North Sinai</option>
                                                <option value={"Suez"} className={`${reportCss.options} text-center`}>Suez</option>
                                                <option value={"Beheira"} className={`${reportCss.options} text-center`}>Beheira</option>
                                                <option value={"Helwan"} className={`${reportCss.options} text-center`}>Helwan</option>
                                                <option value={"Sharqia"} className={`${reportCss.options} text-center`}>Sharqia</option>
                                                <option value={"Dakahlia"} className={`${reportCss.options} text-center`}>Dakahlia</option>
                                                <option value={"Kafr el-Sheikh"} className={`${reportCss.options} text-center`}>Kafr el-Sheikh</option>
                                                <option value={"Alexandria"} className={`${reportCss.options} text-center`}>Alexandria</option>
                                                <option value={"Monufia"} className={`${reportCss.options} text-center`}>Monufia</option>
                                                <option value={"Minya"} className={`${reportCss.options} text-center`}>Minya</option>
                                                <option value={"Gharbia"} className={`${reportCss.options} text-center`}>Gharbia</option>
                                                <option value={"Faiyum"} className={`${reportCss.options} text-center`}>Faiyum</option>
                                                <option value={"Qena"} className={`${reportCss.options} text-center`}>Qena</option>
                                                <option value={"Asyut"} className={`${reportCss.options} text-center`}>Asyut</option>
                                                <option value={"Sohag"} className={`${reportCss.options} text-center`}>Sohag</option>
                                                <option value={"Ismailia"} className={`${reportCss.options} text-center`}>Ismailia</option>
                                                <option value={"Beni Suef"} className={`${reportCss.options} text-center`}>Beni Suef</option>
                                                <option value={"Qalyubia"} className={`${reportCss.options} text-center`}>Qalyubia</option>
                                                <option value={"Aswan"} className={`${reportCss.options} text-center`}>Aswan</option>
                                                <option value={"Damietta"} className={`${reportCss.options} text-center`}>Damietta</option>
                                                <option value={"Port Said"} className={`${reportCss.options} text-center`}>Port Said</option>
                                                <option value={"Luxor"} className={`${reportCss.options} text-center`}>Luxor</option>
                                                <option value={"6th of October"} className={`${reportCss.options} text-center`}>6th of October</option>
                                                <option value={"Other"} className={`${reportCss.options} text-center`}>Other</option>
                                            </select>
                                            <input id='city' value={formikObj.values.city} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.inputstyle} mb-2 form-control rounded-5 text-center`} type="text" placeholder='City' />
                                            <div className=''>
                                                <label className='text-white' htmlFor="dateOfLoss">Date Of Loss </label>
                                                <input id='dateOfLoss' value={formikObj.values.dateOfLoss} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.inputstyle} mb-2 form-control rounded-5 text-center`} type="date" placeholder='Date Of Missing' />
                                            </div>
                                        </div>
                                    </div>
                                    {formikObj.errors.images && formikObj.touched.images || formikObj.errors.label1 && formikObj.touched.label1 || formikObj.errors.age && formikObj.touched.age || formikObj.errors.dateOfLoss && formikObj.touched.dateOfLoss || formikObj.errors.country && formikObj.touched.country || formikObj.errors.city && formikObj.touched.city || formikObj.errors.healthStatus && formikObj.touched.healthStatus || formikObj.errors.missingGender && formikObj.touched.missingGender || formikObj.errors.absenceReport && formikObj.touched.absenceReport || formikObj.errors.missingPersonClassification && formikObj.touched.missingPersonClassification || formikObj.errors.wherePersonLost && formikObj.touched.wherePersonLost || formikObj.errors.birthMark && formikObj.touched.birthMark || formikObj.errors.phone && formikObj.touched.phone || formikObj.errors.relationMissingPerson && formikObj.touched.relationMissingPerson ? <div className='alert alert-danger rounded-3 w-75 py-3 d-flex justify-content-center align-items-center'>{formikObj.errors.images || formikObj.errors.label1 || formikObj.errors.age || formikObj.errors.dateOfLoss || formikObj.errors.country || formikObj.errors.city || formikObj.errors.healthStatus || formikObj.errors.missingGender || formikObj.errors.absenceReport || formikObj.errors.missingPersonClassification || formikObj.errors.wherePersonLost || formikObj.errors.birthMark || formikObj.errors.phone || formikObj.errors.relationMissingPerson}</div> : ""}
                                </div>
                                <div className='col-lg-8 col-md-8'>
                                    <div className=''>
                                        <p className={`${reportCss.color}`}>Reporting a missing person</p>
                                    </div>
                                    <div className='inputs d-flex flex-colum w-100'>
                                        <div className='w-25 me-5'>
                                            <span className={`${reportCss.spanstyle}  mb-2 form-control rounded-5 text-center`}>Health status</span>
                                            <span className={`${reportCss.spanstyle} mb-2 form-control rounded-5 text-center`}>Gender</span>
                                            <span className={`${reportCss.spanstyle} mb-2 form-control rounded-5 text-center`}>absence Report</span>
                                            <span className={`${reportCss.spanstyle} mb-2 form-control rounded-5 text-center`}>status of the missing </span>
                                        </div>
                                        <div className="first-column me-5">
                                            <div className='health mt-1 mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.radiostyle} form-check-input me-2`} id='healthy' type="radio" value="healthy" name='healthStatus' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="healthy">Healthy</label>
                                            </div>
                                            <div className='gender mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.radiostyle} form-check-input me-2`} value='Male' id='Male' type="radio" name='missingGender' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="Male">Male</label>
                                            </div>
                                            <div className='absence mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.radiostyle} form-check-input me-2`} value="Yes" id='Yes' type="radio" name='absenceReport' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="Yes">Yes</label>
                                            </div>
                                            <div className='status mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.radiostyle} form-check-input me-2`} id='Lost' type="radio" value="Lost" name='missingPersonClassification' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="Lost">Lost</label>
                                            </div>
                                        </div>
                                        <div className="second-column me-5">
                                            <div className='health mt-1 mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.radiostyle} form-check-input me-2`} id='sick' type="radio" value="sick" name='healthStatus' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="sick">sick</label>
                                            </div>
                                            <div className='gender mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.radiostyle} form-check-input me-2`} value='Female' id='Female' type="radio" name='missingGender' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="Female">Female</label>
                                            </div>
                                            <div className='absence mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.radiostyle} form-check-input me-2`} value="No" id='No' type="radio" name='absenceReport' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="No">No</label>
                                            </div>
                                            <div className='status mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.radiostyle} form-check-input me-2`} id='Kidnapped' type="radio" value="Kidnapped" name='missingPersonClassification' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="Kidnapped">Kidnapped</label>
                                            </div>
                                        </div>
                                        <div className="third-column me-2">
                                            <div className='health mt-1 mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.radiostyle} form-check-input me-2`} id='special' type="radio" value="SpecialNeeds" name='healthStatus' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="special">special Needs</label>
                                            </div>
                                            <div className={`${reportCss.hide} gender mb-3`}>
                                                <input className={`${reportCss.radiostyle} form-check-input me-2`} value={'Female'} id='female' type="radio" name='gender' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="female">Female</label>
                                            </div>
                                            <div className={`absence mb-3`}>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.radiostyle} form-check-input me-2`} value="No clue" id='No clue' type="radio" name='absenceReport' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="No clue">No clue</label>
                                            </div>
                                            <div className='status mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.radiostyle} form-check-input me-2`} id='Runaway' type="radio" value="Runaway" name='missingPersonClassification' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="Runaway">Runaway</label>
                                            </div>
                                        </div>
                                        <div className="fourth-column">
                                            <div className={`${reportCss.hide} mt-1 mb-3`}>
                                                <input className={`${reportCss.radiostyle} form-check-input me-2`} id='special0' type="radio" name='health Status' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="special0">special Needs</label>
                                            </div>
                                            <div className={`${reportCss.hide} gender mb-3`}>
                                                <input className={`${reportCss.radiostyle} form-check-input me-2`} value={'Female'} id='female0' type="radio" name='gender' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="female0">Female</label>
                                            </div>
                                            <div className={`${reportCss.hide} absence mb-3`}>
                                                <input className={`${reportCss.radiostyle} form-check-input me-2`} id='No0' type="radio" name='absenceReport' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="No0">No</label>
                                            </div>
                                            <div className='status mb-3'>
                                                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className={`${reportCss.radiostyle} form-check-input me-2`} id='others' type="radio" value="others" name='missingPersonClassification' />
                                                <label className={`${reportCss.rediostyle} h5`} htmlFor="others">Other</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <textarea value={formikObj.values.wherePersonLost} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className='rounded-4' placeholder='Description place of missing ,clothes ,etc|' name="wherePersonLost" id="wherePersonLost" cols="102" rows="10"></textarea>
                                    </div>
                                    <div className="mb-2">
                                        <textarea value={formikObj.values.birthMark} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} className='rounded-4' placeholder="Birthmark, scars, moles, body marks, wine stain (if you don't know write don't know)" name="birthMark" id="birthMark" cols="102" rows="10"></textarea>
                                    </div>
                                    <div className={`${reportCss.inputsSize} d-flex justify-content-center mb-3`}>
                                        <input value={formikObj.values.phone} onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} name='phone' className={`${reportCss.inputstyle} text-black form-control me-3  rounded-5 text-center w-25`} type="text" placeholder='Your Phone Number' />
                                        <select value={formikObj.values.relationMissingPerson} onChange={(e) => formikObj.setFieldValue('relationMissingPerson', e.target.value)} className={`${reportCss.inputstyle} rounded-5 form-select form-select-md w-25`} aria-label="Small select example">
                                            <option className={`${reportCss.options} text-center`} disabled>Relation of missing</option>
                                            <option value={"first degree relative"} className={`${reportCss.options} text-center`}>first degree relative</option>
                                            <option value={"second degree relative"} className={`${reportCss.options} text-center`}>Second degree relative</option>
                                            <option value={"third degree relative"} className={`${reportCss.options} text-center`}>Third degree relative</option>
                                            <option value={"others"} className={`${reportCss.options} text-center`}>Other</option>
                                        </select>
                                    </div>
                                    <div className={`${reportCss.inputsSize} d-flex justify-content-center`}>
                                        <button type='submit' className="btn btn-dark rounded-3"> {isloading ? <FallingLines
                                            color="#4fa94d"
                                            width="45"
                                            visible={true}
                                            ariaLabel="falling-circles-loading"
                                        /> : `Submit`}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            <div className='position-absolute ms-5 mb-5 bottom-0 start-0'>
                <Link to={"/home"} className='text-decoration-none text-dark h5'><i className="fa-solid fa-chevron-left"></i> Go to home</Link>
            </div>
                </div>
            </section>
        </form>
    </>
}
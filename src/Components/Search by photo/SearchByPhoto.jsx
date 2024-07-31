import React, { useContext, useState } from 'react'
import searchByPhoto from './searchByPhoto.module.css'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Authentication/Authentication';
import { useFormik } from 'formik';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';

export default function SearchByPhoto() {
    const navigate = useNavigate();
    const { loginToken, setMatchingMissing, matchingMissing, setMatchingFound, matchingFound, baseUrl } = useContext(authContext);

    const [imageFile, setImageFile] = useState(null)
    const [isloading, setisloading] = useState(false)
    const [errMsg, setErrMsg] = useState(null)

    const formikObj = useFormik({
        initialValues: {
            image: imageFile,
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            if (imageFile) {
                formData.append('File1', values.File1);
            }
            setisloading(true);
            try {
                    const { data } = await axios.post(`${baseUrl}/missingPersons/foundPersons/check-fac`, formData, {
                    headers: { authorization: loginToken }
                });
                if (data.keyRes === "missingPersons") {
                    setTimeout(function () {
                        navigate('/foundaMatching')
                    }, 500)
                    setMatchingMissing(data.missingData)
                    localStorage.setItem('MissingResult', JSON.stringify(data.missingData))
                    console.log(matchingMissing);
                }
                else if (data.keyRes === "foundPersons") {
                    setTimeout(function () {
                        navigate('/foundaMatching1')
                    }, 500)
                    setMatchingFound(data.foundData)
                    localStorage.setItem('FoundData', JSON.stringify(data.foundData))
                    console.log(matchingFound);
                }
                else if (data.success === false) {
                    setTimeout(function () {
                        navigate('/notfind')
                    }, 500)
                    console.log(data);
                }
            } catch (err) {
                if (!imageFile) {
                    setErrMsg("Please enter a photo")
                }
                if (err.response.data.message === "TypeError: Cannot read properties of undefined (reading 'label')") {
                    setErrMsg("Please enter a clear photo of a person")
                }
            }
            setisloading(null);
        },
    });
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        formikObj.setFieldValue('File1', file);
        setErrMsg(null)
    }
    return <>
        <form onSubmit={formikObj.handleSubmit}>
            <section className={`${searchByPhoto.bg} vh-100 d-flex justify-content-center align-items-center`}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className={`${searchByPhoto.layer} d-flex justify-content-center align-items-center flex-column rounded-5`}>
                                <div className='mb-4 w-75'>
                                    <h3 className='m-auto h3'>Please upload a photo of the missing person for search. If not found, you can file a report after the search result.</h3>
                                </div>
                                <div className='w-75 d-flex justify-content-center flex-column align-items-center'>
                                    {imageFile && (
                                        <img src={URL.createObjectURL(imageFile)} className={`${searchByPhoto.missingPhoto} rounded-4 mb-2`} alt="missing photo" />
                                    )}
                                    {errMsg ? <div className='alert alert-danger rounded-3'>{errMsg}</div> : ""}
                                    <label className={`${searchByPhoto.lable} h5 btn btn-light rounded-5 w-25 opacity-75 mb-3`} htmlFor="input-file">Upload a Photo <i className="fa-solid fa-upload"></i></label>
                                    <input onChange={handleImageChange} onBlur={formikObj.handleBlur} className='d-none' type="file" accept='image/jpeg, image/png, image/jpg, image/heic' id='input-file' />
                                    <button type='submit' className="btn btn-dark rounded-3"> {isloading ? <RotatingLines
                                        visible={true}
                                        height="40"
                                        width="40"
                                        color="grey"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        ariaLabel="rotating-lines-loading"
                                        wrapperStyle={{}}
                                    /> : `Search`}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    </>
}
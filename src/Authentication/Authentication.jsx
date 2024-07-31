import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export function AuthProvider({ children }) {
    const baseUrl = "https://render-missing-finder.onrender.com";
    // const baseUrl = "http://localhost:5000";

    const [userToken, setUserToken] = useState(null);
    const [loginToken, setLoginToken] = useState(null);
    const [userEmail, setUserEmail] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [matchingMissing, setMatchingMissing] = useState(null)
    const [matchingFound, setMatchingFound] = useState(null)

    useEffect(function () {
        if (localStorage.getItem('tkn') !== null) {
            setUserToken(localStorage.getItem('tkn'))
        }
    }, [])
    useEffect(function () {
        if (localStorage.getItem('MissingResult') !== null) {
            setMatchingMissing(JSON.parse(localStorage.getItem('MissingResult')))
        }
    }, [])
    useEffect(function () {
        if (localStorage.getItem('FoundData') !== null) {
            setMatchingFound(JSON.parse(localStorage.getItem('FoundData')))
        }
    }, [])
    useEffect(function () {
        if (localStorage.getItem('info') !== null) {
            setUserInfo(JSON.parse(localStorage.getItem('info')))
        }
    }, [])
    useEffect(function () {
        if (localStorage.getItem('email') !== null) {
            setUserEmail(localStorage.getItem('email'))
        }
    }, [])
    useEffect(function () {
        if (localStorage.getItem('auth') !== null) {
            setLoginToken(localStorage.getItem('auth'))
        }
    }, [])



    return <authContext.Provider value={{ userToken, setUserToken, userEmail, setUserEmail, loginToken, setLoginToken, matchingMissing, setMatchingMissing, matchingFound, setMatchingFound, userInfo, setUserInfo, baseUrl }}>

        {children}

    </authContext.Provider>
}
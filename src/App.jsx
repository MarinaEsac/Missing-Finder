import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Authentication/Authentication';
import SignUp from './Components/Sign Up/SignUp';
import Verification from './Components/Verification/Verification';
import Login from './Components/LogIn/Login';
import Home from './Components/Home/Home';
import ForgetPassword from './Components/Forget Password/ForgetPassword';
import VerifyCode from './Components/Verify Code/VerifyCode';
import ResetPassword from './Components/Reset Password/ResetPassword';
import Report from './Components/Reporting a missing person/Report';
import ReportVolunteer from './Components/Reporting volunteer/ReportVolunteer';
import List from './Components/List of missing persons/List';
import ListFound from './Components/List of found persons/ListFound';
import Request from './Components/Request Accept/Request';
import FoundMatching from './Components/found a matching/FoundMatching';
import NotFind from './Components/not find/NotFind';
import Settings from './Components/Settings/Settings';
import About from './Components/pages/About/About';
import ChangePassword from './Components/pages/Change Password/ChangePassword';
import DeleteAccount from './Components/pages/Delete Account/DeleteAccount';
import VerifyDeleteAccount from './Components/verify delete account/VerifyDeleteAccount';
import SearchByPhoto from './Components/Search by photo/SearchByPhoto';
import FoundMatchVolunteer from './Components/Found a matching (Volunteer)/FoundMatchVolunteer';
import FoundResult from './Components/Search Result Volunteer/FoundResult';
import MissingResult from './Components/Search Result/MissingResult';
import SingleCardMissing from './Components/single card (missing)/SingleCardMissing';
import SingleCardFound from './Components/single card (found)/SingleCardFound';
import Matches from './Components/Matches/Matches';
import './App.css';

const myRouter = createBrowserRouter([
  { path: '', element: <Home /> },
  { path: '/SignUp', element: <SignUp /> },
  { path: '/Verification-Account', element: <Verification /> },
  { path: '/LogIn', element: <Login /> },
  { path: '/home', element: <Home /> },
  {
    path: '/settings', element: <Settings />, children: [
      { path: "about", element: <About /> },
      { path: "changePassword", element: <ChangePassword /> },
      { path: "deleteAccount", element: <DeleteAccount /> }
    ]
  },
  { path: "deletAccountCode", element: <VerifyDeleteAccount /> },
  { path: '/report', element: <Report /> },
  { path: '/SearchForTheMissing', element: <SearchByPhoto /> },
  { path: '/confirmedSubmit', element: <Request /> },
  { path: '/foundaMatching', element: <FoundMatching /> },
  { path: '/foundaMatching1', element: <FoundMatchVolunteer /> },
  { path: '/notfind', element: <NotFind /> },
  { path: '/Matches', element: <Matches /> },
  { path: '/missingResult', element: <MissingResult /> },
  { path: '/foundResult', element: <FoundResult /> },
  { path: '/volunteer', element: <ReportVolunteer /> },
  { path: '/listOfMissingPersons', element: <List /> },
  { path: '/listOfFoundPersons', element: <ListFound /> },
  // { path: '/MissingPersoninformation/:id', element: <SingleCardMissing /> },
  { path: '/FoundPersoninformation/:id', element: <SingleCardFound /> },
  { path: '/Forget-Password', element: <ForgetPassword /> },
  { path: '/Verify-code', element: <VerifyCode /> },
  { path: '/Reset-Password', element: <ResetPassword /> },
  { path: '*', element: <Home /> }
])

export default function App() {


  return <AuthProvider>
    <RouterProvider router={myRouter} />
  </AuthProvider>
}


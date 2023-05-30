import './App.css'
//  import TestSubmitNewUser from './components/TestSubmitNewUser'
//  import TestFetchAllPosts from './components/TestFetchAllPosts'
//  import TestPostInput from './components/TestPostInput'
//  import TestFetchAllUsers from './components/TestFetchAllUsers'
//  import TestLogin from './components/TestLogin'
import { Link, Route, Routes } from "react-router-dom";
import Tester from './pages/Tester'
import Login from './pages/Login'
import SignaUpp from './pages/SignaUpp';
import Flow from './pages/Flow'
import NavBar from './components/NavBar';
import UserPage from './pages/UserPage';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Flow /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/signupp' element={ <SignaUpp /> } />
        <Route path='/userpage/:id' element={ <UserPage /> } />
      </Routes>
      <NavBar />
    </>
  )
}

export default App

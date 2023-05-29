import './App.css'
//  import TestSubmitNewUser from './components/TestSubmitNewUser'
//  import TestFetchAllPosts from './components/TestFetchAllPosts'
//  import TestPostInput from './components/TestPostInput'
//  import TestFetchAllUsers from './components/TestFetchAllUsers'
// import TestLogin from './components/TestLogin'
import { Link, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Tester from './pages/Tester'
import SignaUpp from './pages/SignaUpp';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Tester /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/signupp' element={ <SignaUpp /> } />
      </Routes>
    </>
  )
}

export default App

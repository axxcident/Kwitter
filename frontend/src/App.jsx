import './App.css'
//  import TestSubmitNewUser from './components/TestSubmitNewUser'
//  import TestFetchAllPosts from './components/TestFetchAllPosts'
//  import TestPostInput from './components/TestPostInput'
//  import TestFetchAllUsers from './components/TestFetchAllUsers'
// import TestLogin from './components/TestLogin'
import { Link, Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import Tester from './pages/Tester'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Tester /> } />
        <Route path='/login' element={ <Login /> } />
      </Routes>
    </>
  )
}

export default App

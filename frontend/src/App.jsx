import './App.css'
 import TestSubmitNewUser from './components/TestSubmitNewUser'
 import TestFetchAllPosts from './components/TestFetchAllPosts'
 import TestPostInput from './components/TestPostInput'
//  import TestFetchAllUsers from './components/TestFetchAllUsers'
// import TestLogin from './components/TestLogin'

import { Link, Route, Routes } from "react-router-dom";

import {Link} from 'react-router-dom'


function App() {

  return (
    <>
    <h1>GANGBANG</h1>
    {/* <Link to={'/'} /> */}
    <TestSubmitNewUser />


      {/* <h1>LOGIN</h1>
      <TestLogin /> */}

      <TestPostInput />
    <TestFetchAllPosts/>

</>
  )
}

export default App

import './App.css'
//  import TestSubmitNewUser from './components/TestSubmitNewUser'
//  import TestFetchAllPosts from './components/TestFetchAllPosts'
//  import TestPostInput from './components/TestPostInput'
//  import TestFetchAllUsers from './components/TestFetchAllUsers'
//  import TestLogin from './components/TestLogin'
import { Route, Routes } from "react-router-dom";
import Login from './pages/Login'
import SignaUpp from './pages/SignaUpp';
import Flow from './pages/Flow'
import NavBar from './components/NavBar';
import UserPage from './pages/UserPage';
import PostAPostPage from './pages/PostAPostPage';
import PostFocusPage from './pages/PostFocusPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Flow /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/signupp' element={ <SignaUpp /> } />
        <Route path='/userpage/:id' element={ <UserPage /> } />
        <Route path='/post-a-post' element={<PostAPostPage/>} />
        <Route path='/post-focus-page/:post_id/:user_id' element={<PostFocusPage/>} />
      </Routes>
      <NavBar />
    </>
  )
}

export default App

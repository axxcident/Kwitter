import './App.css'
 import TestSubmitNewUser from './components/TestSubmitNewUser'
 import TestFetchAllPosts from './components/TestFetchAllPosts'
 import TestPostInput from './components/TestPostInput'
//  import TestFetchAllUsers from './components/TestFetchAllUsers'
import TestLogin from './components/TestLogin'


function App() {

  return (
    <>
    <h1>GANGBANG</h1>
    <TestSubmitNewUser />


      <h1>LOGIN</h1>
      <TestLogin />

      <TestPostInput />
    <TestFetchAllPosts/>

</>
  )
}

export default App

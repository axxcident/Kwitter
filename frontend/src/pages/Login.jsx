import React from 'react'
import { useNavigate } from 'react-router-dom';
import LoginComp from '../components/LoginComp'

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userId');
  console.log(isLoggedIn)

  React.useEffect(() => {
    if(isLoggedIn != 0) {
      navigate("/")
    }
  }, [isLoggedIn, navigate])

  return (
    <>
      <div className="login-container">
        <h1>Välkommen till Kwitter</h1>
        <LoginComp />
      </div>
    </>
  )
}

export default Login

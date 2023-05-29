import React from 'react'
import { Link, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Post from '../components/Post';
import PostsContainer from '../components/PostsContainer';

const Tester = () => {

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('userId');
  console.log(isLoggedIn)
  const logout = () => {
    localStorage.setItem('userId', 0);
    navigate('/login')
  }


  return (
    <>
    <h1>Testsidan</h1>
    {isLoggedIn==0 ?
      <button>
        <Link to={"/login"}>Logga in</Link>
      </button>
    :
    <button onClick={logout}>Logga Ut</button>
  }


    <h5>Nedan ligger Post komponenten:</h5>
    <Post />
    <h5>Nedan ligger PostContainer komponenten:</h5>
    <PostsContainer />
    </>
  )
}

export default Tester

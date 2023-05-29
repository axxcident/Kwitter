import React from 'react'
import { Link, Route, Routes } from "react-router-dom";

const Tester = () => {
  return (
    <>
    <h1>Testsidan</h1>
    <button>
      <Link to={"/login"}>Logga in</Link>
    </button>
    </>
  )
}

export default Tester

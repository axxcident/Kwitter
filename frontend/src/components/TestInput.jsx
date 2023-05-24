import {useState, useEffect} from 'react'
import React from 'react'
import styled from 'styled-components'

function TestInput() {

     const [inputText, setInputText] = useState('')


     const [formData, setFormData] = useState({
        name: '',
        email: ''
     })

     const handleFormData = (event) =>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
     }

     const handleSubmit = (event) =>{

     }

     const handleInputChange = (event) =>{
        setInputText(event.target.value)
     }

  return (
    <div>
        <Input type="text" value={inputText} onChange={handleInputChange}/>
    </div>
  )
}

export default TestInput

const Input = styled.input`
background-color: red;
color: white;

`

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
        event.preventDefault()

        axios.post('', formData).then(response =>{
            console.log(response.data)
        })
        .catch(error =>{
            console.log(error)
        })
     }

     const handleInputChange = (event) =>{
        setInputText(event.target.value)
     }

  return (
    <div>
        <h1>TESTAR INPUT NO POST!!!</h1>
        <Input type="text" value={inputText} onChange={handleInputChange}/>

        <h1>POST</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Namn:
                <input type="text" name="name" value={formData.name} onChange={handleFormData} />
            </label>
            <label>
                email:
                <input type="email" name="name" value={formData.email} onChange={handleFormData} />
            </label>
            <button type="submit">Skicka</button>
        </form>
    </div>
  )
}

export default TestInput

const Input = styled.input`
background-color: red;
color: white;

`

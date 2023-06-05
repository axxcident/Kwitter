import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router'

// Styled component for the container div
const Container = styled.div`
    font-family: 'Poppins', sans-serif;
    .input-header {
        margin-top: 1rem;
    }

    .login-text {
        text-align: center;
        font-weight: bold;
        font-size: 0.9rem;
        padding: 0.8rem;
    }

    .input-container {
        width: 100%;
        margin: 0 auto;
        margin-bottom: 3rem;
    }
`

// Styled component for the heading

// Styled component for the form
const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const LoginContainer = styled.div``

// Styled component for form fields
const FormField = styled.label`
    display: grid;
    font-weight: bold;
    width: 100%;

    input {
        max-width: 600px;
        font-weight: bolder;
        padding: 0.7rem;
        margin-top: 0.5rem;
        border-radius: 7px;
        border: none;
    }
`

const ButtonContainer = styled.div`
    display: grid;
`

const SubmitButton = styled.button`
    text-align: center;
    width: 100%;
    margin: 0 auto;
    max-width: 200px;
    background-color: transparent;
    border: none;
    border: 1px solid #000;
    background-color: #000;
    color: #fff;
    font-weight: bold;
    padding: 1rem;
    border-radius: 100px;
    &:hover {
        background-color: #fff;
        color: #000;
    }
`

const SignInButton = styled.button`
    text-align: center;
    width: 100%;
    margin: 0 auto;
    border: none;
    background-color: transparent;
    font-weight: bold;
    padding: 1rem;
    border-radius: 100px;
    max-width: 200px;
    border: 1px solid #000;
    &:hover {
        background-color: #fff;
    }
`

function TestLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/signupp')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password)
        axios
            .post('http://localhost:8800/login', {
                email,
                password
            })
            .then((response) => {
                console.log('User found')
                console.log(response.data[0].id)
                localStorage.setItem('userId', response.data[0].id)

                setEmail('')
                setPassword('')
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Container>
            <LoginContainer>
                <Form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <FormField>
                            <p className="input-header">Mejladress</p>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormField>
                        <FormField>
                            <p className="input-header">Lösenord</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FormField>
                    </div>
                    <SubmitButton type="submit">Logga in</SubmitButton>
                </Form>
                <p className="login-text">Eller</p>
                <ButtonContainer>
                    <SignInButton type="button" onClick={handleClick}>
                        Skapa Konto
                    </SignInButton>
                </ButtonContainer>
            </LoginContainer>
        </Container>
    )
}

export default TestLogin

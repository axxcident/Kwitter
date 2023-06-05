import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const SignUppWrap = styled.div`
/* margin: 0 auto; */
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    form {
    }
    /* button {
        display: flex;
    } */
    form input {
        font-weight: bolder;
        padding: 0.7rem;
        margin-top: 0.5rem;
        border-radius: 7px;
        border: none;
    }
    .submitBTN {
        width: 100%;
        text-align: center;
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
    }

    .input-container {
        max-width: 600px;
        display: grid;
        /* width: 100%; */
        /* margin: 0 auto; */
        margin-bottom: 3rem;
    }

    .input-header{
        margin-top: 1rem;
        font-weight: bold;
    }
`

const UserForm = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios
            .post('http://localhost:8800/users/submit', {
                firstname,
                lastname,
                email,
                password
            })
            .then((response) => {
                alert('Välkommen till Kwitter!')

                setFirstname('')
                setLastname('')
                setEmail('')
                setPassword('')
                localStorage.setItem('userId', response.data[0].id)
                console.log(response.data)
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <SignUppWrap>
            <form
                className="input-container"
                onSubmit={handleSubmit}
                id="signeraUppFormulär"
            >
                <label>
                    <p className="input-header">Användarnamn</p>
                </label>
                <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
                <label>
                    <p className="input-header">Mejladdress</p>
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>
                    <p className="input-header">Lösenord</p>
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </form>
            <button
                type="submit"
                form="signeraUppFormulär"
                className="submitBTN"
            >
                Skapa Konto
            </button>
        </SignUppWrap>
    )
}

export default UserForm

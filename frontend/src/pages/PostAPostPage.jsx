import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Colors, Shadows } from '../styles'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Container = styled.div`
    background-color: ${Colors.BLUE};

    margin-top: 5rem;
    padding: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: ${Shadows.DROPSHADOWS};
    -webkit-box-shadow: ${Shadows.DROPSHADOWS};
    -moz-box-shadow: ${Shadows.DROPSHADOWS};
`

const CommentForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
`

const CommentTextarea = styled.textarea`
    height: 100px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    resize: vertical;
`

const CommentButton = styled.button`
    padding: 8px 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`

const ErrorMessage = styled.span`
    color: red;
    margin-top: 8px;
`

function PostAPostPage() {
    const [post, setPost] = useState('')
    const [user, setUser] = useState([]);

    const poster_id = localStorage.getItem('userId')

    useEffect(() => {
        axios.get(`http://localhost:8800/users/${poster_id}`)
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, [poster_id]);



    const handlePost = (e) => {
        e.preventDefault()

        axios
            .post('http://localhost:8800/posts/submit', {
                poster_id,
                post
            })
            .then((response) => {
                console.log('CONNECT')

                setPost('')
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <Container>
            <Link to="/" >Avbryt</Link>
            <CommentForm onSubmit={handlePost}>

                <br />
                <label>
                    {user.firstname}
                    <textarea
                        type="text"
                        value={post}
                        onChange={(e) => setPost(e.target.value)}
                        required
                    ></textarea>
                </label>
                <br />
                <button type="submit">Post</button>
            </CommentForm>
            {/* <h2>Kommentarruta</h2>
      <CommentForm onSubmit={handleSubmit}>
        <CommentTextarea
          value={comment}
          onChange={handleChange}
          placeholder="Skriv din kommentar här..."
          rows={4}
          cols={50}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <br />
        <CommentButton type="submit">Skicka kommentar</CommentButton>
      </CommentForm> */}
        </Container>
    )
}

export default PostAPostPage

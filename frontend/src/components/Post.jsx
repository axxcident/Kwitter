import  { useEffect, useState } from 'react';
import axios from 'axios';

import styled from 'styled-components'


function Post(props) {
    const [dateCreated, setDateCreated] = useState(null)
    const [user, setUser] = useState([]);

    function setDate(){
        setDateCreated()

        return
    }

    useEffect(() => {
        axios.get(`http://localhost:8800/users/${props.id}`)
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

  return (
    <Container>
        <TopContainer>{user.firstname} {user.lastname} {props.created} <button>Redigera</button></TopContainer>
        <EmailContainer>{user.email}</EmailContainer>
        <PostContainer>{props.post}</PostContainer>
        <ButtonsContainer></ButtonsContainer>
    </Container>
  )
}

export default Post


const Container = styled.div`
width: 100%;
max-width: 500px;
background-color: #D9D9D9;
padding: 1rem;
margin-bottom: 1.5rem;
border-radius: 10px;
box-shadow: 10px 10px 0px 0px rgba(0,0,0,0.75);
-webkit-box-shadow: 10px 10px 0px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 10px 0px 0px rgba(0,0,0,0.75);
`

const TopContainer = styled.div`
font-weight: bold;

`

const EmailContainer = styled.div`
color: rgba(0,0,0,.5);
`


const PostContainer = styled.div`
font-size: 2rem;

`

const ButtonsContainer = styled.div`
`

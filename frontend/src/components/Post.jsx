import  { useEffect, useState } from 'react';
import axios from 'axios';

import styled from 'styled-components'

import { Colors, TextColor } from '../styles';


function Post(props) {
    const [dateCreated, setDateCreated] = useState(null)
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8800/users/${props.id}`)
          .then(response => {
            setUser(response.data);
            setDateCreated(new Date(props.created));
          })
          .catch(error => {
            console.error(error);
          });
      }, [props.id, props.created]);



      function formatTimeDifference() {
        if (!dateCreated) return '';
        const currentDate = new Date();
        const timeDifference = currentDate - dateCreated;
        if (timeDifference < 60000) {

            const seconds = Math.floor(timeDifference / 1000);
        return `${seconds} sek sedan`;
    } else if (timeDifference < 3600000) {

            const minutes = Math.floor(timeDifference / 60000);
        return `${minutes} min sedan`;
    } else if (timeDifference < 86400000) {

            const hours = Math.floor(timeDifference / 3600000);
        return `${hours} h sedan`;
    } else {

            const days = Math.floor(timeDifference / 86400000);
        return `${days} dagar sedan`;
    }
    }
  return (
    <Container>
        <TopContainer>{user.firstname} {user.lastname} {formatTimeDifference()} <button>Redigera</button></TopContainer>
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
background-color: ${Colors.GREY};
padding: 1rem;
margin-bottom: 1.5rem;
border-radius: 10px;
box-shadow: 10px 10px 0px 0px rgba(0,0,0,1);
-webkit-box-shadow: 10px 10px 0px 0px rgba(0,0,0,1);
-moz-box-shadow: 10px 10px 0px 0px rgba(0,0,0,1);
`

const TopContainer = styled.div`
font-weight: bold;

`

const EmailContainer = styled.div`
color: ${TextColor.LIGHTER};
`


const PostContainer = styled.div`
font-size: 2rem;

`

const ButtonsContainer = styled.div`
`

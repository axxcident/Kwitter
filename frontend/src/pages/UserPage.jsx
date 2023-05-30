import React,{useEffect, useState} from 'react'
import axios from 'axios';
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import { Colors, TextColor } from '../styles';

function UserPage() {

    const {id} = useParams()

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8800/users/${id}`)
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);


  return (
    <><TopContainer />
    <PresentationContainer>
        <Presentation>
            <h1>{user.firstname}</h1>
        </Presentation>
    </PresentationContainer>
    </>
  )
}

export default UserPage

const TopContainer = styled.div`
min-height: 300px;
background-color: ${Colors.BLUE};
`
const PresentationContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;

`
const Presentation = styled.div`
width: 100%;
max-width: 500px
`

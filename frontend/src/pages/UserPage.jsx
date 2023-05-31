import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Colors, TextColor } from '../styles'
import ProfileEdit from '../components/ProfileEdit'
import PostsContainer from '../components/PostsContainer';

function UserPage() {
    const { id } = useParams()

    const [user, setUser] = useState([])
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8800/users/${id}`)
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    // Hämta alla inlägg från en användare
    useEffect(() => {
        axios.get(`http://localhost:8800/users/${id}/posts`)
        .then(response => {
            setUserPosts(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <>
            <TopContainer />
            <PresentationContainer>
                <Presentation>
                <ProfileEdit className="edit-button" user={user} id={id} />
                     <h1 className="user-title">
                        {user.firstname} {user.lastname}
                    </h1>
                    <h1 className="user-email">{user.email}</h1>
                </Presentation>
            </PresentationContainer>
            <PostsContainer posts={userPosts} />
        </>
    )
}

export default UserPage

const TopContainer = styled.div`
    min-height: 200px;
    background-color: #B2D6F8 /* ${Colors.BLUE} */;
`
const PresentationContainer = styled.div`
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.GREY};
    min-height: 200px;
    border-radius: 0 0 50px 50px;
`
const Presentation = styled.div`
    width: 100%;
    max-width: 500px;
    .user-title {
        font-weight: bold;
    }

    .user-email {
        font-weight: 500;
        color: ${TextColor.LIGHTER};
    }
`

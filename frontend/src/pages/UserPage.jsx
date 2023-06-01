import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Colors, TextColor, Shadows } from '../styles'
import ProfileEdit from '../components/ProfileEdit'
import PostsContainer from '../components/PostsContainer'


function UserPage() {
    const { id } = useParams()

    const [user, setUser] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [showLogoutButton, setShowLogoutButton] = useState(false);


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
        axios
            .get(`http://localhost:8800/users/${id}/posts`)
            .then((response) => {
                setUserPosts(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    // Knsk tas bort.knsk överflödig.
    const handleEditProfile = () => {
        setShowLogoutButton(!showLogoutButton);
      };
    //   const handleLogout = () => {
    //     localStorage.removeItem('userId');
    //     console.log("KOMMER VI HIT?")
    //     window.location.href = '/login';
    //   };
    //   {showLogoutButton && <LogoutButton onClick={() => handleLogout}>Logout</LogoutButton>}

    return (
    <>
        <TopContainer />
        <PresentationContainer>
            <ProfileEdit className="edit-button" user={user} id={id} onClick={() => handleEditProfile} />
            <Presentation>
                <p className="user-title">
                    {user.firstname} {user.lastname}
                </p>
                <p className="user-email">{user.email}</p>
            </Presentation>
        </PresentationContainer>
        <ButtonsWrapper>
            <ButtonsContainer>
                <button className="filter-button">Allt</button>
                <button className="filter-button">Mest likes</button>
                <button className="filter-button">
                    {user.firstname}s likes
                </button>
            </ButtonsContainer>
        </ButtonsWrapper>
        <PostsContainer posts={userPosts} />
    </>
    )
}

export default UserPage

const TopContainer = styled.div`
    min-height: 200px;
    background-color: ${Colors.BLUE};
`
const PresentationContainer = styled.div`
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.GREY};
    min-height: 200px;
    /* border-radius: 0 0 50px 50px; */
`
const Presentation = styled.div`
    padding: 1rem;
    width: 100%;
    max-width: 500px;

    .user-title,
    .user-email {
        font-size: 1.2rem;
    }

    .user-title {
        font-weight: bold;
    }
    .user-email {
        font-weight: 500;
        color: ${TextColor.LIGHTER};
    }
`

const ButtonsWrapper = styled.div`
    min-height: 50px;
    background-color: ${Colors.GREY};
    box-shadow: ${Shadows.DROPSHADOWS};
    -webkit-box-shadow: ${Shadows.DROPSHADOWS};
    -moz-box-shadow: ${Shadows.DROPSHADOWS};
    margin-bottom: 2rem;
    border-radius: 0 0 10px 10px;
`
const ButtonsContainer = styled.div`
    padding: 0 1rem;
    max-width: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .filter-button {
        text-align: center;
        background: none;
        border: none;
        font-weight: bold;
        border-bottom: 3px solid transparent;
    }

    .filter-button:active{
        border-bottom: 3px solid #000;
    }
`

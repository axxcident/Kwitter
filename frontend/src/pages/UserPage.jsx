import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Colors, TextColor, Shadows } from '../styles'
import ProfileEdit from '../components/ProfileEdit'
import PostsContainer from '../components/PostsContainer'

function UserPage() {
    const { id } = useParams()
    const userId = localStorage.getItem('userId')

    const [user, setUser] = useState([])

    const [userPosts, setUserPosts] = useState([])
    const [userLikes, setUserLikes] = useState([])

    const [showLogoutButton, setShowLogoutButton] = useState(false)

    const [sortOption, setSortOption] = useState('created_at')
    const [activeButton, setActiveButton] = useState('')

    const [editMode, setEditMode] = useState(false);


    // Hämtar alla users likade post
    useEffect(() => {
        axios
            .get(`http://localhost:8800/users/${id}/liked-posts`)
            .then((response) => {
                setUserLikes(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [id])

    // Hämtar användare
    useEffect(() => {
        axios
            .get(`http://localhost:8800/users/${id}`)
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [id])

    // Hämta alla inlägg från en användare och sortera dem
    useEffect(() => {
        axios
            .get(`http://localhost:8800/users/${id}/posts`)
            .then((response) => {
                let sortedPosts = response.data
                if (sortOption === 'likes') {
                    sortedPosts.sort((a, b) => b.likes - a.likes)
                } else if (sortOption === 'created_at') {
                    sortedPosts.sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                    )
                }
                setUserPosts(sortedPosts)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [id, sortOption])

    // Knsk tas bort.knsk överflödig.
    const handleEditProfile = () => {
        setShowLogoutButton(!showLogoutButton)
        setEditMode(!editMode);
    }

    // Ändrar sortering
    const handleSortOptionChange = (option) => {
        if (option === 'user_likes') {
            setUserPosts(userLikes)
            setActiveButton('user_likes')
        } else {
            setSortOption(option)
            setActiveButton(option)
        }
    }

    const handleCancel = () => {
        setEditMode(false);
      };

    return (
        <>
            <TopContainer >
            {id === userId && (
                    <ProfileEdit
                        className="edit-button"
                        user={user}
                        id={id}
                        editMode={editMode}
          onCancel={handleCancel}
                        /* onClick={handleEditProfile} */
                    />
                )}
                </TopContainer>
            <PresentationContainer>
                 <Presentation>
                    <p className="user-title">
                        {user?.firstname} {/* {user?.lastname} */}
                    </p>
                    <p className="user-email">{user?.email}</p>
                    <p className="user-bio">{user?.lastname}</p>
                </Presentation>
            </PresentationContainer>
            <ButtonsWrapper>
                <ButtonsContainer>
                    <button
                        onClick={() => handleSortOptionChange('created_at')}
                        className={`filter-button ${
                            activeButton === 'created_at' ? 'active' : ''
                        }`}
                    >
                        Allt
                    </button>
                    <button
                        onClick={() => handleSortOptionChange('likes')}
                        className={`filter-button ${
                            activeButton === 'likes' ? 'active' : ''
                        }`}
                    >
                        Mest likes
                    </button>
                    <button
                        onClick={() => handleSortOptionChange('user_likes')}
                        className={`filter-button ${
                            activeButton === 'user_likes' ? 'active' : ''
                        }`}
                    >
                        {user.firstname}s likes
                    </button>
                </ButtonsContainer>
            </ButtonsWrapper>
            <FlowContainer>
            <PostsContainer posts={userPosts} />
            </FlowContainer>
        </>
    )
}

export default UserPage

const TopContainer = styled.div`
    min-height: 200px;
    background-color: ${Colors.GREEN};
`
const PresentationContainer = styled.div`
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    background-color: ${Colors.GREY};
    min-height: 200px;

    @media (min-width: 370px) and (max-width: 630px) {
        justify-content: flex-start;
  }
`;

const Presentation = styled.div`
width: 100%;
    max-width: 1200px;
    padding: 1rem;
    /* margin-right: -30rem; */


    .user-title,
    .user-email {
        font-size: 1.2rem;
    }

    .user-bio{
        font-size: 1rem;
        margin-top: 1rem;
    }

    .user-title {
        font-weight: bold;
    }
    .user-email {
        font-weight: 500;
        color: ${TextColor.LIGHTER};
    }

    @media (max-width: 375px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 0;
  }
`;


const ButtonsWrapper = styled.div`
    position: sticky;
    top: 0;
    min-height: 50px;
    background-color: ${Colors.GREY};
    box-shadow: ${Shadows.DROPSHADOWS};
    -webkit-box-shadow: ${Shadows.DROPSHADOWS};
    -moz-box-shadow: ${Shadows.DROPSHADOWS};
    padding-top: 60px;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    border-radius: 0 0 10px 10px;

    @media (max-width: 425px) {
        max-height: 30px;
        padding-top: 20px;
    }
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

    .filter-button.active {
        border-bottom: 3px solid #000;
    }
`

const FlowContainer = styled.div`
margin-bottom: 90px;
`

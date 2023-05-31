import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Colors, TextColor } from '../styles';

function ProfileEdit({ user, id }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
  });

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
    };

    axios
      .put(`http://localhost:8800/users/${id}/put`, updatedUser)
      .then(() => {
        console.log('Profile updated successfully');
        setEditMode(false);
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <Container>
      {!editMode ? (
        <>
{/*           <h1 className="user-title">
            {user.firstname} {user.lastname}
          </h1>
          <h1 className="user-email">{user.email}</h1> */}
          <EditButton onClick={handleEditProfile}>Redigera profil</EditButton>
        </>
      ) : (
        <>
          <Input
            type="text"
            name="firstname"
            placeholder="Skriv in ditt förnamn"
            value={formData.firstname}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="lastname"
            placeholder="Skriv in ditt efternamn"
            value={formData.lastname}
            onChange={handleInputChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="exempel.email@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Skriv in ditt lösenord"
            value={formData.password}
            onChange={handleInputChange}
          />
          <SaveButton onClick={handleSaveProfile}>Spara</SaveButton>
        </>
      )}
    </Container>
  );
}

export default ProfileEdit;

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 1rem;
  margin-bottom: .5rem;
`;

const EditButton = styled.button`
  background-color: #B2D6F8 /* ${Colors.BLUE} */;
  color: ${TextColor.LIGHT};
  padding: .5rem;
  margin: 1rem;
  border: solid black .5px;
  border-radius: 5rem;
  cursor: pointer;
  right: 2rem;
  top: 6rem;
  position: absolute;
`;

const SaveButton = styled.button`
  background-color: #333333 /* ${Colors.BLUE} */;
  color: white /* ${TextColor.LIGHT} */;
  padding: 10px;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
`;

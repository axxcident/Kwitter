import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Colors, TextColor } from '../styles';


function ProfileEdit({ user, id, onCancel}) {
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

  const handleCancel = () => {
    setEditMode(false);
    onCancel();
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Är du säker att du vill radera ditt konto?')) {
    axios
      .delete(`http://localhost:8800/users/${id}/delete`)
      .then(() => {
        console.log('Account deleted successfully');
        localStorage.removeItem('userId');
        console.log('Kontot är raderad')
        window.location.replace('/login');
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    console.log("Användaren är utloggad")
    window.location.href = '/login';
  };

  return (
    <Container>
      {!editMode ? (
        <>
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
            placeholder='Skriv in ditt efternamn'
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
          <CancelButton onClick={handleCancel}>Avbryt</CancelButton>
          <LogoutButton onClick={handleLogout}>Logga ut</LogoutButton>
          <DeleteButton onClick={handleDeleteAccount}>Radera kontot</DeleteButton>
        </>
      )}
    </Container>
  );
}

export default ProfileEdit;

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
`;

const LogoutButton = styled.button`
    background-color: ${Colors.RED};
    color: ${TextColor.LIGHT};
    padding: 10px;
    margin-left: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`
const DeleteButton = styled.button`
    background-color: ${Colors.RED};
    color: ${TextColor.LIGHT};
    padding: 10px;
    margin-left: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`

const Input = styled.input`
  width: 300%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  margin-top: 1rem;
  margin-bottom: 10px;
  margin-left: -10rem;
  margin-right: 5rem;
`;

const EditButton = styled.button`
  background-color: #B2D6F8 /* ${Colors.BLUE} */;
  color: ${TextColor.LIGHT};
  padding: .5rem;
  border: solid black .5px;
  border-radius: 5rem;
  cursor: pointer;
  right: 2rem;
  top: 6rem;
  position: absolute;
`;

const SaveButton = styled.button`
  background-color: ${Colors.BLUE};
  color: ${TextColor.LIGHT};
  padding: 10px;
  margin-left: -10rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: ${Colors.GREY};
  color: ${TextColor.DARK};
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

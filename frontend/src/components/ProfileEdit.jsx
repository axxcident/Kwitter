import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Colors, TextColor, Shadows } from '../styles';


function ProfileEdit({ user, id}) {
  const [formData, setFormData] = useState({
    firstname: user.firstname || '',
    lastname: user.lastname || '',
    email: user.email || '',
    password: user.password || '',
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleModal = () => {
    setModalOpen(!isModalOpen)
  }

  const handleSaveProfile = () => {
    const updatedUser = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
    };

    axios.put(`http://localhost:8800/users/${id}/put`, updatedUser)
      .then(() => {
        console.log('Profile updated successfully');
        // setEditMode(false);
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert("Något gick fel")
      });
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
    alert('Du loggas ut')
    window.location.href = '/login';
  };

  return (
    <Container>
      <EditButton onClick={handleModal}>Redigera profil</EditButton>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <Input
            type="text"
            name="firstname"
            placeholder="Ändra ditt användarnamn"
            value={formData.firstname}
            onChange={handleInputChange}
            />
            <Input
              type="text"
              name="lastname"
              placeholder='Bio'
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
              placeholder="Skriv in ditt nya lösenord"
              value={formData.password}
              onChange={handleInputChange}
            />
            <ButtonContainer>
              <SaveButton onClick={handleSaveProfile}>Spara</SaveButton>
              <CancelButton onClick={handleModal}>Avbryt</CancelButton>
              <LogoutButton onClick={handleLogout}>Logga ut</LogoutButton>
              <DeleteButton onClick={handleDeleteAccount}>Radera kontot</DeleteButton>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

export default ProfileEdit;

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const LogoutButton = styled.button`
    background-color: ${Colors.YELLOW};
    color: ${TextColor.LIGHT};
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`
const DeleteButton = styled.button`
    background-color: ${Colors.RUSTRED};
    color: ${TextColor.LIGHT};
    padding: 10px;
    margin-left: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`

const Input = styled.input`
  width: 100%;
  margin-left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  margin-top: 1rem;
  margin-bottom: .5rem;
  border-radius: 5rem;
  border: solid black 1px;
`;

const EditButton = styled.button`
  background-color: ${Colors.KWITTERBLUE};
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

  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: ${Colors.GREY};
  color: ${TextColor.DARK};
  padding: 10px;
  margin-left: 1rem;
  margin-right: 1rem;
  border: solid black 1px;
  border-radius: 5px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1.5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: ${Shadows.DROPSHADOWS};
  max-width: 400px;
  width: 100%;
`;

import React, { useState } from 'react';
import styled from 'styled-components';

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const CommentTextarea = styled.textarea`
  height: 100px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
`;

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
`;

const ErrorMessage = styled.span`
  color: red;
  margin-top: 8px;
`;

function PostAPostPage() {
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (comment.trim() === '') {
      setErrorMessage('Kommentaren får inte vara tom.');
      return;
    }
    
    // Perform your logic here, e.g., sending the comment to an API

    console.log(comment);
    setComment('');
    setErrorMessage('');
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div>
      <h2>Kommentarruta</h2>
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
      </CommentForm>
    </div>
  );
}

export default PostAPostPage;


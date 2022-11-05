import React from 'react';

const CreateAccountSuccess = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const username = urlSearchParams.get('username');
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Account created for {username}</h1>
      <a href="/log-in">Log in</a>
    </div>
  );
};

export default CreateAccountSuccess;

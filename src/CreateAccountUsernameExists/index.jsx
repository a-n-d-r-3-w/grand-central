import React from 'react';

const CreateAccountUsernameExists = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const username = urlSearchParams.get('username');
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Username {username} has been taken.</h1>
      Please <a href="/create-account">create an account</a> with a different
      username.
    </div>
  );
};

export default CreateAccountUsernameExists;

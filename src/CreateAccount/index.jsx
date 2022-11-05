import React from 'react';

const CreateAccount = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const isUsernameNotAvailableError =
    urlSearchParams.get('error') === 'username-not-available';

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Create account</h1>
      {isUsernameNotAvailableError && (
        <p>
          Sorry, that username is not available. Please try a different
          username.
        </p>
      )}
      <form method="POST" action="/api/users">
        <p>
          <label>
            Username <input name="username" type="text" />
          </label>
        </p>
        <p>
          <label>
            Password <input name="password" type="password" />
          </label>
        </p>
        <p>
          <button>Create account</button>
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;

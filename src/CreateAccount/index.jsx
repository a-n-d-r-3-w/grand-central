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
          Your username must be 4 to 16 characters long. Each character must be
          a lowercase letter or number.
        </p>{' '}
        <p>
          <label>
            Username <input name="username" type="text" />
          </label>
        </p>
        <p>Your password must be 8 to 64 characters long.</p>
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

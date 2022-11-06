import React from 'react';

const LogIn = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const logInError = urlSearchParams.get('error');

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Log in</h1>
      {logInError && <p style={{ color: '#e31c3d' }}>{logInError}</p>}

      <form method="POST" action="/api/sessions">
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
          <button>Log in</button>
        </p>
      </form>
    </div>
  );
};

export default LogIn;

import React from 'react';

const CreateAccount = () => (
  <div style={{ padding: '1rem' }}>
    <h1>Create account</h1>
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

export default CreateAccount;

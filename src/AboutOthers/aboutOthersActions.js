import axios from 'axios';

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

export const createAccount = () => {
  return async dispatch => {
    const response = await axios.post('/api/accounts');
    dispatch({
      type: CREATE_ACCOUNT,
      accountId: response.data.accountId
    });
  };
};

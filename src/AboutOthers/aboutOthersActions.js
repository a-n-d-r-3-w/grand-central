import axios from 'axios';

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const SET_PEOPLE = 'SET_PEOPLE';

export const createAccount = () => {
  return async dispatch => {
    const response = await axios.post('/api/accounts');
    dispatch({
      type: CREATE_ACCOUNT,
      accountId: response.data.accountId
    });
  };
};

export const addPerson = accountId => {
  return async dispatch => {
    await axios.post(`/api/accounts/${accountId}/people`);
    const response = await axios.get(`/api/accounts/${accountId}/people`);
    dispatch({
      type: SET_PEOPLE,
      people: response.data.people
    });
  };
};

export const getPeople = accountId => {
  return async dispatch => {
    const response = await axios.get(`/api/accounts/${accountId}/people`);
    dispatch({
      type: SET_PEOPLE,
      people: response.data.people
    });
  };
};

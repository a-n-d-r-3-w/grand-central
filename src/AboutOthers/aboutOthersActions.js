

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

export const createAccount = () => {
  return dispatch => {
    dispatch({
      type: CREATE_ACCOUNT
    });
  };
};
import { CREATE_ACCOUNT } from './aboutOthersActions';

const initialState = {
  accountId: null
};

export const aboutOthersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      if (!action.accountId) {
        throw new Error('accountId is falsy.');
      }
      return {
        accountId: action.accountId
      };
    default:
      return state;
  }
};

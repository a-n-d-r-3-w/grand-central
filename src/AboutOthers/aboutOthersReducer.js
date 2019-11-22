import {CREATE_ACCOUNT} from './aboutOthersActions';

const initialState = {
  accounts: []
};

export const aboutOthersReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      const accounts = state.accounts.slice();
      if (!action.accountId) {
        throw new Error('accountId is falsy.');
      }
      accounts.push({
        accountId: action.accountId,
        people: []
      });
      return {
        accounts
      };
    default:
      return state;
  }
};

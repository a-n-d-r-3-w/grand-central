import {CREATE_ACCOUNT} from './aboutOthersActions';
import {Account, State} from './type';

const initialState: State = {
  accounts: []
};

export const aboutOthersReducer = (
  state = initialState,
  action: { type: string, accountId?: string }
) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      const accounts: Array<Account> = state.accounts.slice();
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

import {connectRunClose} from './connectRunClose';

export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

export const createAccount = (accountId: string) => {
  connectRunClose('accounts', accounts => accounts.insertOne({ accountId, people: [] }));
  return ({
    type: CREATE_ACCOUNT,
    accountId
  });
};

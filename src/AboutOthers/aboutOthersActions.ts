export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

export const createAccount = (accountId: string) => {
  return ({
    type: CREATE_ACCOUNT,
    accountId
  });
};

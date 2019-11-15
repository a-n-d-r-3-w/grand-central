export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

export const createAccount = (accountId: string) => ({
  type: CREATE_ACCOUNT,
  accountId
});

const shortid = require('shortid');
const connectRunClose = require('../connectRunClose');

const createAccount = async () => {
  const accountId = shortid.generate();
  return await connectRunClose('accounts', async accounts => {
    return accounts.insertOne({ accountId, people: [] });
  });
};

const getAccount = async accountId =>
  await connectRunClose('accounts', accounts =>
    accounts.findOne({ accountId })
  );

module.exports = {
  createAccount,
  getAccount
};

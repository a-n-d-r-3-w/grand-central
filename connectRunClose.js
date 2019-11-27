const { MongoClient } = require('mongodb');

let DB_URL = process.env.DB_URL;
if (DB_URL == null || DB_URL === '') {
  DB_URL = 'mongodb://localhost:27017';
}

const DB_NAME = 'aboutothers';

module.exports = async (collectionName, fn) => {
  const client = new MongoClient(DB_URL, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(collectionName);
    return await fn(collection);
  } finally {
    await client.close();
  }
};

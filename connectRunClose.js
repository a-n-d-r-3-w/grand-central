const {MongoClient} = require('mongodb');

const DB_URL = 'mongodb://localhost:27017';
// const DB_URL = process.env.DB_URL
const DB_NAME = 'aboutothers';

module.exports = async (collectionName, fn) => {
  const client = new MongoClient(DB_URL);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(collectionName);
    return await fn(collection);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

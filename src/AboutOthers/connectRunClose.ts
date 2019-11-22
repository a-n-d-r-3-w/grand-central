import {Collection, Db} from "mongodb";

const {MongoClient} = require('mongodb');

const DB_URL: string = 'mongodb://localhost:27017';
// const DB_URL = process.env.DB_URL
const DB_NAME: string = 'aboutothers';

export const connectRunClose = async (collectionName: string, fn: (collection: Collection) => any) => {
  const client = new MongoClient(DB_URL);
  try {
    await client.connect();
    const db: Db = client.db(DB_NAME);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }

  // const client = await MongoClient.connect(DB_URL);
  // const db = client.db(DB_NAME);
  // const collection = db.collection(collectionName);
  // const result = await fn(collection);
  //
  // if (client) {
  //   await client.close()
  // }
  //
  // return result
};

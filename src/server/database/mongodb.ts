// tslint:disable: no-console
import { InternalError } from 'anux-common';
import settings from '../../settings';
import * as MongoClient from 'mongodb';

let db: MongoClient.Db = null;

export function getDb(): MongoClient.Db {
  return db;
}

export async function connectToDatabase(): Promise<boolean> {
  if (db) { return true; }
  const { services: { mongoDb: { username, password, dbname } } } = settings;
  const generateUri = (usr: string, pwd: string) => `mongodb+srv://${usr}:${pwd}@cluster0-v1ugl.mongodb.net/test?retryWrites=true`;
  console.log('Connecting to database...', { uri: generateUri(username, '########') });
  try {
    const client = await MongoClient.connect(generateUri(username, password), {
      autoReconnect: true,
      keepAlive: true,
      useNewUrlParser: true,
    });
    db = client.db(dbname);
    console.log('Connected successfully to database.');
    return true;
  } catch (error) {
    console.error(new InternalError('Connection to the database failed, it could be your IP address.', error));
    return false;
  }
}

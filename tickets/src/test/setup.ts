import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from "supertest"; // allow us to fake requests to the express app

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => { // this function will run before all tests
  process.env.JWT_KEY = 'asdfasdf';

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => { // this function will run before each test to reset all the data in the mongo DB
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

// @ts-ignore
global.signin = async ()=>{
  const email = 'test@test.com'
  const password = 'password'

  const res= await request(app)
      .post('/api/users/signup').
      send({
        email,
        password
      })
      .expect(201)
  const cookie = res.get('Set-Cookie');
  return cookie;

}


import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest"; // allow us to fake requests to the express app


let mongo: any;
beforeAll(async ()=>{// this function will run before all tests
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri);

})


beforeEach(async ()=>{// this function will run before each test to reset all the data in the mongo DB
    const collections = await mongoose.connection.db.collections();

    for (let co of collections){
        await co.deleteMany({});
    }
});


afterAll(async () =>{
    await mongo.stop();
    await mongoose.connection.close();
});



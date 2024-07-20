import mongoose from "mongoose";

import {app} from "./app";

const start=async ()=>{
    if (!process.env.JWT_KEY){
        throw new Error('the secret key not found in env')
    }
    if (!process.env.MONGO_URL){
        throw new Error('the MONGO_URL must be defined')
    }
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('db connected');
    }catch (err){
        console.log(err);
    }
    app.listen(3000, () => {
        console.log("Listening on port 3000!");
    });
};

start();


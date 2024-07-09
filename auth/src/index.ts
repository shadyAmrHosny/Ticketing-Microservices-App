import mongoose from "mongoose";

import {app} from "./app";

const start=async ()=>{
    if (!process.env.JWT_KEY){
        throw new Error('the secret key not found in env')
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('db connected');
    }catch (err){
        console.log(err);
    }
    app.listen(3000, () => {
        console.log("Listening on port 3000!");
    });
};

start();


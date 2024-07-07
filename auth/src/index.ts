import express from "express";
import 'express-async-errors'
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import {currentUserRouter} from "./routes/current-user";
import {signinRouter} from "./routes/signin";
import {signoutRouter} from "./routes/signout";
import {signupRouter} from "./routes/signup";
import {errorHandler} from "./middlewares/error-handler";
import {NotFoundError} from "./errors/not-found-error";

const app = express();
app.set('trust proxy',true);
app.use(json());
app.use(
    cookieSession({
        signed: false, //option to disable cookie encryption
        secure: true //going to require that cookies will only be used if a user visit our app with https con
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler);

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


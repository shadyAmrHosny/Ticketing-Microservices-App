import express from "express";
import 'express-async-errors'
import { json } from "body-parser";
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
       // secure: true //going to require that cookies will only be used if a user visit our app with https con
        secure: process.env.NODE_ENV !== 'test' // if we are in test environment like with jest it will set it with false
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


export { app };
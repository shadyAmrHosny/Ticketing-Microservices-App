import express from "express";
import 'express-async-errors'
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser} from '@shedzo_common/common';

import {createTicketRouter} from "./routes/new";



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
app.use(currentUser);
app.use(createTicketRouter);


app.all('*', async (req, res) => {
    throw new NotFoundError();
})
app.use(errorHandler);


export { app };
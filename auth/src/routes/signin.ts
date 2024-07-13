import express, {Request,Response} from "express";
import {body, validationResult} from "express-validator";
import jwt from "jsonwebtoken";

import {Password} from "../services/password";
import { User } from '../models/user';
import {validateRequest,BadRequestError} from "@shedzo_common/common";

const router=express.Router();
// set up a router, which is an object that we can use routes associate with
router.post('/api/users/signin',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
],validateRequest, async (req: Request,res: Response)=>{
    // //validation results a function that's come from express validator library that's give us back any errors on the req
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     throw new RequestValidationError(errors.array());
    // }
    const { email, password } = req.body;
    const existingUser = await User.findOne({email})
    if (!existingUser){
        throw new BadRequestError('Invalid Credentials')
    }

    const passwordsMatch= await Password.compare(existingUser.password, password)
    if (!passwordsMatch){
        throw new BadRequestError('Invalid Credentials')
    }

    //generate JWT
    const userJwt=jwt.sign({
        id: existingUser.id,
        email:existingUser.email
    },process.env.JWT_KEY !);

    //store the token on the session object
    req.session={    //req.session is an object created by cookie-session middleware and we store the data we want on it
        jwt: userJwt
    };


    res.status(200).send(existingUser);

})



export {router as signinRouter};

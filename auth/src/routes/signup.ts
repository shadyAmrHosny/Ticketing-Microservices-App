import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'

import {validateRequest,BadRequestError} from "@shedzo_common/common";
import { User } from '../models/user';
import { RequestValidationError } from '@shedzo_common/common';
// body is a function to check the body of the incoming req
//validationResult is a function to pull validation info from the req if smth wrong with validation phase like body function for example

const router=express.Router();
// set up a router, which is an object that we can use routes associate with
router.post(
    '/api/users/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password });
        await user.save();

        //generate JWT
        const userJwt=jwt.sign({
            id: user.id,
            email:user.email
        },process.env.JWT_KEY !);

        //store the token on the session object
        req.session={    //req.session is an object created by cookie-session middleware and we store the data we want on it
            jwt: userJwt
        };


        res.status(201).send(user);
    }
);

export { router as signupRouter };

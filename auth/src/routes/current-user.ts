import express, {Request,Response,NextFunction} from "express";

import {currentUser} from "../middlewares/current-user";

const router=express.Router();
// set up a router, which is an object that we can use routes associate with
router.get('/api/users/currentuser',currentUser,(req: Request,res: Response)=>{
    res.send({currentUser: req.currentUser || null});
})



export {router as currentUserRouter};

import express, {Request,Response,NextFunction} from "express";
import cookieSession from "cookie-session";
const router=express.Router();
// set up a router, which is an object that we can use routes associate with
router.post('/api/users/signout',(req: Request,res: Response)=>{
    req.session=null;
    res.send({});
})



export {router as signoutRouter};

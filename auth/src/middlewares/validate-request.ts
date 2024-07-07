import {Request,Response,NextFunction} from "express";
import {validationResult} from "express-validator";
import {RequestValidationError} from "../errors/request-validation-error";

export const validateRequest = (
    req: Request,
    res : Response,
    next: NextFunction
) => {
    //validation results a function that's come from express validator library that's give us back any errors on the req
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        throw  new RequestValidationError(errors.array());
    }
    next();
}
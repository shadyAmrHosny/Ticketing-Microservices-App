import { ValidationError } from "express-validator";
import {CustomError} from "./custom-error";
export class RequestValidationError extends CustomError{
    //errors: validationError[];
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super('Error in validation');
        // only because we are extending a built in class we have to write the next line
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map((error) => {
            if (error.type === 'field') {
                return { message: error.msg, field: error.path };
            }else {
                return { message: error.msg};
            }
        });
    }
}


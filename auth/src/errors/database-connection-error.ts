import {CustomError} from "./custom-error";
export class DatabaseConnectionError extends CustomError{
    reason ="Error in DB connection"
    statusCode = 500;
    constructor() {
        super('Error in connection to database');
        // only because we are extending a built in class we have to write the next line
        Object.setPrototypeOf(this,DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [{
            message : this.reason
        }]
    }

}
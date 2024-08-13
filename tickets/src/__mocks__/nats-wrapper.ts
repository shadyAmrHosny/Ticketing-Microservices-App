export const natsWrapper = {
    client: {
        // A mock function is a fake function, but it allows us
        // to make tests around it or make expectations
        publish: jest.fn().mockImplementation(
            (subject: string, data: string, callback: () =>void) =>{
                callback();
            }
        )
    }
};
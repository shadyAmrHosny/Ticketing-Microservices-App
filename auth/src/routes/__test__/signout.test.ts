import request from 'supertest';
import {app} from "../../app";

it('logout successfully' , async () =>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: 'password'
        })
        .expect(201);
    const res = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);
   // console.log(res.get('Set-Cookie'))
   // @ts-ignore
    expect(res.get('Set-Cookie')[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
})
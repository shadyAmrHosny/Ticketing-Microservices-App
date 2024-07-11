import request from 'supertest'; // allow us to fake requests to the express app
import { app } from '../../app';

it('returns a 200 on successful sign in',async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: 'password'
        })
        .expect(201);
    const res = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
    expect(res.get('Set-Cookie')).toBeDefined();

});

it('fails if email does not  exist', async () =>{
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
})


it('sign in with wrong password', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: 'password'
        })
        .expect(201);
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'wrongPassword'
        })
        .expect(400);
})
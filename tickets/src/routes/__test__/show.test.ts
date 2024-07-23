import request from "supertest";
import {app} from "../../app";
import mongoose from "mongoose";

it('returns a 404 if the ticket is not found', async ()=>{
    const id = new mongoose.Types.ObjectId().toHexString(); // to generate valid mongoose id
    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404);
});

it('returns the ticket if the ticket is found', async ()=>{
    const res = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'test',
            price: 10
        })
        .expect(201);
    const ticketReq = await request(app)
        .get(`/api/tickets/${res.body.id}`)
        .send()
        .expect(200);
    expect(ticketReq.body.title).toEqual('test');
    expect(ticketReq.body.price).toEqual(10);
});
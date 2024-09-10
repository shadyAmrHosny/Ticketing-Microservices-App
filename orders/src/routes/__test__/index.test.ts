import mongoose from "mongoose";
import request from 'supertest';
import {app} from '../../app'
import {Ticket} from "../../models/ticket";
import {Order} from "../../models/order";

const buildTicket = async () => {
    const ticket  = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "test",
        price: 20
    });
    return await ticket.save();
}

it('Fetches orders for an particular user' , async ()=>{
    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();
    const userOne  = global.signin();
    const userTwo = global.signin();

    //create order for user one
    await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({
            ticketId: ticketOne.id
        })
        .expect(201);

    //create two order for user two
    const {body: orderOne} = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({
            ticketId: ticketThree.id
        })
        .expect(201);
    const {body: orderTwo} = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({
            ticketId: ticketTwo.id
        })
        .expect(201);

    //get second user orders

    const res = await request(app)
        .get('/api/orders')
        .set('Cookie', userTwo)
        .expect(200);

    expect(res.body.length).toEqual(2);
    expect(res.body[0].id).toEqual(orderOne.id);
    expect(res.body[1].id).toEqual(orderTwo.id);


})
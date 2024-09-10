import request from 'supertest';
import {app} from '../../app';
import {Ticket} from '../../models/ticket';
import mongoose from 'mongoose';
import {OrderStatus} from '@shedzo_common/common';
it('fetches order for a user ', async () => {
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'test',
        price: 100
    });
    await ticket.save();
    const user = global.signin();
    const {body: order} = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({
            ticketId: ticket.id
        })
        .expect(201);

    const {body: fetchOrder} = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);

    expect(order.id).toEqual(fetchOrder.id);
});
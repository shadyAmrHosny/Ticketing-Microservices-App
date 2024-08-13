import {Publisher,OrderCreatedEvent,Subjects} from "@shedzo_common/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    readonly subject= Subjects.OrderCreated ;

}
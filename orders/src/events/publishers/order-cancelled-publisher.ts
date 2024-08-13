import {Publisher, Subjects, OrderCancelledEvent} from "@shedzo_common/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;

}
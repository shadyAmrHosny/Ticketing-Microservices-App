import {Publisher, Subjects, TicketUpdatedEvent} from "@shedzo_common/common";
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject =Subjects.TicketUpdated;
}


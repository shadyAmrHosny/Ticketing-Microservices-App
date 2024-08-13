import {Publisher, Subjects, TicketCreatedEvent} from "@shedzo_common/common";
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject =Subjects.TicketCreated;
}


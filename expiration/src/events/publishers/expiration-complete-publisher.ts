import {Subjects,Publisher,ExpirationCompleteEvent} from '@shedzo_common/common'
export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    readonly subject = Subjects.ExpirationComplete;

}
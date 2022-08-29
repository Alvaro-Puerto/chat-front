import { User } from "./user";


export interface MessageDetail {
    content?:            String;
    created_at?:         Date;
    id?:                 Number;
}
export interface Message extends User {
   pivot?:              MessageDetail;
}

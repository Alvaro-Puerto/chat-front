import { Message } from "./Message";
import { User } from "./user";

export interface Conversation {
    id?:                Number;
    name?:              String;
    participant?:       User[];
    last_message?:      String;
}

export interface ConversationDetail extends Conversation {
    message:  Message[];
}


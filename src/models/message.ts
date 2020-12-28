import * as util from '@/util';


export type MessageType = 'info' | 'warning' | 'error';

export default class Message {
  constructor(
    readonly type: MessageType,
    readonly text: string,
    readonly uuid = util.generateUuid(),
  ) {}
}

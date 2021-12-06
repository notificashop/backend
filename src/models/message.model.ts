import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Message extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isWhatsapp?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  isEmail?: boolean;

  @property({
    type: 'boolean',
    default: false,
  })
  isSms?: boolean;

  @property({
    type: 'number',
    required: true,
  })
  schedule: number;

  @property({
    type: 'boolean',
    default: false,
  })
  active?: boolean;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Message>) {
    super(data);
  }
}

export interface MessageRelations {
  // describe navigational properties here
}

export type MessageWithRelations = Message & MessageRelations;

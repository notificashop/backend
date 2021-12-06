import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Notificaciones extends Entity {
  @property({
    type: 'object',
    required: true,
  })
  venta: object;

  @property({
    type: 'object',
    required: true,
  })
  message: object;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  type?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Notificaciones>) {
    super(data);
  }
}

export interface NotificacionesRelations {
  // describe navigational properties here
}

export type NotificacionesWithRelations = Notificaciones & NotificacionesRelations;

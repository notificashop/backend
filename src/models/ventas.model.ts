import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Ventas extends Entity {
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
  nameCustomer: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  nameProduc?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;
  
  @property({
    type: 'boolean',
    default: false,
  })
  send?: boolean;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ventas>) {
    super(data);
  }
}

export interface VentasRelations {
  // describe navigational properties here
}

export type VentasWithRelations = Ventas & VentasRelations;

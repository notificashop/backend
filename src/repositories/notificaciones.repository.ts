import {inject,Getter} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Notificaciones, NotificacionesRelations, Ventas} from '../models';
import {HttpErrors} from '@loopback/rest';
export class NotificacionesRepository extends DefaultCrudRepository<
  Notificaciones,
  typeof Notificaciones.prototype.id,
  NotificacionesRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Notificaciones, dataSource);
  }
  async getAll( ): Promise<any[]> {
    let notificaciones= await super.find();
    let notifyArr :any[] = [];
    const axios = require('axios');

    try {       
       notificaciones.forEach(async item => {
       /*  let venta = await this.ventasRepository.findById(item.id_venta);
         let message = await this.messageRepository.findById(item.id_message);                
          notifyArr.push({
            client: venta.nameCustomer,
            phone: venta.phone,
            email: venta.email,
            produc: venta.nameProduc,
            message: message.message,
            type:item.type
          });*/
       });
      
     
    } catch (err) {
      throw new HttpErrors.UnprocessableEntity(err);
    }
    return notifyArr;
  }
}

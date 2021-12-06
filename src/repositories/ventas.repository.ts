import {inject,Getter} from '@loopback/core';
import {DefaultCrudRepository,DataObject} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Ventas, VentasRelations} from '../models';
import { repository} from '@loopback/repository';
import {MessageRepository} from './message.repository';
import {NotificacionesRepository} from './notificaciones.repository';
import {HttpErrors} from '@loopback/rest';
//import * as twilio from 'twilio';
export class VentasRepository extends DefaultCrudRepository<
  Ventas,
  typeof Ventas.prototype.id,
  VentasRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter(MessageRepository)
    messageRepositoryGetter: Getter<MessageRepository>,
    @repository(MessageRepository)
    public messageRepository: MessageRepository,
    @repository.getter(NotificacionesRepository)
    notificacionesRepositoryGetter: Getter<NotificacionesRepository>,
    @repository(NotificacionesRepository)
    public notificacionesRepository: NotificacionesRepository,
  ) {
    super(Ventas, dataSource);
  }

  async apicreate(entity: DataObject<Ventas>, hash?:String|undefined ): Promise<Ventas> {
    let venta= new Ventas();
    try {
     
      if(hash === "B2yVur98^3$%ETqbNQuu2QcG3")
      {
         venta = await super.create(entity);
      }else
      {
        throw new HttpErrors.UnprocessableEntity('Error con la llave de acceso a el api');
      }
     
    } catch (err) {
      throw new HttpErrors.UnprocessableEntity(err);
    }
    return venta;
  }

  async sendMessage( ): Promise<void> {
  
    const accountSid = 'AC29b8f6d157eda58cd738dbec17d257de'; 
    const authToken = '8e825df0e189c8901484ead941141015'; 
    //let client  =  new twilio(accountSid, authToken);
    const twilio = require('twilio');
    var nodemailer = require('nodemailer');
    const client = new twilio(accountSid, authToken);
    let msg = await this.messageRepository.findOne();
    console.log(msg?.message);
     const ventas = await this.find();
     console.log(ventas.length);  
      ventas.forEach(item => {
        console.log("Informa");
        let body = msg?.message.replace('{1}',item.nameCustomer);
       // body = body?.replace('{2}',item.);
       if(msg?.isWhatsapp)
       {
        client.messages 
        .create({ 
         body: body, 
         to: 'whatsapp:'+item.phone,       
         from: 'whatsapp:+14155238886' 
      })
      .then(() =>{ 
        console.log("Se envio");
        this.notificacionesRepository.create({
          venta: {item},
          message:{msg},
          type:"Whatsapp"
        });
      }); 

       }
       if(msg?.isEmail)
       {
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'notificashop@gmail.com',
              pass: 'K0l0mb14'
            }
          });

          var mailOptions = {
            from: 'notificashop@gmail.com',
            to: item.email,
            subject: 'NotificaShop',
            text: body
          };
          transporter.sendMail(mailOptions, (error: any, info: { response: string; }) =>{
            if (error) {
              console.log(error);
            } else {
              this.notificacionesRepository.create({
                venta: {item},
                message:{msg},
                type:"Email"
              });
              console.log('Email enviado: ' + info.response);
            }
          });
       }
       if(msg?.isSms)
       {
          const accountSid = 'AC29b8f6d157eda58cd738dbec17d257de'; 
          const authToken = '[AuthToken]'; 
          const client = require('twilio')(accountSid, authToken);           
          client.messages 
                .create({         
                  to: item.phone 
                }) 
                .then((message: { sid: any; }) =>{
                  this.notificacionesRepository.create({
                    venta: {item},
                    message:{msg},
                    type:"Whatsapp"
                  });
                  console.log(message.sid)
                }) 
                .done();
       }
       
       
      });
    


  }

}

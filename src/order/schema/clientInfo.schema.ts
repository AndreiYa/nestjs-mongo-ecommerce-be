import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientInfoDocument = ClientInfo & Document;

@Schema()
export class ClientInfo {
  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  name: string;
}

export const ClientInfoSchema = SchemaFactory.createForClass(ClientInfo);

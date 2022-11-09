import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {DeliveryMethod} from "./deliveryMethod.schema";

export type DeliveryDocument = Delivery & Document;

@Schema()
export class Delivery {
  @Prop()
  deliveryMethod: DeliveryMethod;

  @Prop()
  deliveryAddress: string;
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);

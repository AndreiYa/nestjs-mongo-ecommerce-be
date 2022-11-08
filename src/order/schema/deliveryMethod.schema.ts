import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeliveryMethodDocument = DeliveryMethod & Document;

@Schema()
export class DeliveryMethod {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  media: string;
}

export const DeliveryMethodSchema = SchemaFactory.createForClass(DeliveryMethod);

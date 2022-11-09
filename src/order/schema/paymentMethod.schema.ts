import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentMethodDocument = PaymentMethod & Document;

@Schema()
export class PaymentMethod {
  @Prop()
  name: string

  @Prop()
  description: string;

  @Prop()
  media: string;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);

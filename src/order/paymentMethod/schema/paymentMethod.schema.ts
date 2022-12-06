import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentMethodDocument = PaymentMethod & Document;

@Schema()
export class PaymentMethod {
  @Prop({type: String})
  name: string

  @Prop({type: String})
  description: string;

  @Prop({type: String})
  media: string;
}

export const PaymentMethodSchema = SchemaFactory.createForClass(PaymentMethod);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderStateDocument = OrderState & Document;

@Schema()
export class OrderState {
  @Prop()
  name: string;

  @Prop()
  color: string;

  @Prop()
  description: string;

  @Prop()
  media: string;
}

export const OrderStateSchema = SchemaFactory.createForClass(OrderState);

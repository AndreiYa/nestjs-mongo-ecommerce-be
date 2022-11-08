import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ClientInfo} from "./clientInfo.schema";
import {OrderState} from "./orderState.schema";
import {DeliveryMethod} from "./deliveryMethod.schema";
import {PaymentMethod} from "./paymentMethod.schema";
import {CartItem} from "../../cart/schema/cartItem.schema";

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  trackCode?: string;

  @Prop()
  clientCode: string;

  @Prop()
  clientInfo: ClientInfo;

  @Prop({ type: () => Date })
  startDate: Date;

  @Prop({ type: () => Date})
  finishDate?: Date;

  @Prop()
  state: OrderState;

  @Prop()
  deliveryMethod: DeliveryMethod;

  @Prop()
  paymentMethod: PaymentMethod;

  @Prop({type: () => [CartItem]})
  cartItems: CartItem[]

  @Prop()
  totalPrice: number;

  @Prop()
  totalDiscount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Customer} from "./customer.schema";
import {OrderState} from "./orderState.schema";
import {PaymentMethod} from "./paymentMethod.schema";
import {CartItem} from "../../cart/schema/cartItem.schema";
import {Delivery} from "./delivery.schema";
import {OrderHistoryItem} from "./orderHistoryItem.schema";

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  orderCode: string;

  @Prop()
  customer: Customer;

  @Prop({ type: () => Date })
  startDate: Date;

  @Prop()
  state: OrderState;

  @Prop()
  delivery: Delivery;

  @Prop()
  paymentMethod: PaymentMethod;

  @Prop({type: () => [CartItem]})
  cartItems: CartItem[]

  @Prop()
  totalPrice: number;

  @Prop()
  totalDiscount: number;

  @Prop({type: () => [OrderHistoryItem]})
  historyList: OrderHistoryItem[]
}

export const OrderSchema = SchemaFactory.createForClass(Order);

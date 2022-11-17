import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Customer} from "./customer.schema";
import {OrderState} from "./orderState.schema";
import {PaymentMethod} from "./paymentMethod.schema";
import {CartItem} from "../../cart/schema/cartItem.schema";
import {Delivery} from "./delivery.schema";
import {OrderHistoryItem} from "./orderHistoryItem.schema";

export type OrderDocument = Order & Document;

@Schema({timestamps: true})
export class Order {
  @Prop({type: String})
  orderCode: string;

  @Prop({type: () => Customer})
  customer: Customer;

  @Prop({ type: () => Date })
  startDate: Date;

  @Prop({type: () => OrderState})
  state: OrderState;

  @Prop({type: () => Delivery})
  delivery: Delivery;

  @Prop({type: () => PaymentMethod})
  paymentMethod: PaymentMethod;

  @Prop({type: () => [CartItem]})
  cartItems: CartItem[];

  @Prop({type: Number})
  subTotalPrice: number;

  @Prop({type: Number})
  totalPrice: number;

  @Prop({type: Number})
  totalDiscount: number;

  @Prop({type: () => [OrderHistoryItem]})
  historyList: OrderHistoryItem[]
}

export const OrderSchema = SchemaFactory.createForClass(Order);

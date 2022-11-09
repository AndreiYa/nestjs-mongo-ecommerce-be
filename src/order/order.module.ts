import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CustomerSchema} from "./schema/customer.schema";
import {OrderSchema} from "./schema/order.schema";
import {OrderStateSchema} from "./schema/orderState.schema";
import {DeliveryMethodSchema} from "./schema/deliveryMethod.schema";
import {PaymentMethodSchema} from "./schema/paymentMethod.schema";
import {DeliverySchema} from "./schema/delivery.schema";
import {OrderHistoryItemSchema} from "./schema/orderHistoryItem.schema";

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    MongooseModule.forFeature([
      {name: 'Order', schema: OrderSchema},
      {name: 'Customer', schema: CustomerSchema},
      {name: 'OrderState', schema: OrderStateSchema},
      {name: 'OrderHistoryItem', schema: OrderHistoryItemSchema},
      {name: 'Delivery', schema: DeliverySchema},
      {name: 'DeliveryMethod', schema: DeliveryMethodSchema},
      {name: 'PaymentMethod', schema: PaymentMethodSchema}
    ])
  ]
})
export class OrderModule {}

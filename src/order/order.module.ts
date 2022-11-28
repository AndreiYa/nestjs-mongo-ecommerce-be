import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CustomerSchema} from "./schema/customer.schema";
import {OrderSchema} from "./schema/order.schema";
import {OrderStateSchema} from "./orderState/schema/orderState.schema";
import {DeliveryMethodSchema} from "./deliveryMethod/schema/deliveryMethod.schema";
import {PaymentMethodSchema} from "./schema/paymentMethod.schema";
import {DeliverySchema} from "./schema/delivery.schema";
import {OrderHistoryItemSchema} from "./schema/orderHistoryItem.schema";
import {DeliveryMethodController} from "./deliveryMethod/deliveryMethod.controller";
import {DeliveryMethodService} from "./deliveryMethod/deliveryMethod.service";
import {OrderStateController} from "./orderState/orderState.controller";
import {OrderStateService} from "./orderState/orderState.service";

@Module({
  controllers: [
    OrderController,
    DeliveryMethodController,
    OrderStateController,
  ],
  providers: [
    OrderService,
    DeliveryMethodService,
    OrderStateService
  ],
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

import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ClientInfoSchema} from "./schema/clientInfo.schema";
import {OrderSchema} from "./schema/order.schema";
import {OrderStateSchema} from "./schema/orderState.schema";
import {DeliveryMethodSchema} from "./schema/deliveryMethod.schema";
import {PaymentMethodSchema} from "./schema/paymentMethod.schema";

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    MongooseModule.forFeature([
      {name: 'Order', schema: OrderSchema},
      {name: 'ClientInfo', schema: ClientInfoSchema},
      {name: 'OrderState', schema: OrderStateSchema},
      {name: 'DeliveryMethod', schema: DeliveryMethodSchema},
      {name: 'PaymentMethod', schema: PaymentMethodSchema}
    ])
  ]
})
export class OrderModule {}

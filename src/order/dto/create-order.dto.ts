import {Delivery} from "../schema/delivery.schema";
import {PaymentMethod} from "../schema/paymentMethod.schema";
import {CartItem} from "../../cart/schema/cartItem.schema";
import {OrderHistoryItem} from "../schema/orderHistoryItem.schema";
import {IsArray, IsDate, IsNotEmpty, IsNumber, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {CustomerDto} from "./customer.dto";
import {OrderStateDto} from "./orderState.dto";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  orderCode: string;

  @ValidateNested()
  @Type(() => CustomerDto)
  @IsNotEmpty()
  customer: CustomerDto;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ValidateNested()
  @Type(() => OrderStateDto)
  @IsNotEmpty()
  state: OrderStateDto;

  @ValidateNested()
  @Type(() => Delivery)
  @IsNotEmpty()
  delivery: Delivery;

  @ValidateNested()
  @Type(() => PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsArray()
  @ValidateNested()
  @Type(() => CartItem)
  cartItems: CartItem[]

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  totalDiscount: number;

  @IsArray()
  @ValidateNested()
  @Type(() => OrderHistoryItem)
  historyList: OrderHistoryItem[]
}

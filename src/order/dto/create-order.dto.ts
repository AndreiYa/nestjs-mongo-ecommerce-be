import {Delivery} from "../schema/delivery.schema";
import {PaymentMethod} from "../schema/paymentMethod.schema";
import {CartItem} from "../../cart/schema/cartItem.schema";
import {OrderHistoryItem} from "../schema/orderHistoryItem.schema";
import {IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {CustomerDTO} from "./customer.dto";
import {OrderStateDTO} from "./orderState.dto";

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty()
  orderCode: string;

  @ValidateNested()
  @Type(() => CustomerDTO)
  @IsNotEmpty()
  customer: CustomerDTO;

  @ValidateNested()
  @Type(() => OrderStateDTO)
  @IsNotEmpty()
  state: OrderStateDTO;

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

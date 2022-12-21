import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {Order} from "./schema/order.schema";
import {CreateOrderDTO} from "./dto/create-order.dto";
import {InjectModel} from "@nestjs/mongoose";
import {nanoid} from "nanoid";
import {NotifyService} from "../notify/notify.service";
import {NotifyDTO} from "../notify/dto/notify.dto";
import {CalculationService} from "../shared/calculation.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private readonly notifyService: NotifyService,
    private readonly calculationService: CalculationService) {
  }

  async getOrders(): Promise<Order[]> {
    return this.orderModel.find().exec()
  }

  async getOrderById(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec()
  }

  async getTrackingStatus(code: string): Promise<Order> {
    return this.orderModel.findOne({ orderCode: code}).exec()
  }

  async addOrder(createOrderDTO: CreateOrderDTO): Promise<Order&any> {
    const orderCode = nanoid(6)
    const checkCode = await this.isUnique(orderCode)
    if (checkCode && checkCode.length !== 0) {
      return this.addOrder(createOrderDTO)
    }
    createOrderDTO.orderCode = orderCode
    const price = await this.calculationService.getTotalDiscount(createOrderDTO.cartItems, true)
    const products = price.products
    delete price.products


    const newOrder = await this.orderModel.create(createOrderDTO)
    const notify: NotifyDTO = {
      customer: createOrderDTO.customer,
      orderCode,
      delivery: createOrderDTO.delivery,
      paymentMethod: createOrderDTO.paymentMethod,
      // totalDiscount: createOrderDTO.totalDiscount,
      // totalPrice: createOrderDTO.totalPrice
    }
    await this.notifyService.sendMessage(notify)
    await newOrder.save()
    delete newOrder.cartItems
    return {
      newOrder,
      products,
      price
    }
  }


  async isUnique(orderCode: string) {
    return this.orderModel.find( {orderCode: orderCode})
  }

  async updateOrder(id: string, createOrderDTO: CreateOrderDTO): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, createOrderDTO, {new: true})
  }

  async deleteOrder(id: string): Promise<Order> {
    return this.orderModel.findByIdAndRemove(id)
  }
}

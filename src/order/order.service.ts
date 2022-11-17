import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {Order} from "./schema/order.schema";
import {CreateOrderDTO} from "./dto/create-order.dto";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>) {}

  async getOrders(): Promise<Order[]> {
    return this.orderModel.find().exec()
  }

  async getOrderById(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec()
  }

  async addOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
    const newOrder = await this.orderModel.create(createOrderDTO)
    return newOrder.save()
  }

  async updateOrder(id: string, createOrderDTO: CreateOrderDTO): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, createOrderDTO, {new: true})
  }

  async deleteOrder(id: string): Promise<Order> {
    return this.orderModel.findByIdAndRemove(id)
  }
}

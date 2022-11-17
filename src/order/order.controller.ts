import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards} from '@nestjs/common';
import {OrderService} from "./order.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {Order} from "./schema/order.schema";
import {Role} from "../auth/enums/role.enum";
import {IdValidationPipe} from "../helpers/pipes/idValidation.pipe";
import {CreateOrderDTO} from "./dto/create-order.dto";

@Controller('store/')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/orders')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getOrders(): Promise<Order[]> {
    return this.orderService.getOrders()
  }

  @Get('/order/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async getOrderById(@Param('id', IdValidationPipe) id: string): Promise<Order> {
    const order = await this.orderService.getOrderById(id)
    if (!order) throw new NotFoundException('Order does not exist!')
    return order
  }

  @Post('order')
  async addOrder(@Body() createOrderDTO: CreateOrderDTO): Promise<Order> {
    return this.orderService.addOrder(createOrderDTO)
  }

  @Put('order/:id')
  async updateOrder(@Param('id', IdValidationPipe) id: string, @Body() createOrderDTO: CreateOrderDTO): Promise<Order> {
    const order = await this.orderService.updateOrder(id, createOrderDTO)
    if (!order) throw new NotFoundException('Order does not exist!')
    return order
  }

  @Delete('order/:id')
  async deleteOrder(@Param('id', IdValidationPipe) id: string): Promise<Order> {
    const order = await this.orderService.deleteOrder(id)
    if (!order) throw new NotFoundException('Order does not exist!')
    return order
  }
}

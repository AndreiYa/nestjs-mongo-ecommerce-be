import {Global, Injectable} from '@nestjs/common';
import {TotalDiscountDTO} from "./dto/totalDiscount.dto";
import {DiscountConfigService} from "../storeConfig/discountConfig/discountConfig.service";
import {ProductService} from "../product/product.service";
import mongoose from "mongoose";
import {ITotal} from "./interfaces/total.interface";

@Global()
@Injectable()
export class CalculationService {
  constructor(
    private readonly discountConfigService: DiscountConfigService,
    private readonly productService: ProductService
  ) {
  }

  async getTotalDiscount(totalDiscountDTO: TotalDiscountDTO[], isOrder = false) {
    const productIds: mongoose.Types.ObjectId[] = []
    totalDiscountDTO.forEach((query) => {
      const id = query.productId
      query.productId = new mongoose.Types.ObjectId(id)
      productIds.push(query.productId)
    })

    const discountConfig = await this.discountConfigService.getDiscountConfig()
    const products = await this.productService.getProductsByIds(productIds)
    const productsList = isOrder ? await this.productService.getProductsByIdsFull(productIds): []

    let totalItemsCount = 0
    let orderPrice = 0

    products.map(product => {
      product.count = totalDiscountDTO
        .find(el => (el.productId).toString() === (product._id).toString()).count
      delete product._id
      totalItemsCount += product.count
      orderPrice += Math.ceil((product.totalPrice * 100) / 100) * product.count
    })

    const discount = totalItemsCount >= discountConfig.minCount ? discountConfig.discount : 0
    const totalDiscount = (Math.ceil((discount !== 0 ? orderPrice * discount / 100 : 0) * 100) / 100)

    const result: ITotal = {
      orderPrice,
      totalItemsCount,
      totalDiscount,
      totalPrice: (Math.ceil((orderPrice - totalDiscount) * 100) / 100),
    }
    isOrder ? result.products = productsList : null
    return result
  }
}

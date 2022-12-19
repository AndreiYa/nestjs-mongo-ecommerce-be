import {Global, Injectable} from '@nestjs/common';
import {TotalDiscountDTO} from "./dto/totalDiscount.dto";
import {DiscountConfigService} from "../storeConfig/discountConfig/discountConfig.service";
import {ProductService} from "../product/product.service";
import mongoose from "mongoose";

@Global()
@Injectable()
export class CalculationService {
  constructor(
    private readonly discountConfigService: DiscountConfigService,
    private readonly productService: ProductService
    ) {
  }
  async getTotalDiscount(totalDiscountDTO: TotalDiscountDTO[]) {
    const productIds: mongoose.Types.ObjectId[] = []
    totalDiscountDTO.forEach((query) => {
      const id = query.productId
      query.productId = new mongoose.Types.ObjectId(id)
      productIds.push(query.productId)
    })

    const discountConfig = await this.discountConfigService.getDiscountConfig()
    const products = await this.productService.getProductsByIds(productIds)

    let totalItemsCount = 0
    let orderPrice = 0

    products.map(product => {
      product.count = totalDiscountDTO
        .find(el => (el.productId).toString() === (product._id).toString()).count
      delete product._id
      totalItemsCount += product.count
      orderPrice += product.totalPrice * product.count
    })

    const discount = totalItemsCount >= discountConfig.minCount ? discountConfig.discount : 0
    const totalDiscount = discount !== 0 ? orderPrice * discount / 100 : 0

    return {
      orderPrice,
      totalItemsCount,
      totalDiscount,
      totalPrice: orderPrice - totalDiscount
    }
  }
}

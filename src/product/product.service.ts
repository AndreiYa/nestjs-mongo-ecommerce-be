import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Product, ProductDocument} from './schema/product.schema';
import {FilterProductDTO} from "./dto/filterProduct.dto";
import {CreateProductDTO} from "./dto/createProduct.dto";

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>) {}

  async getFilteredProducts(filterProductDTO: FilterProductDTO) {
    const aggregate: any[] = [{
      $lookup: {from: 'brands', localField: 'brand', foreignField: '_id', as: 'brand'}
    }]

    if (filterProductDTO.search && filterProductDTO.search !== '') {
      aggregate.push(
        {
          $match: {
            $or: [
              {name: new RegExp(filterProductDTO.search.toString(), 'i')},
              {description: new RegExp(filterProductDTO.search.toString(), 'i')}
            ]
          },
        }
      )
    }

    if (filterProductDTO.sort) {
      const sortOperator = { "$sort": { } }, sort = filterProductDTO.sort;
      sortOperator["$sort"][sort] = +filterProductDTO.asc || 1
      aggregate.push(sortOperator)
    }

    if (filterProductDTO.preview && filterProductDTO.preview as any === 'true') {
      aggregate.push(
        {
        $unset: ['productTypeId', 'productProps']
      },
        {
          $lookup: {from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'categoryName'}
        }
      )
    }

    const query = this.productModel.aggregate([...aggregate])

    const page: number = parseInt(filterProductDTO.page as any) || 1
    const limit: number = parseInt(String(filterProductDTO.limit)) || 9
    const total = await this.totalCount()
    const data = await query.skip((page - 1) * limit).limit(limit).exec()

    return {
      data,
      total,
      limit,
      page,
      lastPage: Math.ceil(total/limit)
    }
  }

  async totalCount(options?) {
    return this.productModel.count(options).exec()
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find().exec()
  }

  async getProduct(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec()
  }

  async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDTO)
    return newProduct.save()
  }

  async updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, createProductDTO, {new: true})
  }

  async deleteProduct(id: string): Promise<any> {
    return this.productModel.findByIdAndRemove(id)
  }
}

import {Injectable} from '@nestjs/common';
import mongoose, {Model, PipelineStage} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Product, ProductDocument} from './schema/product.schema';
import {FilterProductDTO} from "./dto/filterProduct.dto";
import {CreateProductDTO} from "./dto/createProduct.dto";

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>) {}

  async getFilteredProducts(filterProductDTO: FilterProductDTO) {
    const aggregate: PipelineStage[] = [
      { $lookup: {from: 'brands', localField: 'brand', foreignField: '_id', as: 'brand' }},
      { $unwind: { path: '$brand', preserveNullAndEmptyArrays: true }},
    ]

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
        { $unset: ['productTypeId', 'productProps'] },
        { $lookup: {from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'categoryId'} },
        { $addFields: {'categoryName': '$categoryId.name' }},
        { $unwind: { path: '$categoryName', preserveNullAndEmptyArrays: true }},
        { $unset: 'categoryId' }
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
    return this.productModel.aggregate([
      { $lookup: { from: 'brands', localField: 'brand', foreignField: '_id', as: 'brand' }},
      { $unwind: { path: '$brand', preserveNullAndEmptyArrays: true }},
    ]).exec()
  }

  async getProduct(id: string): Promise<Product[]> {
    const productId = new mongoose.Types.ObjectId(id)
    return await this.productModel.aggregate([
      { $match: { "_id": productId }},
      { $lookup: { from: 'brands', localField: 'brand', foreignField: '_id', as: 'brand' }},
      { $unwind: { path: '$brand', preserveNullAndEmptyArrays: true }}
    ]).exec().then(items => items[0])
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

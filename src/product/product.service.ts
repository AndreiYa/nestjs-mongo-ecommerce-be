import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Product, ProductDocument} from './schema/product.schema';
import {FilterProductDTO} from "./dto/filterProduct.dto";
import {CreateProductDTO} from "./dto/createProduct.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>
    ) { }

  async getFilteredProducts(filterProductDTO: FilterProductDTO) {
    let option = {}
    if (filterProductDTO.search) {
      option = {
        $or: [
          {name: new RegExp(filterProductDTO.search.toString(), 'i')},
          {description: new RegExp(filterProductDTO.search.toString(), 'i')}
        ]
      }

      const query = this.productModel.find(option)

      if (filterProductDTO.sort) {
        query.sort({price: 1})
      }

      const page: number = parseInt(filterProductDTO.page as any) || 1
      const limit = filterProductDTO.limit || 9
      const total = await this.totalCount(option)
      const data = await query.skip((page - 1) * limit).limit(limit).exec()
      return {
        data,
        total,
        limit,
        page,
        lastPage: Math.ceil(total/limit)
      }
    }
  }

  async totalCount(options) {
    return this.productModel.count(options).exec()
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async getProduct(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDTO);
    return newProduct.save();
  }

  async updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, createProductDTO, {new: true});
  }

  async deleteProduct(id: string): Promise<any> {
    return this.productModel.findByIdAndRemove(id);
  }
}

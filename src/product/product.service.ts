import {Injectable} from '@nestjs/common';
import mongoose, {Model, PipelineStage} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {ObjectId} from 'mongodb';
import {Product, ProductDocument} from './schema/product.schema';
import { FilterProductDTO, GetProductsComparisonValue, GetProductsDTO } from "./dto/filterProduct.dto";
import {CreateProductDTO} from "./dto/createProduct.dto";
import { objectIdProperties } from "./const/object-id-properties.const";

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

  async getProducts(getProductsDTO: GetProductsDTO): Promise<any> {
    const matchQueryArr = [];

    if (getProductsDTO.search) {
      matchQueryArr.push({
        $or: [
          {name: new RegExp(getProductsDTO.search.toString(), 'i')},
          {description: new RegExp(getProductsDTO.search.toString(), 'i')}
        ]
      });
    }

    if (getProductsDTO.baseProperties) {
      const basePropertiesMatchQuery = Object.entries(getProductsDTO.baseProperties).reduce((prev, curr) => {
        const basePropertyName = curr[0];
        Object.entries(curr[1]).forEach(([comparisonOperator, comparisonValue]) => {
          prev.push({[basePropertyName]: { [comparisonOperator]: objectIdProperties.has(basePropertyName) ? this.toObjectId(comparisonValue) : comparisonValue } });
        });
        return prev;
      }, []);
      if (basePropertiesMatchQuery.length) {
        matchQueryArr.push(basePropertiesMatchQuery.length > 1 ? { $and: basePropertiesMatchQuery } : basePropertiesMatchQuery[0]);
      }
    }

    if (getProductsDTO.customProperties) {
      const customPropertiesMatchQuery = Object.entries(getProductsDTO.customProperties).reduce((prev, curr) => {
        const customPropertyId = curr[0];
        Object.entries(curr[1]).forEach(([comparisonOperator, comparisonValue]) => {
          prev.push({productProps: {
              $elemMatch: {
                  $and: [
                    { productTypePropertyId: { $eq: customPropertyId } },
                    { value: { [comparisonOperator]: comparisonValue } },
                  ]
              }
            }});
        });
        return prev;
      }, []);
      if (customPropertiesMatchQuery.length) {
        matchQueryArr.push(customPropertiesMatchQuery.length > 1 ? { $and: customPropertiesMatchQuery } : customPropertiesMatchQuery[0]);
      }
    }

    const aggregate: PipelineStage[] = [
      { $lookup: { from: 'brands', localField: 'brand', foreignField: '_id', as: 'brand' } },
      { $unwind: { path: '$brand', preserveNullAndEmptyArrays: true } },
    ];

    if (matchQueryArr.length) {
      aggregate.push({ $match: matchQueryArr.length > 1 ? { $and: matchQueryArr } : matchQueryArr[0] });
    }

    if (getProductsDTO.sort) {
      const sortOperator = { $sort: { } }, sort = getProductsDTO.sort.property;
      sortOperator["$sort"][sort] = +getProductsDTO.sort.asc || 1
      aggregate.push(sortOperator);
    }

    console.info(JSON.stringify(aggregate, null, 2));

    const query = this.productModel.aggregate([...aggregate]);

    const page: number = parseInt(getProductsDTO.pagination.page as any) || 1
    const limit: number = parseInt(String(getProductsDTO.pagination.limit)) || 9
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

  private toObjectId(value: GetProductsComparisonValue): ObjectId | ObjectId[] {
    if (Array.isArray(value)) {
      return value.map(item => new ObjectId(item));
    }
    value = value.toString();
    return new ObjectId(value);
  }
}

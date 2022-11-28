import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ProductType, ProductTypeDocument} from "./schema/productType.schema";
import {ProductTypeDTO} from "./dto/productType.dto";


@Injectable()
export class ProductTypeService {
  constructor(
    @InjectModel('ProductType') private readonly productTypeModel: Model<ProductTypeDocument>
  ) { }

  async getProductTypes(): Promise<ProductType[]> {
    return this.productTypeModel.aggregate([
      {
        "$lookup" : { from: 'producttypeproperties', localField: "properties", foreignField: "_id", as: "properties" }
      }
    ])
  }

  async getProductTypePreviews(): Promise<ProductType[]> {
    return this.productTypeModel.aggregate([
      { $addFields: {
          propertiesLength: { $cond: { if: { $isArray: "$properties" }, then: { $size: "$properties" }, else: "NA"} }
        }},
      { $unset: 'properties'}
    ]).exec()
  }

  async getProductType(id: string): Promise<ProductType>{
    return this.productTypeModel.findById(id)
  }

  async addProductType(productTypeDTO: ProductTypeDTO): Promise<ProductType>{
    const productType = await this.productTypeModel.create(productTypeDTO)
    return productType.save()
  }

  async updateProductType(id: string, productTypeDTO: ProductTypeDTO): Promise<ProductType> {
    return this.productTypeModel.findByIdAndUpdate(id, productTypeDTO)
  }

  async deleteProductType(id: string): Promise<ProductType>{
   return this.productTypeModel.findByIdAndRemove(id)
  }
}

import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Product, ProductDocument} from './schema/product.schema';
import {Brand, BrandDocument} from "./schema/brand.schema";
import {BrandDTO} from "./dto/brand.dto";
import {FilterProductDTO} from "./dto/filterProduct.dto";
import {CreateProductDTO} from "./dto/createProduct.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>,
    @InjectModel('Brand') private readonly brandModel: Model<BrandDocument>
    ) { }

  async getFilteredProducts(filterProductDTO: FilterProductDTO): Promise<Product[]> {
    const { category, search } = filterProductDTO;
    let products = await this.getAllProducts();

    if (search) {
      products = products.filter(product =>
        product.name.includes(search) ||
        product.description.includes(search)
      );
    }

    // if (category) {
    //   products = products.filter(product => product.category === category)
    // }

    return products;
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

  // BRANDS

  async getBrands() {
    return this.brandModel.find();
  }

  async addBrand(brandDto: BrandDTO): Promise<Brand> {
    const newBrand = await this.brandModel.create(brandDto)
    return newBrand.save()
  }

  async updateBrand(id: string, brandDto: BrandDTO): Promise<Brand> {
    return this.brandModel.findByIdAndUpdate(id, brandDto, {new: true});
  }

  async deleteBrand(id: string) {
    return this.brandModel.findByIdAndRemove(id)
  }
}

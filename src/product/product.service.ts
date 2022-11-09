import {Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Product, ProductDocument} from './schema/product.schema';
import {CreateProductDTO} from "./dto/create-product.dto";
import {FilterProductDTO} from "./dto/filter-product.dto";
import {Brand, BrandDocument} from "./schema/brand.schema";
import {BrandDto} from "./dto/brand.dto";

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
    const products = await this.productModel.find().exec();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    return product;
  }

  async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDTO);
    return newProduct.save();
  }

  async updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, createProductDTO, { new: true });
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndRemove(id);
    return deletedProduct;
  }

  // BRANDS

  async getBrands(): Promise<Brand[]> {
    return this.brandModel.find().exec()
  }

  async addBrand(brandDto: BrandDto): Promise<Brand> {
    const newBrand = await this.brandModel.create(brandDto)
    return newBrand.save()
  }

  async updateBrand(id: string, brandDto: BrandDto): Promise<Brand> {
    return this.brandModel.findByIdAndUpdate(id, brandDto, {new: true});
  }

  async deleteBrand(id: string) {
    return this.brandModel.findByIdAndRemove(id)
  }
}

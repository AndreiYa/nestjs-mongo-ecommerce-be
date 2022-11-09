import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ProductService} from "./product.service";
import {FilterProductDTO} from "./dto/filter-product.dto";
import {CreateProductDTO} from "./dto/create-product.dto";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Role} from "../auth/enums/role.enum";
import {Roles} from "../auth/decorators/roles.decorator";
import {Brand} from "./schema/brand.schema";
import {BrandDto} from "./dto/brand.dto";
import {IdValidationPipe} from "../helpers/pipes/idValidation.pipe";

@Controller('store/')
export class ProductController {
  constructor(private productService: ProductService) {
  }

  @Get('product/')
  async getProducts(@Query() filterProductDTO: FilterProductDTO) {
    if (Object.keys(filterProductDTO).length) {
      const filteredProducts = await this.productService.getFilteredProducts(filterProductDTO);
      return filteredProducts;
    } else {
      const allProducts = await this.productService.getAllProducts();
      return allProducts;
    }
  }

  @Get('product/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @Post('product/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async addProduct(@Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.addProduct(createProductDTO);
    return product;
  }

  @Put('product/:id')
  async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.updateProduct(id, createProductDTO);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @Delete('product/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }

  // BRAND

  @Get('brand/')
  async getBrands(): Promise<Brand[]> {
    return await this.productService.getBrands()
  }

  @Post('brand/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async addBrand(@Body() brandDto: BrandDto): Promise<Brand> {
    return await this.productService.addBrand(brandDto)
  }

  @Put('brand/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateBrand(@Param('id', IdValidationPipe) id: string, @Body() brandDto: BrandDto): Promise<Brand> {
    const brand = await this.productService.updateBrand(id, brandDto);
    if (!brand) throw new NotFoundException('Brand does not exist!');
    return brand;
  }

  @Delete('brand/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async deleteBrand(@Param('id', IdValidationPipe) id: string) {
    const brand = await this.productService.deleteBrand(id);
    if (!brand) throw new NotFoundException('Product does not exist');
    return brand;
  }
}

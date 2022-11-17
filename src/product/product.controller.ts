import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import {ProductService} from "./product.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Role} from "../auth/enums/role.enum";
import {Roles} from "../auth/decorators/roles.decorator";
import {Brand} from "./schema/brand.schema";
import {IdValidationPipe} from "../helpers/pipes/idValidation.pipe";
import {BrandDTO} from "./dto/brand.dto";
import {FilterProductDTO} from "./dto/filterProduct.dto";
import {CreateProductDTO} from "./dto/createProduct.dto";

@Controller('store/')
export class ProductController {
  constructor(private productService: ProductService) {
  }

  @Get('product/')
  async getProducts(@Query() filterProductDTO: FilterProductDTO) {
    if (Object.keys(filterProductDTO).length) {
      return await this.productService.getFilteredProducts(filterProductDTO);
    } else {
      return await this.productService.getAllProducts();
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
    return await this.productService.addProduct(createProductDTO);
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
    return this.productService.getBrands();
  }

  @Post('brand/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async addBrand(@Body() brandDTO: BrandDTO): Promise<Brand> {
    return await this.productService.addBrand(brandDTO)
  }

  @Put('brand/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateBrand(@Param('id', IdValidationPipe) id: string, @Body() brandDTO: BrandDTO): Promise<Brand> {
    const brand = await this.productService.updateBrand(id, brandDTO);
    if (!brand) throw new NotFoundException('Brand does not exist!');
    return brand;
  }

  @Delete('brand/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async deleteBrand(@Param('id', IdValidationPipe) id: string) {
    const brand = await this.productService.deleteBrand(id);
    if (!brand) throw new NotFoundException('Brand does not exist');
    return brand;
  }
}

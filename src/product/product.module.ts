import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductSchema} from "./schema/product.schema";
import {ProductService} from "./product.service";
import {ProductController} from "./product.controller";
import {BrandSchema} from "./schema/brand.schema";
import {ProductPropertyValueSchema} from "./schema/productPropertyValue.schema";
import {ProductTypePropertyOptionSchema} from "./schema/productTypePropertyOption.schema";
import {ProductTypeSchema} from "./schema/productType.schema";
import {ProductTypePropertySchema} from "./schema/ProductTypeProperty.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Product', schema: ProductSchema},
      {name: 'Brand', schema: BrandSchema},
      {name: 'ProductPropertyValue', schema: ProductPropertyValueSchema},
      {name: 'ProductTypePropertyOption', schema: ProductTypePropertyOptionSchema},
      {name: 'ProductType', schema: ProductTypeSchema},
      {name: 'ProductTypeProperty', schema: ProductTypePropertySchema}
    ])
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Brand} from "./brand.schema";
import {ProductPropertyValue} from "./productPropertyValue.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: () => [String] })
  media: string[];

  @Prop()
  price: number;

  @Prop()
  brand: Brand;

  @Prop({ type: String})
  description: string;

  @Prop({ type: () => [String] })
  categoriesIds: string[];

  @Prop({ type: String })
  productTypeId: string;

  @Prop({ type: () => [ProductPropertyValue] })
  productProps: ProductPropertyValue[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

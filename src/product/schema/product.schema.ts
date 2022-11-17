import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ProductProps} from "./productProps.schema";
import {Brand} from "./brand.schema";

export type ProductDocument = Product & Document;

@Schema({timestamps: true})
export class Product {
  @Prop({ type: String })
  name: string;

  @Prop({ type: () => [String] })
  media: string[];

  @Prop({type: Number })
  price: number;

  @Prop({ type: () => Brand })
  brand: Brand;

  @Prop({ type: String })
  description: string;

  @Prop({ type: () => [String] })
  categoriesIds: string[];

  @Prop({ type: String })
  productTypeId: string;

  @Prop({type: () => [ProductProps]})
  productProps: ProductProps[]
}

export const ProductSchema = SchemaFactory.createForClass(Product);

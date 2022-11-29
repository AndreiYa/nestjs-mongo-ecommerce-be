import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ProductProps} from "./productProps.schema";
import {Brand} from "../brand/schema/brand.schema";
import mongoose from "mongoose";

export type ProductDocument = Product & Document;

@Schema({timestamps: true})
export class Product {
  @Prop({ type: String })
  name: string;

  @Prop({ type: () => [String] })
  media: string[];

  @Prop({type: Number })
  price: number;

  @Prop({ type: () => mongoose.Schema.Types.ObjectId, ref: 'Brand'})
  brand: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String })
  description: string;

  @Prop({ type: () => mongoose.Schema.Types.ObjectId, ref: 'Category'})
  categoryId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String })
  productTypeId: string;

  @Prop({type: () => [ProductProps]})
  productProps: ProductProps[]
}

export const ProductSchema = SchemaFactory.createForClass(Product);

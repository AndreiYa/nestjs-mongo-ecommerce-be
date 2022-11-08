import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ProductTypePropertyType} from "../enums/productTypePropertyType.enum.";
import {ProductTypePropertyOption} from "./productTypePropertyOption.schema";
import * as mongoose from "mongoose";

export type ProductPropertyValueDocument = ProductPropertyValue & Document;

@Schema()
export class ProductPropertyValue {
  @Prop()
  name: string;

  @Prop({type: [String], enum : ProductTypePropertyType})
  type: ProductTypePropertyType;

  @Prop({type: mongoose.Schema.Types.Mixed})
  internalValue?: string | number | boolean;

  @Prop({ type: () => [ProductTypePropertyOption]})
  externalValue?: ProductTypePropertyOption[];
}

export const ProductPropertyValueSchema = SchemaFactory.createForClass(ProductPropertyValue);

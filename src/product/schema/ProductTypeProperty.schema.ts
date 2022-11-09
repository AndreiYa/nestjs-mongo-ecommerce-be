import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ProductTypePropertyType} from "../enums/productTypePropertyType.enum.";
import {ProductTypePropertyOption} from "./productTypePropertyOption.schema";

export type ProductTypePropertyDocument = ProductTypeProperty & Document;

@Schema()
export class ProductTypeProperty {
  @Prop()
  showCard: boolean;

  @Prop()
  name: string;

  @Prop({type: [String], enum: ProductTypePropertyType })
  type: ProductTypePropertyType

  @Prop({type: () => [ProductTypePropertyOption]})
  options?: ProductTypePropertyOption[];
}

export const ProductTypePropertySchema = SchemaFactory.createForClass(ProductTypeProperty);

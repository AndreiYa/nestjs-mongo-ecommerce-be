import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ProductTypePropertyType} from "../enums/productTypePropertyType.enum.";

export type ProductTypePropertyDocument = ProductTypeProperty & Document;

@Schema()
export class ProductTypeProperty {
  @Prop()
  showCard: boolean;

  @Prop()
  name: string;

  @Prop({type: [String], enum: ProductTypePropertyType })
  type: ProductTypePropertyType

  @Prop({type: () => [ProductTypeProperty]})
  properties: ProductTypeProperty[];
}

export const ProductTypePropertySchema = SchemaFactory.createForClass(ProductTypeProperty);

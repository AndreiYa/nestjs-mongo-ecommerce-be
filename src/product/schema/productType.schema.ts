import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ProductTypeProperty} from "./ProductTypeProperty.schema";

export type ProductTypeDocument = ProductType & Document;

@Schema()
export class ProductType {
  @Prop({type: String})
  name: string;

  @Prop({type: String})
  description?: string;

  @Prop({type: () => [ProductTypeProperty]})
  properties: ProductTypeProperty[];
}

export const ProductTypeSchema = SchemaFactory.createForClass(ProductType);

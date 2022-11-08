import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ProductType} from "../../product/schema/productType.schema";

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String})
  description?: string;

  @Prop({ type: () => [String] })
  media: string[];

  @Prop({ type: String })
  parent?: Category;

  @Prop({ type: () => [Category] })
  children?: Category[];

  @Prop()
  productType?: ProductType;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

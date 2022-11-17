import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({timestamps: true})
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String})
  handle: string;

  @Prop({ type: String})
  description?: string;

  @Prop({ type: () => [String] })
  media: string[];

  @Prop({ type: () => [Category] })
  children?: Category[];

  @Prop({ type: String})
  productTypeId?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

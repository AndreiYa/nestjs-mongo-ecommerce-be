import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Product} from "../../product/schema/product.schema";

export type CartItemDocument = CartItem & Document;

@Schema()
export class CartItem {
  // @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  // productId: string;

  @Prop()
  product: Product;

  @Prop()
  count: number;

  @Prop()
  discount: number;

  @Prop()
  total: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

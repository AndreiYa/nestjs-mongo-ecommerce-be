import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type CartItemDocument = CartItem & Document;

@Schema()
export class CartItem {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  productId: string;

  @Prop()
  count: number;

  @Prop()
  discount: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

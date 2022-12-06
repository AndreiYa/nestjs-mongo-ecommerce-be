import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from "mongoose";

export type DeliveryMethodDocument = DeliveryMethod & Document;

class DeliveryMethodField {
  @Prop({type: String})
  code: string;

  @Prop({type: String})
  name: string;
}

@Schema({timestamps: true})
export class DeliveryMethod {
  @Prop({type: String})
  name: string;

  @Prop({type: String})
  description: string;

  @Prop({type: String})
  media: string;

  @Prop({type: () => [DeliveryMethodField]})
  fields: DeliveryMethodField[]

  @Prop({type: [mongoose.Schema.Types.ObjectId], ref: 'PaymentMethod'})
  paymentMethod: mongoose.Schema.Types.ObjectId[];
}

export const DeliveryMethodSchema = SchemaFactory.createForClass(DeliveryMethod);

import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type DiscountConfigDocument = DiscountConfig & Document;

@Schema({ capped: { max: 1, size: 100 }, autoCreate: true})
export class DiscountConfig {
  @Prop({ type: Number })
  minCount: number;

  @Prop({ type: Number })
  discount: number;
}


export const DiscountConfigSchema = SchemaFactory.createForClass(DiscountConfig)

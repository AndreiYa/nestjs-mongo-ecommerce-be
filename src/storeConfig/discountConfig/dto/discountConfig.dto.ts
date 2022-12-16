import {IsNotEmpty, IsNumber} from "class-validator";

export class DiscountConfigDTO {
  @IsNumber()
  @IsNotEmpty()
  minCount: number;

  @IsNumber()
  @IsNotEmpty()
  discount: number;
}

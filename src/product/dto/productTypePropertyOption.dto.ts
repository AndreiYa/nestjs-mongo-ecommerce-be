import {IsNotEmpty, IsOptional} from "class-validator";

export class ProductTypePropertyOptionDto {
  @IsOptional()
  label?: string;

  @IsNotEmpty()
  value: string | number;
}

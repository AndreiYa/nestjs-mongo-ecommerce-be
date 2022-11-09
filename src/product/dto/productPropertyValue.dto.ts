import {ProductTypePropertyType} from "../enums/productTypePropertyType.enum.";
import {IsArray, IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import {ProductTypePropertyOptionDto} from "./productTypePropertyOption.dto";

export class ProductPropertyValueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(ProductTypePropertyType)
  type: ProductTypePropertyType;

  @IsOptional()
  internalValue?: string | number | boolean;

  @IsOptional()
  @IsArray()
  @Type(() => ProductTypePropertyOptionDto)
  externalValue?: ProductTypePropertyOptionDto[];
}

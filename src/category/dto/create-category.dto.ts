import {IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";
import {Category} from "../schema/category.schema";
import {Type} from "class-transformer";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  handle: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  media: string[];

  @IsOptional()
  @ValidateNested()
  @IsArray()
  @Type(() => Category)
  children?: Category[];

  @IsOptional()
  @IsString()
  productTypeId?: string;
}

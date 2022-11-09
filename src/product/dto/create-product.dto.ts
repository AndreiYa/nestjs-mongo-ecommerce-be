import {IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested} from "class-validator";
import {BrandDto} from "./brand.dto";
import {Type} from "class-transformer";
import {ProductPropertyValueDto} from "./productPropertyValue.dto";

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({each: true})
  @IsNotEmpty()
  media: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @Type(() => BrandDto)
  brand: BrandDto;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({each: true} )
  categoriesIds: string[];

  @IsString()
  @IsNotEmpty()
  productTypeId: string;

  @IsArray()
  @ValidateNested()
  @Type(() => ProductPropertyValueDto)
  productProps: ProductPropertyValueDto[];
}

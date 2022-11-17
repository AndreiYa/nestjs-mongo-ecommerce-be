import {IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {ProductPropsDTO} from "./productProps.dto";
import {BrandDTO} from "../brand/dto/brand.dto";

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  media: string[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @Type(() => BrandDTO)
  brand: BrandDTO;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  categoriesIds: string[];

  @IsString()
  @IsNotEmpty()
  productTypeId: string;

  @IsArray()
  @ValidateNested()
  @Type(() => ProductPropsDTO)
  productProps: ProductPropsDTO[];
}

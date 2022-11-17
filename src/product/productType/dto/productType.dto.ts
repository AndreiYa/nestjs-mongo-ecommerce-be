import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import {ProductTypePropertyDTO} from "../../productTypeProperty/dto/productTypeProperty.dto";

export class ProductTypeDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @Type(() => ProductTypePropertyDTO)
  properties: ProductTypePropertyDTO[];
}

import {CreateProductDTO} from "../../product/dto/createProduct.dto";
import {IsNotEmpty, IsNumber, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class UpdateCartItemDTO {
  @IsNotEmpty()
  @Type(() => CreateProductDTO)
  @ValidateNested()
  product: CreateProductDTO

  @IsNumber()
  @IsNotEmpty()
  count: number
}
